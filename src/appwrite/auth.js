import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite"
export class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }


    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if (userAccount) {
                return await this.login({ email, password });
            }

            return userAccount;
        } catch (error) {
            throw error;
        }
    }


    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);

        } catch (error) {
            throw error;
        }
    }
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            // when the service is not reach out 
            console.log("Appwrite service :: getCurrentUser :: error", error)
        }
        // but when the coount is not found
        return null;
    }
    async logout() {
        try {
            await this.account.deleteSessions()
            // all the session will get logged out from different browser
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}
const authService = new AuthService();
export default authService