import { IPost } from "../types.ts";
import db from "../config/db.ts";
import { Database } from "../config/db.ts";

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

  async findOneByTitle(title: string): Promise<Partial<IPost>[]> {
    return await this.data.find({ title });
  }

  async insert(
    data: any,
  ): Promise<Boolean> {
    await this.data.insertOne(
      { ...data, url: data.title.toLowerCase().replace(/\W+/g, "_") },
    );
    return true;
  }

  async update(
    title: string,
    content: string,
  ): Promise<Number> {
    const { matchedCount } = await this.data.updateOne(
      { title },
      { $set: { content } },
    );
    return matchedCount;
  }

  async delete(title: string): Promise<Number> {
    return await this.data.deleteOne({ title });
  }
}

export const Post = new PostModel(db);
