# Events for Cloud Run – Java Quickstart

This folder contains a quickstart app for using Events for Cloud Run with Java.

## Setup

```sh
curl https://start.spring.io/starter.zip \
  -d dependencies=web \
  -d javaVersion=1.8 \
  -d bootVersion=2.1.3.RELEASE \
  -d name=helloevents \
  -d artifactId=helloevents \
  -d baseDir=helloevents \
  -o helloevents.zip
unzip helloevents.zip
cd helloevents
```

Update `src/main/java/com/example/helloevents/HelloeventsApplication.java`

## Deploy to Cloud Run

```sh
PROJECT_ID=$(gcloud config get-value project)
MY_RUN_SERVICE=events-java
gcloud builds submit --tag gcr.io/$PROJECT_ID/$MY_RUN_SERVICE
gcloud run deploy $MY_RUN_SERVICE --image gcr.io/$PROJECT_ID/$MY_RUN_SERVICE --platform managed --allow-unauthenticated
```

Optionally test your Run service:

```sh
MY_RUN_SERVICE_URL=$(gcloud run services describe "$MY_RUN_SERVICE" --format 'value(status.address.url)')
curl $MY_RUN_SERVICE_URL # GET request
```

Test with a Cloud Event:

```sh
curl $MY_RUN_SERVICE_URL \
  -X POST \
  -H "Ce-Id: say-hello" \
  -H "Ce-Specversion: 1.0" \
  -H "Ce-Type: event" \
  -H "Ce-Source: curl" \
  -H "Content-Type: application/json" \
  -d '{"msg":"Hello World!"}'
```

At this point you should have a ready Cloud Run service. Follow the main `README.md` for
instructions on setting up a trigger and sending events.