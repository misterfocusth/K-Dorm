from firebase_admin import storage


def upload_file_to_bucket(file, bucket_location):
    bucket = storage.bucket()

    blob = bucket.blob(bucket_location)
    blob.upload_from_file(file)
    blob.make_public()

    return {"filename": blob.name, "file_url": blob.public_url}
