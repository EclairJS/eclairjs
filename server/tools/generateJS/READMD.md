
generatejs - Generate Javascript from Spark source
=============

generatejs is a utility tool which scans the Apache Spark source files, and generates the
appropriate skeleton javascript files for either elairjs-nashorn, or eclairjs-node.


## Building generatejs

```bash
cd /path/to/eclairjs-nashorn/tools/generatejs
sbt clean
sbt compile
sbt pack

 ./target/pack/bin/generateJS

 ```


## Usage
```bash
Option           Description
------           -----------
--generateNode   generate code for node (default is nashorn)
--generatedPath  path to generated javascript
--gitrepo        path to spark git repo
-h, --help       display help information
--source         path to a source directory
--statistics     generate statistics (no js generated)
 ```

 For example, to generate nodejs files for the entire spark source

```bash
  generateJS --gitrepo /pathTo/spark/gitrepo  --generatedPath /path/to/put/generatedjs --generateNode

 ```
