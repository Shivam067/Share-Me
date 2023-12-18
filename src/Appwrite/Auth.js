import config from "../config/config";
import { Client, Account, ID } from "appwrite";


// here we are creating authentication service. A service provides method whch takes data in it and perform the work, we do consern about its inner code.
// basically we are putting all the code which required in auth in one file and export its method, so in future if we want to replace Appwrite with other service we just need to change the code in this file.
// bassically we are creating a wrapper around Appwrite service.

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectID)
        this.account = new Account(this.client);
    }

    async createAccount({name, email, password})
    {
        try{
            console.log(name, email, password);
            // order matters, email, password, name
            const userInfo = await this.account.create(ID.unique(), email, password, name);
            if(userInfo){
                // call another method
                return this.login({email, password})
            }
            else return null;
        }catch(e){
            console.log(e);
            return false
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailSession(email, password);
        }catch (error) {
            console.log(error);
        }
    }

    async currentSession(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log(error);
        }
        return null
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log(error)
        }
    }
}

const authService = new AuthService();

export default authService;