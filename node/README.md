# Events for Cloud Run – Node Quickstart

This folder contains a quickstart app for using Events for Cloud Run with Node.

## Deploy to Cloud Run

```sh
PROJECT_ID=$(gcloud config get-value project)
gcloud builds submit --tag gcr.io/$PROJECT_ID/events-node
gcloud run deploy events-node --image gcr.io/$PROJECT_ID/events-node --platform managed --allow-unauthenticated
```

Optionally test your Run service:

```sh
MY_RUN_SERVICE_URL=$(gcloud run services describe "$MY_RUN_SERVICE" --format 'value(status.address.url)')
curl $MY_RUN_SERVICE_URL # GET request
```

At this point you should have a ready Cloud Run service. Follow the main `README.md` for
instructions on setting up a trigger and sending events.