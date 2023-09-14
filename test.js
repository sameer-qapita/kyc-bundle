const fs = require("fs");
const { MongoClient, Binary } = require("mongodb");

// Replace the connection string with your MongoDB URI
const connectionString =
  "mongodb+srv://admin:qapita123@kyu-recommender.adp89rl.mongodb.net/?retryWrites=true&w=majority";
const collectionName = "imagedata";
const imagesFolderPath = "./images";

async function uploadImagesToMongoDB() {
  try {
    const client = await MongoClient.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db();
    const collection = db.collection(collectionName);

    const imageFiles = fs.readdirSync(imagesFolderPath);

    for (const imageFile of imageFiles) {
      const imagePath = `${imagesFolderPath}/${imageFile}`;
      const imageBuffer = fs.readFileSync(imagePath);
      const binaryData = new Binary(imageBuffer);

      const parts = imageFile.split(".png")[0].split("_");

      console.log(parts, "parts");
      const imageDocument = {
        image: binaryData,
        company_name: parts[1],
        company_id: parts[0],
      };
      console.log(imageDocument, "imagedoc");

      const result = await collection.insertOne(imageDocument);

      console.log(
        `Image ${imageFile} uploaded with ObjectID: ${result.insertedId}`
      );
    }

    // Close the connection to the database
    client.close();
  } catch (err) {
    console.error("Error uploading images:", err);
  }
}

uploadImagesToMongoDB();
