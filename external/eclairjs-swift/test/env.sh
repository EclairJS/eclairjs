export VCAP_SERVICES='{
  "Object-Storage": [
    {
      "credentials": {
        "auth_url": "https://identity.open.softlayer.com",
        "project": "object_storage_a0aaae21_aa30_49c0_b4fd_0b58aa365864",
        "projectId": "874bd0cbcc144086b282561c74ca3689",
        "region": "dallas",
        "userId": "5cfcdc3e723a456da60d6fc2b509a806",
        "username": "admin_0f6ff7ac6a75035364e9c87f463db3f9a6323226",
        "password": "Ks!~gyw,4){lC1a*",
        "domainId": "8997b4aa8558409fa05e163dbda1e116",
        "domainName": "766023",
        "role": "admin"
      },
      "syslog_drain_url": null,
      "label": "Object-Storage",
      "provider": null,
      "plan": "standard",
      "name": "salesdemodata",
      "tags": [
        "storage",
        "ibm_release",
        "ibm_created"
      ]
    }
  ],
  "messagehub": [
    {
      "credentials": {
        "mqlight_lookup_url": "https://mqlight-lookup-prod01.messagehub.services.us-south.bluemix.net/Lookup?serviceId=d7b72093-b49e-4f0f-94d4-8e1249426e43",
        "api_key": "VkzywbIOqdojnqWuKfZtmH1lW0odnHD3Oh4rF6n2kSh5xQLK",
        "kafka_admin_url": "https://kafka-admin-prod01.messagehub.services.us-south.bluemix.net:443",
        "kafka_rest_url": "https://kafka-rest-prod01.messagehub.services.us-south.bluemix.net:443",
        "kafka_brokers_sasl": [
          "kafka01-prod01.messagehub.services.us-south.bluemix.net:9093",
          "kafka02-prod01.messagehub.services.us-south.bluemix.net:9093",
          "kafka03-prod01.messagehub.services.us-south.bluemix.net:9093",
          "kafka04-prod01.messagehub.services.us-south.bluemix.net:9093",
          "kafka05-prod01.messagehub.services.us-south.bluemix.net:9093"
        ],
        "user": "VkzywbIOqdojnqWu",
        "password": "KfZtmH1lW0odnHD3Oh4rF6n2kSh5xQLK"
      },
      "syslog_drain_url": null,
      "label": "messagehub",
      "provider": null,
      "plan": "standard",
      "name": "Message Hub-d3",
      "tags": [
        "ibm_dedicated_public",
        "web_and_app",
        "ibm_created"
      ]
    }
  ]
}'
