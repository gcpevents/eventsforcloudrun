# Events for Cloud Run Samples

This repo contains 2 quickstart samples for Events for Cloud Run. The samples are offered in a
variety of languages but have common setup and testing instructions described here.

## Setup (all languages)

The setup assumes you've installed `gcloud`.

Update `gcloud` and enable services:

```sh
gcloud components update
gcloud components install alpha
gcloud services enable run.googleapis.com
gcloud services enable logging.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

### (Optional) Configure Cloud Run settings to avoid prompts

```sh
# gcloud config set project my-project
gcloud config set run/region us-central1 # Event Sinks, Sources, and Run services must be in the same region
gcloud config set run/platform managed
```

## Quickstart: Google Cloud Storage Trigger (via Audit Logs)

Choose one of the language folders (i.e. `node`, `python`, etc.) to set up a Cloud Run service.
Then continue instructions here.

### Create a GCS Bucket

```sh
gsutil mb -p $(gcloud config get-value project) -l us-central1 gs://"$MY_GCS_BUCKET"/ # Create bucket
gsutil du -s gs://"$MY_GCS_BUCKET"/ # Verify bucket exists, should _not_ be a BucketNotFoundException
```

> Note: Must be a _single region_ in the _same region_ as your cloud run service.

### Create an Events for Cloud Run GCS (via Audit Log) Trigger

> Be sure you have the latest gcloud component _without_ Cloud Workflows installed.

```sh
gcloud alpha events triggers create my-gcs-trigger \
  --target-service "$MY_RUN_SERVICE" \
  --type com.google.cloud.auditlog.event \
  --parameters methodName=storage.buckets.update \
  --parameters serviceName=storage.googleapis.com \
  --parameters resourceName=projects/_/buckets/"$MY_GCS_BUCKET" # resourceName is optional.
```

Takes up to 10 minutes. Once ready, GCS update events on "$MY_GCS_BUCKET"
and send them to the `cloudrun-events` service.

### Create an Event by Updating your GCS Bucket

Trigger an event by updating the bucket
([storage class](https://cloud.google.com/storage/docs/storage-classes#available_storage_classes)):

```sh
gsutil defstorageclass set NEARLINE gs://$MY_GCS_BUCKET
gsutil defstorageclass set STANDARD gs://$MY_GCS_BUCKET
```

This will send an `HTTP POST` request to our Cloud Run service.

### Observe Event in StackDriver Logs

Look at the event you've created by looking at Stackdriver logs:

```sh
gcloud logging read "projects/$(gcloud config get-value project)/logs/cloudaudit.googleapis.com%2Factivity" --limit=1 --format=json
```

> Note: Ensure you're looking at the right log. The field `timestamp` should be the event's fire
> time.

## Quickstart: Cloud Pub/Sub Trigger

Choose one of the language folders (i.e. `node`, `python`, etc.) to set up a Cloud Run service.
Then continue instructions here.

#### Create Pub/Sub Topic

```sh
gcloud pubsub topics create my-topic
```

#### Describe Pub/Sub Topic

```sh
gcloud alpha events types describe com.google.cloud.pubsub.topic.publish
```

#### Create Cloud Run Events Trigger

```sh
gcloud alpha events triggers create pubsub-trigger \
--target-service cloudrun-events \
--type com.google.cloud.pubsub.topic.publish \
--parameters topic=my-topic
```

### Publish Pub/Sub Message to Topic

```sh
gcloud pubsub topics publish my-topic --message="Hello there"
```

### Observe Event in StackDriver Logs

com.google.cloud.pubsub.topic.publish

```sh
gcloud logging read "projects/$(gcloud config get-value project)/logs/cloudaudit.googleapis.com%2Factivity" --limit=1 --format=json
```

The Audit Log should appear in this format:

https://cloud.google.com/logging/docs/reference/audit/auditlog/rest/Shared.Types/AuditLog

Read more about Audit Logs here:

https://cloud.google.com/logging/docs/audit/understanding-audit-logs?hl=en#sample

### Cleanup

Delete the items that were created above:

```sh
gcloud container images delete gcr.io/$(gcloud config get-value project)/"$MY_RUN_CONTAINER" -q
gcloud run services delete "$MY_RUN_CONTAINER" -q
gcloud alpha events triggers delete my-gcs-trigger -q
gsutil rm -r gs://"$MY_GCS_BUCKET"/
```

## Understanding Audit Logs

Audit log documentation is here https://cloud.google.com/logging/docs/audit/understanding-audit-logs

## gcloud commands

### View Logs

View logs via the Cloud Console (http://console.cloud.google.com/logs) or terminal:

```sh
gcloud logging read "projects/$(gcloud config get-value project)/logs/cloudaudit.googleapis.com%2Factivity" --limit=1 --format=json
```

### View and Describe Events Types

List events:

```sh
gcloud alpha events types list
```

For example, `com.google.cloud.auditlog.event` and `com.google.cloud.pubsub.topic.publish`.

Describe events:

```sh
gcloud alpha events types describe com.google.cloud.auditlog.event
```

### List Triggers

```sh
gcloud alpha events triggers list
```

### Describe Trigger

```sh
gcloud alpha events triggers describe my-trigger
```

## Discovery Document

Client libraries for this API are not available yet. This discovery document for creating an API
client is located here:

```
https://run.googleapis.com/$discovery/rest?version=v1beta1?key=YOUR_API_KEY
```
