# Events for Cloud Run – Go Quickstart

This folder contains a Net/HTTP app for using Events for Cloud Run with Go.

## Setup

```
go mod init events
```

## Deploy to Cloud Run

```sh
PROJECT_ID=$(gcloud config get-value project)
MY_RUN_SERVICE=events-go
gcloud builds submit --tag gcr.io/$PROJECT_ID/$MY_RUN_SERVICE
gcloud run deploy $MY_RUN_SERVICE --image gcr.io/$PROJECT_ID/$MY_RUN_SERVICE --platform managed --allow-unauthenticated
```

Optionally test your Run service:

```sh
MY_RUN_SERVICE_URL=$(gcloud run services describe "$MY_RUN_SERVICE" --format 'value(status.address.url)')
curl $MY_RUN_SERVICE_URL
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