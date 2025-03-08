import config from "../configVariable/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        return this.login({ email, password }); // Auto-login after signup
      }
      return null;
    } catch (error) {
      console.error("Error creating account:", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.account.get();
      return user;
    } catch (error) {
      console.error("Appwrite Service :: getCurrentUser :: error", error);
      return null;
    }
  }

  async logout() {
    try {
      return await this.account.deleteSession("current");
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
