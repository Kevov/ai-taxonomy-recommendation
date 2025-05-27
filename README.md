# ai-taxonomy-recommendation


Basic prerequisite, you need to install Node.js. Instructions [here](https://nodejs.org/en)

In addition, you also need to have a MongoDB account so you can set up your own Atlas Vector Database (it's free!). Once you create the account and sign in, MongoDB should redirect you to the page to create your first database with instruction. Or you can try following [this link.](https://www.mongodb.com/resources/products/fundamentals/create-database#using-the-mongodb-atlas-ui)

Environment Variable needed:

```GOOGLE_AI_KEY``` for embedding model and summarization. ```MONGO_ATLAS_CONNECTION_URI``` to connect to your instance of MongoDB Atlas

To run application, execute these 2 commands in your bash terminal:

``` 
npm run build
npm run start
```

The application runs under the route ```/generate``` as a GET request. By default, when running on your local environment, the port will be 3000. So to get a response, your URL should be ```localhost:3000/generate```.

The basic input format for the request body:
```json
{
    "text": "<your article content here>"
}
```
The output format of the response body:
```json
{
    "ai_summary": "<The search query created from your article>",
    "searchResults": [
        {
            "tag_name": "<name>",
            "text": "<description>"
        }
    ],
    "original_input": "<your original article content>"
}
```