import { databases } from "./config";
import { ID, Query } from "appwrite";
class Note {
    #databaseID
    #collectionID

    constructor(){
        this.#databaseID = import.meta.env.VITE_APPWRITE_DATABASE_ID
        this.#collectionID = import.meta.env.VITE_APPWRITE_COLLECTION_ID
    }

    async getNotes(page = 0){
        try {
            let res = await databases.listDocuments(
                this.#databaseID,
                this.#collectionID,
                [
                    Query.limit(6),
                    Query.offset(6 * page),
                ]
            );
            return res
        } catch (error) {
            return "Error While Fetching Notes"
        }
    }
    async createNote(title,body,tagline){
        try {
            await databases.createDocument(
                this.#databaseID,
                this.#collectionID,
                ID.unique(),
                {
                    noteID : ID.unique(),
                    title,
                    body,
                    tagline
                }
            );

            return 1
        } catch (error) {
            console.log(error);
            
            return -1
        }
    }
    async updateNote($id,title,body,tagline){
        try {
             await databases.updateDocument(
                this.#databaseID,
                this.#collectionID,
                $id,
                {
                    title,
                    body,
                    tagline
                }
            );

            return 1
        } catch (error) {
            console.log(error);
            return -1
        }
    }
    async deleteNote(noteID){
        try {
            await databases.deleteDocument(
                this.#databaseID,
                this.#collectionID,
                noteID
            );

            return 1
        } catch (error) {
            return -1
        }
    }
}


const note = new Note()

export default note