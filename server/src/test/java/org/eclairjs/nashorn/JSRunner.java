package org.eclairjs.nashorn;


import static java.util.Arrays.asList;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.script.ScriptEngine;
import javax.script.ScriptException;

import org.apache.commons.io.IOUtils;
import org.junit.runner.Description;
import org.junit.runner.Runner;
import org.junit.runner.manipulation.Filter;
import org.junit.runner.manipulation.Filterable;
import org.junit.runner.manipulation.NoTestsRemainException;
import org.junit.runner.manipulation.Sortable;
import org.junit.runner.manipulation.Sorter;
import org.junit.runner.notification.Failure;
import org.junit.runner.notification.RunNotifier;
import org.junit.runners.ParentRunner;
import org.junit.runners.model.InitializationError;

public class JSRunner extends Runner implements Filterable, Sortable  {

    private List<TestClass> tests;
    private List<TestCaseEntry> filteredTests;
    private final Class<?> cls;


    static class TestCaseEntry {
        Description description;
        TestClass testClass;
        TestCase testCase;
        TestCaseEntry(Description description, TestClass testClass, TestCase testCase)
        {
            this.description=description;
            this.testClass=testClass;
            this.testCase=testCase;
        }
    }

    private List<TestCaseEntry> testCases=new ArrayList<>();

    public JSRunner(Class<?> cls)  throws InitializationError {
        this.cls = cls;
        List<String> testNames = asList(cls.getAnnotation(Tests.class).value());
        this.tests = findJSTests(testNames);
    }


    @Override
    public Description getDescription() {
        Description suite = Description.createSuiteDescription(cls);
        for (TestClass testClass : tests) {
            List<TestCase> tests = testClass.testCases;
            Description desc = Description.createTestDescription(testClass.junitName(), testClass.junitName());
            suite.addChild(desc);
            for (TestCase test : tests) {
                Description methodDesc = Description.createTestDescription(testClass.junitName(), test.name);
                desc.addChild(methodDesc);
                testCases.add(new TestCaseEntry(Description.createTestDescription(cls.getName(), test.name),testClass, test));
            }
        }
        return suite;
    }

    @Override
    public void run(RunNotifier notifier) {
        if (filteredTests==null || filteredTests.isEmpty())
        {
            for (TestClass testClass : tests) {
                List<TestCase> tests = testClass.testCases;
                for (TestCase test : tests) {
                    runTestCase(notifier, testClass, test);
                }
            }
        }
        else {
            for (TestCaseEntry test : filteredTests) {
                runTestCase(notifier, test.testClass, test.testCase);
            }

        }
    }

    private void runTestCase(RunNotifier notifier, TestClass testClass, TestCase test) {
        Description desc = Description.createTestDescription(testClass.junitName(), test.name);
        notifier.fireTestStarted(desc);
        try {
            test.testCase.run();
            notifier.fireTestFinished(desc);
        } catch (Exception | Error e) {
            notifier.fireTestFailure(new Failure(desc, e.getCause() != null ? e.getCause() : e));
        }
    }

    private List<TestClass> findJSTests(List<String> testNames) {

        try {
            ScriptEngine engine = TestUtils.getEngine();
            TestUtils.evalJSResource(engine, "/TestUtils.js");
            List<TestClass> testClasses = new ArrayList<TestClass>();
            for (String name : testNames) {
                testClasses.add(new TestClass(name, load(engine, name)));
            }
            return testClasses;

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private void loadTestUtilities(ScriptEngine engine) throws ScriptException,IOException {
        engine.eval(IOUtils.toString(JSRunner.class.getResource("TestUtils.js")));
    }


    @SuppressWarnings("unchecked")
    private List<TestCase> load(ScriptEngine engine, String name) throws ScriptException, IOException{
        InputStream s = JSRunner.class.getResourceAsStream("/" + name);
        String src=IOUtils.toString(s);
        src+="\n//@ sourceURL="+name;
        return (List<TestCase>) engine.eval(src);
    }

    public void sort(Sorter sorter) {
        System.out.println("SORT = ==================");
        //
    }

    public void filter(Filter filter) throws NoTestsRemainException {
        //
        if (testCases.isEmpty())
            getDescription();
        for (TestCaseEntry entry :testCases)
        {
            if (filter.shouldRun(entry.description)) {
                if (filteredTests== null)
                    filteredTests= new ArrayList<TestCaseEntry>();
                filteredTests.add(entry);
            }

        }

    }



}