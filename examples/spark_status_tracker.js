/*
 * Copyright 2016 IBM Corp.
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
/*
 Usage:
 bin/eclairjs.sh examples/spark_status_tracker.js"
 */

function run(sc) {

    // Example of implementing a progress reporter for a simple job.
    var rdd = sc.parallelize([1, 2, 3, 4, 5], 5).map(
        function (x) {
            java.lang.Thread.sleep(4000);
            return x;
        });

    var jobFuture = rdd.collectAsync();
    while (!jobFuture.isDone()) {
        java.lang.Thread.sleep(1000);  // 1 second
        var jobIds = jobFuture.jobIds();
        if (jobIds.length == 0) {
            continue;
        }
        var currentJobId = jobIds.get(jobIds.length - 1);
        var jobInfo = sc.statusTracker().getJobInfo(currentJobId);
        var stageInfo = sc.statusTracker().getStageInfo(jobInfo.stageIds()[0]);
        print(stageInfo.numTasks() + " tasks total: " + stageInfo.numActiveTasks() +
            " active, " + stageInfo.numCompletedTasks() + " complete");
    }
    return  jobFuture.get();
}



/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined') {
    var conf = new SparkConf().setAppName("JavaScript Status Tracker").setMaster("local[*]");
    var sc = new SparkContext(conf);
    var result = run(sc);
    print("Job results are: " + result);

    sc.stop();
}


