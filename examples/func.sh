#!/bin/bash
. ./env.sh
tenant_id ()
{
  echo $VCAP_SERVICES | python -c "import sys, json; print(json.load(sys.stdin)['spark'][0]['credentials']['tenant_id'])"
}

instance_id ()
{
  echo $VCAP_SERVICES | python -c "import sys, json; print(json.load(sys.stdin)['spark'][0]['credentials']['instance_id'])"
}

tenant_secret()
{
  echo $VCAP_SERVICES | python -c "import sys, json; print(json.load(sys.stdin)['spark'][0]['credentials']['tenant_secret'])"
}

TENANT_ID=`tenant_id`
INSTANCE_ID=`instance_id`
TENANT_SECRET=`tenant_secret`

list_kernels()
{
  curl -v -X GET \
    https://${TENANT_ID}_${INSTANCE_ID}:${TENANT_SECRET}@spark.bluemix.net/jupyter/v2/api/kernels
}

delete_kernel()
{
  curl -v -X DELETE \
    https://${TENANT_ID}_${INSTANCE_ID}:${TENANT_SECRET}@spark.bluemix.net/jupyter/v2/api/kernels/$1
}

list_kernel_specs()
{
  curl -v -X GET \
    https://${TENANT_ID}_${INSTANCE_ID}:${TENANT_SECRET}@spark.bluemix.net/jupyter/v2/api/kernelspecs
}
