import { MongoClient } from "mongodb";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

const GOOGLE_AI_KEY = process.env.GOOGLE_GEMINI_KEY;
const MONGO_ATLAS_CONNECTION_URI = process.env.MONGO_ATLAS_CONNECTION_URI;

export async function vectorInput(tagList: string) {
    if (!MONGO_ATLAS_CONNECTION_URI) {
            throw new Error("MONGO_ATLAS_CONNECTION_URI is not set in the environment variables.");
        }
        const client = new MongoClient(MONGO_ATLAS_CONNECTION_URI);
    try {
        // // define your Atlas Vector Search index
        // const database = client.db("epic-tags");
        // const collection = database.collection("tags2");
        // const embeddings = new GoogleGenerativeAIEmbeddings({
        //     model: "text-embedding-004",
        //     apiKey: GOOGLE_AI_KEY
        // });
        // const index = {
        //     name: "vector_index",
        //     type: "vectorSearch",
        //     definition: {
        //     "fields": [
        //         {
        //         "type": "vector",
        //         "numDimensions": 768,
        //         "path": "plot_embedding",
        //         "similarity": "dotProduct",
        //         "quantization": "scalar"
        //         },
        //         {
        //         "type": "filter",
        //         "path": "genres"
        //         },
        //         {
        //         "type": "filter",
        //         "path": "year"
        //         }
        //     ]
        //     }
        // }

        // // run the helper method
        // const result = await collection.createSearchIndex(index);
        // console.log(`New search index named ${result} is building.`);

        // // wait for the index to be ready to query
        // console.log("Polling to check if the index is ready. This may take up to a minute.")
        // let isQueryable = false;
        // while (!isQueryable) {
        //     const cursor = collection.listSearchIndexes();
        //     for await (const index of cursor) {
        //         if (index.name === result) {
        //         if (index.queryable) {
        //             console.log(`${result} is ready for querying.`);
        //             isQueryable = true;
        //         } else {
        //             await new Promise(resolve => setTimeout(resolve, 5000));
        //         }
        //         }
        //     }
        // }
    } finally {
        await client.close();
    }
}
