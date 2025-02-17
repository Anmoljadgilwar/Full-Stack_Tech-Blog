import config from "../configVariable/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();

  Databases;
  Buckets;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.Databases = new Databases(this.client);
    this.Buckets = new Storage(this.client);
  }

  async createPost({ Title, slug, Content, featuredImage, status, userId }) {
    try {
      return await this.Databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          Title,

          Content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("appwrite Service :: createPost :: error ", error);
    }
  }

  async updatePost(slug, { Title, Content, featuredImage, status }) {
    try {
      return await this.Databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          Title,
          Content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("appwrite Service :: updatePost :: error ", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.Databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("appwrite Service :: deletePost :: error ", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.Databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("appwrite Service :: getPost :: error ", error);
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.Databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("appwrite Service :: getPosts :: error ", error);
      return false;
    }
  }

  //file upload Service
  async uploadFile(file) {
    try {
      return await this.Buckets.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("appwrite Service :: uploadFile :: error ", error);
    }
  }

  async deleteFile(fileId) {
    try {
      await this.Buckets.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("appwrite Service :: deleteFile :: error ", error);
    }
  }

  getFilePreview(fileId) {
    return this.Buckets.getFilePreview(config.appwriteBucketId, fileId);
  }
}
const service = () => new Service();

export default service;
