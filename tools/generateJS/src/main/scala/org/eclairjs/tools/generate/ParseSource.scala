package org.eclairjs.tools.generate

import java.io.PrintWriter

import scala.reflect.runtime.universe._
import scala.reflect.internal.util.{BatchSourceFile, SourceFile}
import scala.reflect.io.AbstractFile
import scala.tools.nsc.doc._
import scala.tools.nsc.doc.Settings
import scala.tools.nsc.interpreter.ReplGlobal
import scala.tools.nsc.reporters.{ConsoleReporter, Reporter}
import scala.tools.nsc.{interactive, Global}
import scala.tools.nsc._
import scala.reflect.api._
import org.eclairjs.tools.generate.model._

class ParseSource(initialSettings: Settings) {

  private var  settings : Settings = initialSettings

//  private var  _compiler: Global                     = newCompiler(settings, reporter)   // our private compiler

//
//  object compiler extends Global(settings, reporter) with interactive.RangePositions {
//    override protected def computeInternalPhases() {
//      phasesSet += syntaxAnalyzer
//      phasesSet += analyzer.namerFactory
//      phasesSet += analyzer.packageObjects
//      phasesSet += analyzer.typerFactory
//    }
//    override def forScaladoc = true
//  }


  object Compiler extends Global(settings,reporter) {
    new Run
    def parse(path: String) = {
      val code = AbstractFile.getFile(path)
      val bfs = new util.BatchSourceFile(code, code.toCharArray)
      val parser = new syntaxAnalyzer.UnitParser(new
          CompilationUnit(bfs))
      val tree=parser.smartParse()
      tree
    }
        override def forScaladoc = true
  }

  lazy val reporter: ConsoleReporter = new ConsoleReporter(settings,null,new PrintWriter(Console.err, true))



//  lazy val global: Global =
//      _compiler

//  @deprecated("Use `global` for access to the compiler instance.", "2.9.0")

//  import global._

//
//
//  /** Instantiate a compiler.  Overridable. */
//  protected def newCompiler(settings: Settings, reporter: Reporter): ReplGlobal = {
//    //    settings.classpath.append(outputDir.getAbsolutePath)
////    settings.outputDirs setSingleOutput virtualDirectory
////    settings.exposeEmptyPackage.value = true
//
//    new Global(settings, reporter) with ReplGlobal {
//      override def toString: String = "<global>"
//    }
//  }
//

import Compiler.syntaxAnalyzer.global._

  def handlePackage(pid: RefTree, stats: List[Tree],fileName:String) :File= {

    val classes= scala.collection.mutable.ListBuffer.empty[Clazz]
    val imports= scala.collection.mutable.ListBuffer.empty[String]

    stats foreach( st=>
      st match {
        case ClassDef(mods, name, tparams, impl) =>
          {

            val c: Clazz = handleClass(name,mods,"",impl)
            if (c!=null)
              classes += c
          }
        case DocDef(comment, definition) =>
        {
          definition match {
            case ClassDef(mods, name, tparams, impl) =>
            {

              val c: Clazz = handleClass(name,mods,comment.raw,impl)
              if (c!=null)
                classes += c
            }
            case ModuleDef( mods, name, impl)   =>     {

              val c: Clazz = handleClass(name,mods,"",impl,true)
              if (c!=null)
                classes += c
            }
            case _ => {}
          }
        }
        case ModuleDef( mods, name, impl)   =>     {

          val c: Clazz = handleClass(name,mods,"",impl,true)
          if (c!=null)
            classes += c
        }
        case Import(expr, selectors) =>
        {
          val part1=expr.toString();
          selectors.foreach(
             selector=>
               selector.name.toString match {
                 case "_" | "fakeClassTag" => {}
                 case _ =>
                   imports += (expr+"."+selector.name)

               }
          )
        }
        case _ =>
        {

        }
      }

      )

    new File(fileName,pid.toString(),"",classes.toList,imports.toList)
  }

  def isIgnorable(mods:Modifiers, comment:String): Boolean =
  {
    if (!mods.isPublic)
      return true;
    val annotations=mods.annotations.toString();
    if (annotations.contains("new DeveloperApi"))
      return true;
    if (comment.contains(":: DeveloperApi"))
      return true;
    if (comment.contains(" @deprecated"))
      return true;
    return false;
  }

  def handleClass(name: TermName, mods:Modifiers, comment:String,impl:Template,isStatic:Boolean=false): Clazz = {
    val members= scala.collection.mutable.ListBuffer.empty[Member]

      if (isIgnorable(mods,comment))
      return null;

    impl.body.foreach( member=>
    {
      member match {
        case DefDef(mods, name, tparams, vparamss, tpt, rhs) =>{
          if (!isIgnorable(mods,""))
//          if (mods.isPublic)
              members += handleFunction(name,vparamss,tpt,"")
        }
        case DocDef(comment, definition) => {
          definition match {
            case DefDef(mods, name, tparams, vparamss, tpt, rhs) =>{
              if (!isIgnorable(mods,comment.toString))
//              if (mods.isPublic)
                members += handleFunction(name,vparamss,tpt,comment.raw)
            }
            case _ =>{}
          }
        }
        case _ => {}
      }
    })

    val c = new Clazz(name.toString, comment, members.toList, isStatic)

    c
  }

  def handleFunction(name: Name, vparamss: List[List[ValDef]], tpt: Tree,comment:String): Method ={
    val parms= scala.collection.mutable.ListBuffer.empty[Parm]


    if (!vparamss.isEmpty)
      {
        val valdefs=vparamss(0)
        valdefs foreach( valdef=> {
          parms +=  Parm(valdef.name.toString, valdef.tpt.toString )
          })

      }


    new Method(name.toString,comment,tpt.toString(),parms.toList);
  }


  def compileFile(fileName:String) :File = {
      val res: Tree =Compiler.parse(fileName)

       res match {
         case PackageDef(pid,stats) =>
           handlePackage(pid,stats,fileName);
         case _ => null
       }


    }

  //  def compileFile(fileName:String) = {
//    reporter.reset()
//    val sources=List(fileName)
//    //    val run = new Run()
////    run compile sources.toList
//
//    new compiler.Run() compile sources
//
//    val modelFactory = (
//      new { override val global: compiler.type = compiler }
//        with model.ModelFactory(compiler, settings)
//        with model.ModelFactoryImplicitSupport
//        with model.ModelFactoryTypeSupport
//        with model.diagram.DiagramFactory
//        with model.CommentFactory
//        with model.TreeFactory
//        with model.MemberLookup {
//        override def templateShouldDocument(sym: compiler.Symbol, inTpl: DocTemplateImpl) =
//          super.templateShouldDocument(sym, inTpl)
//      }
//      )
//
//    modelFactory.makeModel match {
//      case Some(madeModel) =>
//        Some(madeModel)
//      case None =>
//          println("no documentable class found in compilation units")
//        None
//    }
//
//
//
//
//  }



}
