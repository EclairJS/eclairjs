package org.eclairjs.tools.generate

import java.io.{File => JFile, FileInputStream}
import java.util.Properties

import org.eclairjs.tools.generate.model._

import scala.collection.mutable

class GenerateJavaWrapper {


  lazy val templates = {
    try {
      val prop = new Properties()
      prop.load(new FileInputStream("./src/main/resources/template.properties"))
      prop
    } catch { case e: Exception =>
      e.printStackTrace()
      sys.exit(1)
    }

  }

  val funcMac = Map("JFunction"->"JSFunction","VoidFunction"->"JSVoidFunction","JFunction2"->"JSFunction2",
    "JFunction3"->"JSFunction3","PairFunction"->"JSPairFunction","PairFlatMapFunction"->"JSPairFlatMapFunction",
    "Function"->"JSFunction","Function2"->"JSFunction2","Function3"->"JSFunction3",
    "Function0"->"JSFunction"
  )


  val org_apache_spark ="org.apache.spark"
  val org_apache_spark_ ="org.apache.spark."

  def generate(file:File, destDir:JFile) : Unit = {


    var generatedClasses= Set("")

    file.classes.filter(!_.isStatic) foreach( cls => {
      generateClassFile(file,cls,destDir)
      generatedClasses += cls.name
    } )

    val statics=file.classes.filter(cls=>cls.isStatic && !generatedClasses.contains(cls.name))
    val non_emptyStatics=statics.filter(cls=> cls.members.filter(!_.isConstructor()).length>0)
    if (!non_emptyStatics.isEmpty)
      {

        non_emptyStatics foreach( generateClassFile(file,_,destDir))

      }

  }


  def generateClassFile(file:File, cls:Clazz, destDir:JFile) : Unit = {
    val sbFile=new StringBuilder

    sbFile ++= s"package ${wrapperPackageName(cls)};\n"
    sbFile ++= getTemplate("copyright")

    val imports= mutable.ListBuffer("org.eclairjs.nashorn.Utils","org.eclairjs.nashorn.wrap.WrappedFunction","org.apache.log4j.Logger")
    imports += parentFullName(cls);

    imports.map(pkg=> sbFile ++= s"import $pkg;\n")

    addNewlines(2,sbFile)
    sbFile ++= s"public class ${cls.name} extends ${parentClass(cls)} {\n"


    addNewlines(1,sbFile)

    sbFile ++= s" static Logger logger = Logger.getLogger(${cls.name}.class);\n"

    addNewlines(1,sbFile)

    val methods=cls.methods.filter(member=> !member.isConstructor() && member.isInstanceOf[Method])

    val objName="_"+cls.name(0).toLower + cls.name.substring(1)
    val fullJavaName= if (cls.parent.packageName!="<empty>")
          s"${cls.parent.packageName}.${cls.name}"
         else
              cls.name

    methods.foreach(method=>{
      sbFile ++= s"""    static WrappedFunction F_${method.name} = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
"""

      val methodBody=generateMethodBody(method,false,objName,fullJavaName)

      sbFile ++= indentString("            ",methodBody)
      sbFile++="""
                 |        }
                 |    };
                 |
                 |""".stripMargin
    })

    val staticCls=file.classes.find( clazz=> clazz.isStatic && clazz.name==cls.name)
    if (staticCls.isDefined && staticCls.get.members.filter(!_.isConstructor()).length>0)
    {

      sbFile.append("\n//\n// static methods\n//\n")
      staticCls.get.members.filter(!_.isConstructor()) foreach( member =>
          member match {
            case method:Method => generateMethodBody(method,true,objName,fullJavaName)
          }
          )


    }

    val moduleName= if (cls.parent.packageName.startsWith(org_apache_spark_))
      cls.parent.packageName.substring(org_apache_spark_.length) + "."+cls.name
      else
        cls.name


    val getMemberList = methods.map(method=> s"""case "${method.name}\":
                                        |    return F_${method.name};""".stripMargin).mkString("\n")

    val swGetMember=indentString("            ",getMemberList)

    val swHasMember = indentStringList("            ",methods.map(method=> s"""case "${method.name}\":""".stripMargin))


    sbFile ++= s"""
      |    private $fullJavaName $objName;
      |
      |    public ${cls.name}($fullJavaName $objName)
      |    {
      |       logger.debug("constructor");
      |       this.$objName = $objName;
      |    }
      |
      |    static public String getModuleName() {
      |        return "$moduleName";
      |    }
      |
      |    public boolean checkInstance(Object other) {
      |        return other instanceof ${cls.name};
      |    }
      |
      |    public Object getJavaObject() {
      |        return $objName;
      |    }
      |
      |    @Override
      |    public String toString() {
      |
      |        return $objName.toString();
      |    }
      |
      |    public String getClassName() {
      |        return "${cls.name}";
      |    }
      |
      |    // get the value of that named property
      |    @Override
      |    public Object getMember(String name) {
      |        switch (name) {
      |$swGetMember
      |        }
      |        return super.getMember(name);
      |    }
      |
      |    @Override
      |    public boolean hasMember(String name) {
      |        switch (name) {
      |$swHasMember
      |                return true;
      |        }
      |        return super.hasMember(name);
      |    }
      |""".stripMargin

    sbFile ++="\n}\n"
    val src :String = sbFile.toString()

    if (Main.isConsole) {
      System.out.println("SOURCE: "+cls.fullName())
      System.out.println("")
      System.out.println(src)
    }
    else
    {
      if (!destDir.exists())
        destDir.mkdirs();
      val toFile=destDir.getAbsolutePath+"/"+cls.name+".java"
      //            System.out.println("WRITING: "+toFile)
      scala.tools.nsc.io.File(toFile).writeAll(src)
    }
  }


  def generateMethodBody(method: Method,isStatic:Boolean,objName : String,fullJavaName:String ): String =
  {
    val cls=method.parent
    val sb=new StringBuilder


    //    System.out.println("return="+method.getReturnJSType())
    val hasReturn= method.returnType.isVoid()!=true

    val callTarget =
      if (isStatic)
        fullJavaName
      else
        objName

    val returnValue= if (hasReturn) "returnValue = "  else ""

    sb ++=s"""logger.debug(\"${method.name}\");\n"""

    sb ++=s"Object returnValue = null;\n"

    sb ++=s"$fullJavaName $objName = ($fullJavaName) ((${cls.name}) thiz).getJavaObject();\n"


    var inx=0;

    def addParm(parm:Parm): Unit = {
      if (parm.isRepeated)
        sb++=s" %%% deliberate syntax error +++ // TODO: handle repeated parm '${parm.name}'\n"

      if (parm.isOptional)
      {
        System.out.println(s"Optional parm, method - ${method.name}, parm - ${parm.name}")
      }
      parm.typ match {
        case FunctionDataType(name,parms,returnType) => {
          val argsLength=method.parms.length
          val functionType=funcMac.getOrElse(name,"JSFunction")

          sb ++= s"""Object  bindArgs$inx = null;
                                           |if (args.length > $argsLength) {
                                                                           |    bindArgs = args[$argsLength];
                                                                                                             |}
                                                                                                             |$functionType ${parm.name} = ($functionType)Utils.createLambdaFunction(args[$inx], "org.eclairjs.nashorn.$functionType", $objName.context(), bindArgs$inx);
                                                                                                                                                                                                                                                                         |""".stripMargin
        }
        case _ => {
          val parmType= javaType(parm.typ)
          parmType match {
            case "int" =>
              sb ++= s"int ${parm.name} = Utils.toInt(args[$inx]);\n"
            case "double" =>
              sb ++= s"double ${parm.name} =  Utils.toDouble(args[$inx]);\n"
            case "long" =>
              sb ++= s"long ${parm.name} =  Utils.toLong(args[$inx]);\n"
            case "int[]" =>
              sb ++= s"int[] ${parm.name} = Utils.toIntArray(args[$inx]);\n"
            case "double[]" =>
              sb ++= s"double[] ${parm.name} =  Utils.toDoubleArray(args[$inx]);\n"
            case _ => {
              if (isSparkClass(parm.typ))
                sb ++= s"$parmType ${parm.name} = ($parmType) Utils.toObject(args[$inx]);\n"
              else
                sb ++= s"$parmType ${parm.name} = ($parmType) args[$inx];\n"

            }
          }

        }
      }

    }

    def addCall(parmList:String,indent:String) = {
      sb ++= s"$indent$returnValue$callTarget.${method.name}($parmList);\n"
    }

    val nonOptionalParms=method.requiredParms()

    nonOptionalParms   foreach(parm =>{
      addParm(parm)
      inx+=1
    }  )


    val numRequredParms=nonOptionalParms.length

    if (numRequredParms==method.parms.length)
      addCall(method.parmList(),"")
    else {    // has optional parms
      val optionalParms=method.optionalParms()
      sb ++= s"\nif (args.length==$numRequredParms) {\n"
        addCall(method.parmList(numRequredParms),"  ")

      sb ++= s"\n} else {\n"
      optionalParms    foreach(parm =>{
        addParm(parm)
        inx+=1
      }  )
      addCall(method.parmList(),"  ")
      sb ++= s"\n}\n"
    }



    if (hasReturn) {
      if (method.returnType.isSparkClass()) {
        if (!isSparkClass(method.returnType))
          sb ++="return Utils.javaToJs(returnValue);\n"
        else {
          val typeName =
            if (method.returnType.name=="this.type")
              method.parent.name
            else
              method.returnType.name
          sb ++="// return Utils.javaToJs(returnValue);\n"
          sb ++=s"return new ${wrapperFullName(typeName)}((${javaType(typeName)})returnValue);\n"

        }

      }
      else
        sb ++="return returnValue;\n"

    } else
      sb ++="return null;\n"

    sb.toString()
  }

  def parentClass(cls:Clazz):String =
  {
    cls.parentClass() match {
      case Some(cls) => cls.name
      case None => "WrappedClass"
    }

  }


  def getModule(jsType:String):String =
  {
    val clsOpt=Main.allClasses.get(jsType)
    clsOpt match {
      case Some(cls) => cls.module()
      case _ => jsType
    }

  }

  def parentFullName(cls:Clazz) : String = {
    cls.parentClass() match {
      case Some(parent) => wrapperPackageName(parent)+"."+cls.parentClass().get.name
      case _ => "org.eclairjs.nashorn.wrap.WrappedClass"
    }
  }


  def wrapperPackageName(cls:Clazz):String = {
    var pkgName="org.eclairjs.nashorn.wrap";
    val prefix="org.apache.spark"
    if (cls.parent.packageName.startsWith(prefix))
      pkgName+=cls.parent.packageName.substring(prefix.length)
    pkgName
  }

  def wrapperFullName(typ:String):String = {
      Main.allClasses.get(typ) match {
        case Some(cls) => wrapperPackageName(cls) +"."+cls.name
        case _ =>typ
      }
  }

  def javaType(typ:String):String =
  {
    typ match {
      case "Int" => "int"
      case "Long" => "long"
      case "Boolean" => "boolean"
      case "String" => "String"
      case "Float" => "float"
      case "Double" => "double"
      case _ => {
        Main.allClasses.get(typ) match {
          case Some(typeClass) => typeClass.fullName();
          case _ => typ
        }
      }
    }
  }

  def javaType(dataType: DataType):String =
  {
    dataType match {
      case SimpleType(name) => javaType(name)
      case ExtendedDataType(name,referenceType) => {
        name match {
          case "Array" => javaType(referenceType)+"[]"
          case _ => javaType(name)
        }
      }
      case _ => "??"
    }
  }


  def isSparkClass(typ:DataType): Boolean =
  {
    typ match {
      case ExtendedDataType(name,referenceType) => {
        name match {
          case "Option" | "List" | "Array"  | "Seq" =>  false

          case _ => typ.isSparkClass()
        }
      }

      case _ =>typ.isSparkClass()
    }
  }

  def addNewlines(count:Integer,sb:StringBuilder) : Unit = {
    val newLines="\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\\n\n\n\n".toCharArray
    sb.appendAll(newLines,0,count)
  }

  def getTemplate(name:String,args: AnyRef*):String =
  {
    val prop=templates.get(name).asInstanceOf[String]
    val template=prop.format(args.map(_.asInstanceOf[AnyRef]) : _*)
    template
  }

  def indentString(indent:String, str:String):String =  str.split("\\n").map(indent+_).mkString("\n")
  def indentStringList(indent:String, str:List[String]):String =  str.map(indent+_).mkString("\n")


}
