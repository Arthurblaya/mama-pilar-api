import { MongoClient, Db } from "mongodb";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
const DATABASE_NAME = process.env.DATABASE_NAME || "mama-pilar-api";

export class MongoConfig {
    private static client: MongoClient | null = null;

    static async connect(): Promise<Db> {
        if (!this.client) {
            this.client = new MongoClient(MONGO_URI);
            await this.client.connect();
            console.log("Connected to MongoDB");
        }
        return this.client.db(DATABASE_NAME);
    }

    static async disconnect(): Promise<void> {
        if (this.client) {
            await this.client.close();
            this.client = null;
            console.log("Disconnected from MongoDB");
        }
    }
}
