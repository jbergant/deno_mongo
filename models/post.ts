import { IPost } from "../types.ts";
import db from "../config/db.ts";
import { Database }  from "../config/db.ts";

const env = Deno.env.toObject();

class PostModel {
  private data: any;

  constructor(dbClient: Database) {
      
    this.data = db.getTable(env.DBTABLE || "posts");
  }

  async findAll(): Promise<Partial<IPost>[]> {
    try {
      return await this.data.find({ title: { $ne: null } });
    } catch (error) {
      throw error;
    }
  }
}

export const Post = new PostModel(db);