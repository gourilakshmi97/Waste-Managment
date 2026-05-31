import { Storage } from "@google-cloud/storage";

// Uses the Cloud Run / Compute Engine service account automatically
const storage = new Storage();

// Your bucket
const bucket = storage.bucket(
  "waste-management-images-494611-g3"
);

export const uploadToGCS = async (file) => {
  return new Promise((resolve, reject) => {
    try {
      if (!file) {
        return reject(new Error("No file provided"));
      }

      const fileName = `${Date.now()}-${file.originalname}`;

      console.log("Uploading file:", fileName);
      console.log("Bucket:", bucket.name);

      const blob = bucket.file(fileName);

      const blobStream = blob.createWriteStream({
        resumable: false,
        metadata: {
          contentType: file.mimetype,
        },
      });

      blobStream.on("error", (err) => {
        console.error("GCS Upload Error:", err);
        reject(err);
      });

      blobStream.on("finish", async () => {
        try {
          console.log("Upload successful:", fileName);

          const imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

          resolve(imageUrl);
        } catch (err) {
          reject(err);
        }
      });

      blobStream.end(file.buffer);
    } catch (err) {
      console.error("Upload Exception:", err);
      reject(err);
    }
  });
};