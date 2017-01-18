package org.eclairjs.nashorn.sql;
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

import org.apache.spark.sql.streaming.StreamingQueryListener;
import org.eclairjs.nashorn.JSVoidFunction;
import org.eclairjs.nashorn.Utils;

public class JSStreamingQueryListener extends StreamingQueryListener {
    private JSVoidFunction onQueryStartedFn;
    private JSVoidFunction onQueryProgressFn;
    private JSVoidFunction onQueryTerminatedFn;

    public JSStreamingQueryListener(Object oFn, Object pFn, Object cFn, Object onQueryStartedFnBindArgs, Object onQueryProgressFnBindArgs, Object onQueryTerminatedFnBindArgs) {
        this.onQueryStartedFn = (JSVoidFunction) Utils.createLambdaFunction(oFn, "org.eclairjs.nashorn.JSVoidFunction", onQueryStartedFnBindArgs);
        this.onQueryProgressFn = (JSVoidFunction) Utils.createLambdaFunction(pFn, "org.eclairjs.nashorn.JSVoidFunction", onQueryProgressFnBindArgs);
        this.onQueryTerminatedFn = (JSVoidFunction) Utils.createLambdaFunction(cFn, "org.eclairjs.nashorn.JSVoidFunction", onQueryTerminatedFnBindArgs);
    }

    @Override
    public void onQueryStarted(StreamingQueryListener.QueryStartedEvent queryStarted) {
        try {
            this.onQueryStartedFn.call(queryStarted.queryStatus());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onQueryProgress(StreamingQueryListener.QueryProgressEvent queryProgress) {
        try {
            this.onQueryProgressFn.call(queryProgress.queryStatus());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onQueryTerminated(StreamingQueryListener.QueryTerminatedEvent queryTerminated) {
        try {
            this.onQueryTerminatedFn.call(queryTerminated.queryStatus());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
