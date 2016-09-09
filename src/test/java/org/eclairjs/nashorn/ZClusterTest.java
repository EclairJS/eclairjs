/*
 * Copyright 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.eclairjs.nashorn;

import org.junit.AfterClass;
import org.junit.Test;
import org.junit.BeforeClass;

import javax.script.Invocable;
import javax.script.ScriptEngine;

import java.io.*;
import java.net.InetAddress;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.Properties;
import java.util.jar.Attributes;
import java.util.jar.JarEntry;
import java.util.jar.JarOutputStream;
import java.util.jar.Manifest;
import java.util.zip.ZipException;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertSame;

public class ZClusterTest {

    static Process masterProcess;
    static Process workerProcess;
    static String sparkHome;
    static Path sparkHomePath;
    static String jarFile;
    private static ScriptEngine _engine = null;

    public static boolean showClusterConsole=true;

    static String masterURL;

    static ScriptEngine getEngine()
    {
        if (_engine==null)
        {
            _engine=TestUtils.getEngine();
            _engine.put("spark_master",masterURL);
        }
        return _engine;
    }


    @BeforeClass
    public static void startCluster() throws Exception
    {
        String host=InetAddress.getLocalHost().getHostName();
        masterURL="spark://"+host+":7077";
        Properties properties=System.getProperties();

        setupSparkHome();

        String cp = sparkHome+"/jars/*";

        String command="-cp "+cp+" org.apache.spark.deploy.master.Master --host "+host+" --port 7077 --webui-port 8080";

        String java = properties.getProperty("java.home")+"/bin/java";
        String params[] = new String[]{
                java,
                "-cp",
                cp,
                "-Dlog4j.configuration=file:./src/test/resources/conf/log4j.prop",
                "org.apache.spark.deploy.master.Master",
                "--host",
                host,
                "--port",
                "7077",
                "--webui-port",
                "8080"
        };

//        Process process = Runtime.getRuntime().exec("java");
        ProcessBuilder pb = new ProcessBuilder(params);
        if (showClusterConsole)
        {
            pb.redirectOutput(ProcessBuilder.Redirect.INHERIT);
            pb.redirectError(ProcessBuilder.Redirect.INHERIT);
        }
        pb.directory(new java.io.File(".").getAbsoluteFile());
        pb.environment().put("SPARK_SCALA_VERSION","2.11");
        pb.environment().put("SPARK_HOME",sparkHome);
        masterProcess = pb.start();
        Thread.sleep(3000);
        System.out.println("MASTER STARTED");


//org.apache.spark.deploy.worker.Worker --webui-port 8081 spark://PhilBerklands-MacBook-Pro.local:7077 -c 1

        String workerParams[] = new String[]{
                java,
                "-cp",
                cp,
                "-Dlog4j.configuration=file:./src/test/resources/conf/log4j.prop",
                "org.apache.spark.deploy.worker.Worker",
                "--webui-port",
                "8081",
                masterURL,
                "-c",
                "1"
        };
        pb = new ProcessBuilder(workerParams);
        if (showClusterConsole)
        {
            pb.redirectOutput(ProcessBuilder.Redirect.INHERIT);
            pb.redirectError(ProcessBuilder.Redirect.INHERIT);
        }
        pb.environment().put("SPARK_SCALA_VERSION","2.11");
        pb.environment().put("SPARK_HOME",sparkHome);
        pb.directory(new java.io.File(".").getAbsoluteFile());


        workerProcess = pb.start();
        Thread.sleep(2000);
        System.out.println("WORKER STARTED");



    }

    @AfterClass
    public static void stopCluster() throws Exception {
        masterProcess.destroyForcibly();
        workerProcess.destroyForcibly();
        // delete spark home
        Files.walkFileTree(sparkHomePath, new SimpleFileVisitor<Path>() {
            @Override
            public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
                Files.delete(file);
                return FileVisitResult.CONTINUE;
            }

            @Override
            public FileVisitResult postVisitDirectory(Path dir, IOException exc) throws IOException {
                Files.delete(dir);
                return FileVisitResult.CONTINUE;
            }

        });
    }

    static void setupSparkHome() throws Exception
    {

        sparkHomePath=Files.createTempDirectory("spark");
        sparkHome=sparkHomePath.toAbsolutePath().toString();
        File jarsDir=new File(sparkHomePath.toFile(),"jars");
        jarsDir.mkdirs();
        Path jarPath=jarsDir.toPath();
        String cp = System.getProperties().getProperty("java.class.path");

        // copy jar files from mvn repo to temp spark home
        String [] cpParts = cp.split(File.pathSeparator);
        for (String filePath :cpParts)
        {
//            System.out.println(s);
            Path fromPath=Paths.get(filePath);
            File toFile=new File(jarsDir,fromPath.getFileName().toString());
            Files.copy(fromPath,toFile.toPath());

        }

        // RELEASE file needs to be at spark home
        String releaseStr="Spark 2.0.0 built for Hadoop 2.3.0\n" +
                "Build flags: -Psparkr -Phadoop-2.3 -Phive -Phive-thriftserver -Pyarn -DzincPort=3033";
        InputStream stream = new ByteArrayInputStream(releaseStr.getBytes(StandardCharsets.UTF_8));

        Files.copy(stream, sparkHomePath.resolve("RELEASE"));


        jarFile=File.createTempFile("test",".jar").getAbsolutePath();
        makeJar(jarFile);
    }

    static private void makeJar(String jarFilePath) throws Exception
    {
        Manifest manifest = new Manifest();
        manifest.getMainAttributes().put(Attributes.Name.MANIFEST_VERSION, "1.0");
        JarOutputStream target = new JarOutputStream(new FileOutputStream(jarFilePath), manifest);
        add(new File("./target/test-classes"), target,"./target/test-classes");
        add(new File("./target/classes"), target,"./target/classes");
        target.close();
    }

    static private void add(File source, JarOutputStream target,String baseDir) throws IOException
    {
        BufferedInputStream in = null;
        try
        {
            if (source.isDirectory())
            {
                String name = source.getPath().replace("\\", "/").substring(baseDir.length());
                if (!name.isEmpty())
                {
                    name=name.substring(1);
                    if (!name.endsWith("/"))
                        name += "/";
                    JarEntry entry = new JarEntry(name);
                    entry.setTime(source.lastModified());
                    try {
                        target.putNextEntry(entry);
                        target.closeEntry();
                    }
                    catch (ZipException ex)
                    {}

                }
                for (File nestedFile: source.listFiles())
                    add(nestedFile, target,baseDir);
                return;
            }

            JarEntry entry = new JarEntry(source.getPath().replace("\\", "/").substring(baseDir.length()+1));
            entry.setTime(source.lastModified());
            try {

                target.putNextEntry(entry);
                in = new BufferedInputStream(new FileInputStream(source));

                byte[] buffer = new byte[1024];
                while (true)
                {
                    int count = in.read(buffer);
                    if (count == -1)
                        break;
                    target.write(buffer, 0, count);
                }
                target.closeEntry();
            }
            catch (ZipException ex)
            {}
        }
        finally
        {
            if (in != null)
                in.close();
        }
    }
    public static void submit(String scriptName, String expected) throws  Exception
    {
        String cp = System.getProperties().getProperty("java.class.path");


//        org.apache.spark.deploy.SparkSubmit --class org.eclairjs.nashorn.SparkJS --name EclairJSShell --driver-java-options '-Dlog4j.configuration=file:"./src/main/resources/conf/log4j.prop"' ./target/eclairjs-nashorn-0.7-SNAPSHOT-jar-with-dependencies.jar ./examples/word_count.js

        System.setProperty("log4j.configuration", "file:./src/test/resources/conf/log4j.prop");
        String submitParams[] = new String[]{
                "--master",
                masterURL,
                "--class",
                "org.eclairjs.nashorn.ZClusterTest",
//                "org.eclairjs.nashorn.SparkJS",
                "--name",
                "EclairJSShell",
                "--driver-java-options",
                "-Dlog4j.configuration=file:./src/test/resources/conf/log4j.prop",
                jarFile,
                scriptName,
                expected
        };
        org.apache.spark.deploy.SparkSubmit.main(submitParams);

    }


    public static void main(String[]args) throws Exception
    {
        System.out.println("IN MAIN");
        TestUtils.evalJSResource(getEngine(), "/clusterTest.js");
        Object ret = ((Invocable) getEngine()).invokeFunction(args[0]);
        assertEquals("should be same", args[1], ret.toString());

    }


    @Test
    public void test1() throws Exception {

        submit("test1","[2,3,4]");

    }

    @Test
    public void testTuple() throws Exception {


        String expected = "[{\"0\":1,\"1\":2,\"length\":2},{\"0\":2,\"1\":3,\"length\":2},{\"0\":3,\"1\":4,\"length\":2}]";
        submit("testTuple", expected);

    }
    @Test
    public void testLabeledPoint() throws Exception {

        TestUtils.evalJSResource(getEngine(), "/clusterTest.js");
        Object ret = ((Invocable) getEngine()).invokeFunction("testLabeledPoint");

        String expected = "[2,3,4]";
        assertEquals("should be same", expected, ret.toString());

    }
    @Test
    public void testUserModule() throws Exception {

        TestUtils.evalJSResource(getEngine(), "/clusterTest.js");
        Object ret = ((Invocable) getEngine()).invokeFunction("testUserModule");

        String expected = "[2,3,4]";
        assertEquals("should be same", expected, ret.toString());

    }
    @Test
    public void testExternalModule() throws Exception {

        TestUtils.evalJSResource(getEngine(), "/clusterTest.js");
        Object ret = ((Invocable) getEngine()).invokeFunction("testExternalModule");

        String expected = "[\"1\",\"2\",\"3\"]";
        assertEquals("should be same", expected, ret.toString());

    }

}
