#Disclosures
[![Build Status](http://img.shields.io/travis/28msec/disclosures/master.svg?style=flat)](https://travis-ci.org/28msec/disclosures) [![Code Climate](http://img.shields.io/codeclimate/github/28msec/disclosures.svg?style=flat)](https://codeclimate.com/github/28msec/disclosures)

##Development

```bash
$ npm install && bower install
$ gulp
$ ionic serve
```

###iOS Build
```bash
$ ionic add build ios
$ ionic build ios
$ ionic emulate ios
```

###Deployment Configuration
There are two scenarios for deploying this project on s3.

To deploy a branch on the 28msec account, the following environment variable need to be set: `TRAVIS_SECRET_KEY`. The
config.json will then automatically be created.

In the root of the repository, create a `credentials.json` file in the root of the repository.
This is the expected structure of the file:
```json
{
    "s3": {
        "dev": {
            "key": "xxxx",
            "secret": "xxxx"
        },
        "prod": {
            "key": "xxxx",
            "secret": "xxxx"
        },
        "region": "us-east-1",
        "website": {
            "ErrorDocument": {
                "Key": "index.html"
            },
            "IndexDocument": {
                "Suffix": "index.html"
            },
            "RoutingRules": [{
                "Redirect": {
                    "ReplaceKeyPrefixWith": "#"
                },
                "Condition": {
                    "HttpErrorCodeReturnedEquals": "403"
                }
            }]
        }
    }
}
```

###Deployment
To setup a test instance
```bash
gulp setup --build-id=myfeature
```

To teardown a test instance
```bash
gulp teardown --build-id=myfeature
```
