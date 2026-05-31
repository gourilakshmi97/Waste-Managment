import { Storage } from '@google-cloud/storage';

// 1. Simply initialize storage without the keyFilename.
// Google Cloud Run will automatically provide the credentials of the 
// service account attached to the container.
const storage = new Storage();
const bucket = storage.bucket('your-unique-bucket-name'); // Replace with your actual bucket name

export const uploadToGCS = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) return reject("No file provided");

    const fileName = `${Date.now()}-${file.originalname}`;
    const blob = bucket.file(fileName);
    
    // 2. Set contentType to ensure the file displays correctly in browsers
    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: file.mimetype,
    });

    blobStream.on('error', (err) => reject(err));
    blobStream.on('finish', async () => {
      try {
        // 3. Make the file public so users can view it
        await blob.makePublic();
        resolve(`https://storage.googleapis.com/${bucket.name}/${fileName}`);
      } catch (err) {
        reject(err);
      }
    });
    blobStream.end(file.buffer);
  });
};