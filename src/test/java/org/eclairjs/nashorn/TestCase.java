package org.eclairjs.nashorn;


public class TestCase {

    public final String name;
    public final Runnable testCase;

    public TestCase(String name, Runnable testCase) {
        this.name = name;
        this.testCase = testCase;
    }
}