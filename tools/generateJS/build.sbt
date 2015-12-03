
import scala.util.Properties
import sbt._
import xerial.sbt.Pack._


name := "generateJS"


scalaVersion      := "2.10.4"

sbtVersion        := "0.13.7"

/*RESOLVERS*/
resolvers += Resolver.typesafeRepo("releases")

val scalaTestV  = "2.2.5"

//
//// Automatically find def main(args:Array[String]) methods from classpath
//packAutoSettings

// If you need to specify main classes manually, use packSettings and packMain
packSettings

// [Optional] Creating `hello` command that calls org.mydomain.Hello#main(Array[String])
packMain := Map("generateJS" -> "org.eclairjs.tools.generate.Main")

//
// TEST DEPENDENCIES
//
libraryDependencies ++= Seq(
    "org.scalatest"     %% "scalatest"                            % scalaTestV % "test",
    "org.scala-lang" % "scala-library" % scalaVersion.value,
    "org.scala-lang" % "scala-compiler" % scalaVersion.value,
    "org.scala-lang" % "scala-reflect" % scalaVersion.value,
    "net.sf.jopt-simple" % "jopt-simple" % "4.6" // MIT

)


// Similar options used by spark kernel
javaOptions ++= Seq("-Xmx2048M", "-XX:PermSize=128M", "-XX:MaxPermSize=256M")

