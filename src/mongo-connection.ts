import { MongoClient } from 'mongodb';

const MONGO_URL = 'mongodb://localhost:27017/hour_logger';

export const connectMongo = async () => {
  const db = await MongoClient.connect(MONGO_URL);
  return { Logs: db.collection('logs') };
};
