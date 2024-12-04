import models from '../models/index.js';
import db from '../config/connection.js';

export default async (modelName: "Question", collectionName: string): Promise<void> => {
  try {
    const model = models[modelName];
    if (!model || !model.db || !model.db.db) {
      throw new Error(`Database or model "${modelName}" is not properly configured.`);
    }

    const collections = await model.db.db.listCollections({ name: collectionName }).toArray();

    if (collections.length > 0) {
      await db.dropCollection(collectionName);
      console.log(`Collection "${collectionName}" dropped successfully.`);
    } else {
      console.log(`Collection "${collectionName}" does not exist.`);
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error in cleanDb for collection "${collectionName}": ${err.message}`);
    } else {
      console.error(`Error in cleanDb for collection "${collectionName}": ${String(err)}`);
    }
    throw err;
  }
};


