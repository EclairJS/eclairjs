package org.eclairjs.nashorn

import org.apache.log4j
import org.apache.log4j._

import org.apache.log4j.spi.LoggingEvent
import  org.apache.toree.comm.CommWriter
import org.apache.toree.kernel.protocol._
import org.apache.toree.kernel.protocol.v5.MsgData
import play.api.libs.json.{JsString, JsObject, Json}




class EclairjsLoggerAppender(layout: Layout,commWriter: CommWriter) extends AppenderSkeleton
{



  override def append(loggingEvent: LoggingEvent): Unit =
  {
      val logLine=layout.format(loggingEvent)
//    System.out.println("LOGGER="+logLine)

    val jsObject = new JsObject(Seq(("log",JsString(logLine))))
    commWriter.writeMsg(jsObject)

  }

  override def requiresLayout(): Boolean =
  {
    true;
  }

  override def close(): Unit =
  {

  }
}



object EclairjsLoggerAppender {

  lazy val rootLogger=org.apache.log4j.Logger.getRootLogger
  lazy val existingLayout=
  {
    val appender=rootLogger.getAllAppenders.nextElement();
    appender match {
      case anAppender:Appender => anAppender.getLayout()
      case _ => null;
    }

  }

  def create(commWriter: CommWriter,logLevels:String) = {

    Logger.getLogger("org.apache.toree").setLevel(Level.ERROR)
    val levelsString=if (logLevels.startsWith("\"")&& logLevels.endsWith("\""))
      logLevels.substring(1,logLevels.length-1)
    else
      logLevels

    if (!levelsString.trim.isEmpty)
      {
        val packageLevels=levelsString.split("\\:")
        System.out.println("logLevels"+packageLevels.length)
        packageLevels foreach( packageLevel => {
           val levels=packageLevel.split("@");
          if (levels.length==2)
          {

            val level=Level.toLevel(levels(1));
            System.out.println("set logging for "+levels(0)+" to "+level)
            Logger.getLogger(levels(0)).setLevel(level)
          }
          else
            System.out.println("bad Log level: "+packageLevel)
        })
      }

    val layout= new PatternLayout("%d{yy/MM/dd HH:mm:ss} %p %c{3}: %m%n")
    val appender=new EclairjsLoggerAppender(layout,commWriter)
    rootLogger.addAppender(appender)
  }

}

