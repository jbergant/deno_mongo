import { MongoClient, Collection } from "https://deno.land/x/mongo@v0.8.0/mod.ts";
export class Database {
  public client: MongoClient;
  private url: string;
  private db: string;
  constructor(private mongoconn: string, private dbName: string) {
    this.url = mongoconn;
    this.db = dbName;
    this.client = new MongoClient();
  }

  connect() {
    this.client.connectWithUri(this.url);
  }

  getDatabase() {
    return this.client.database(this.dbName);
  }

  getTable(collection: string) {
    const database = this.getDatabase();
    return database.collection(collection);
  }
}

const env = Deno.env.toObject();

const dbHostUrl = env.MONGOCONN || "mongodb://localhost:27017";
const dbName = env.MONGODB || "deno_db";

const db = new Database(dbHostUrl, dbName);
db.connect();

export default db;