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
      const userAccount = await this.account.createAccount(
        ID.unique(),
        email,
        password,
        name
      );
    } catch (error) {
      throw error;
    }

    if (userAccount) {
      //another method
      return this.login({ email, password });
    } else {
      return userAccount;
    }
  }

  async login({ email, password }) {
    try {
      return await account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
      // Logged in
    } catch (err) {
      //throw err;
      console.log("appwrite Service :: get curent user :: error ", err);
      // Not logged in
    }
    return null;
  }

  async logout() {
    try {
      // Delete all browser session
      return await this.account.deleteSessions("current");
    } catch (error) {
      console.log("appwrite Service :: get curent user :: error ", error);
    }
  }
}

const authService = new AuthService();

export default authService;
