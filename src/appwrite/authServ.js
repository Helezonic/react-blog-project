import {Client, Account, ID} from "appwrite"
import { conf } from "../conf/conf"

class AuthService{
  client = new Client()
  account 

  constructor () {
    this.client.setEndpoint(conf.appwrite_url).setProject(conf.appwrite_project)
    this.account = new Account(this.client)
  }

  createAccount = async({email, password}) => {
    try {
      console.log("Inside creation Appwrite Service", email, password)
      const create = await this.account.create(ID.unique(), email, password)
      if (create) {
        console.log(create, "ACCOUNT CREATION RETURN")
        return this.login({email,password})
      }
    } catch (error) {
      throw error
    }
}

  login = async({email, password}) => {
    try {
      console.log("Inside Login Appwrite Service")
      const session = await this.account.createEmailPasswordSession(email,password)
      if (session) console.log("logged in") 
      return session
    } catch (error) {
      throw error
    }
  }

  getUser = async() => {
    try {
      return await this.account.getSession("current")
    } catch (error) {
      console.log("Fetch User Details Error")
      throw error
    }
  }

  logout = async() => {
    try {
      return await this.account.deleteSessions()
    } catch (error) {
      throw error
    }
  }
}

export const authserv = new AuthService