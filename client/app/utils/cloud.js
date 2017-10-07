// Imports the Google Cloud client library.
const Storage = require('@google-cloud/storage');

// Instantiates a client. If you don't specify credentials when constructing
// the client, the client library will look for credentials in the
// environment.
const storage = Storage({
    keyFilename: 'cred.json'
  });

CreateManuscript(manName)
{
  storage
  .createBucket(manName)
  .then(() => {
    console.log('created');
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

}
getLink(manName, picName)
{
  return `https://storage.cloud.google.com/${manName}/${picName}`
}
UploadPic(manName, path)
{
  storage.bucket(manName)
  .upload(path)
  .then(() => {
    console.log(`${picName} uploaded to ${manName}.`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
}