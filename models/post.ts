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
    try {
      return await this.data.find({ title });
    } catch (error) {
      throw error;
    }
  }

  async insert(
    data: any,
  ): Promise<Boolean> {
    try {
      await this.data.insertOne({ ...data, url: data.title.toLowerCase( ).replace(/\W+/g, "_")});
      return true;
    } catch (error) {
      throw error;
    }
  }

  async update(
    title: string,
    content: string,
  ): Promise<Number> {
    try {
      const { matchedCount } = await this.data.updateOne(
        { title },
        { $set: { content } },
      );
      return matchedCount;
    } catch (error) {
      throw error;
    }
  }

  async delete(title: string): Promise<Number> {
    try {
      return await this.data.deleteOne({ title });
    } catch (error) {
      throw error;
    }
  }
}

export const Post = new PostModel(db);
