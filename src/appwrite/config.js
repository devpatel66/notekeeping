import { Client, Databases} from 'appwrite';

const client = new Client();
client
    .setEndpoint(import.meta.env.VITE_APPWRITE_URL) // APPWRITE URL
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); //PROJECT ID

export const databases = new Databases(client);
