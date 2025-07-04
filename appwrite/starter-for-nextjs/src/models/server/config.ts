import {Avatars, Client, Databases, Storage, Users, Account} from "node-appwrite"

let client = new Client();

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) // Your API Endpoint
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID) // Your project ID
    .setKey(process.env.NEXT_API_KEY) // Your secret API key

// const account = new Account(client);
const databases = new Databases(client);
const avatars = new Avatars(client);
const storage = new Storage(client)
const users = new Users(client);

export { client,  databases , avatars, storage, users};
    