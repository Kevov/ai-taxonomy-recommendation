import express from "express";
import { summarize } from "./summarize";
import { vectorStoreSearch } from "./vector_search";
import { vectorInput } from "./vector_input";
import { TagModel } from "./tagModel";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.use(cors({
    origin: '*', // Allow all origins for simplicity; adjust as needed for security
    methods: ['GET', 'POST'] // Allow specific methods
}));

// Routes
app.get('/', (req, res) => {
  res.send('Hello, Node.js Server lol!');
});

app.post('/generate', async (req, res): Promise<void> => {
    const article_content: string = req.body.text;
    try {
        if (!article_content) {
            res.status(400).json({ error: 'Article content is required for summarization.' });
            return;
        }
        
        const summary: string = await summarize(article_content);
        const searchRes = await vectorStoreSearch(summary);

        res.json({
            ai_summary: summary,
            searchResults: searchRes.map(result => ({
                tag_name: result.getTagName(),
                text: result.getTagDescription()
            })),
            original_input: article_content 
    });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while generating the response' });
    }
});

app.post('/input_tag', async (req, res): Promise<void> => {
    const tagListObj = req.body.tagList;
    
    try {
        if (!tagListObj) {
            res.status(400).json({ error: 'Tag list is required for inputting to MongoDB Atlas.' });
            return;
        }
        console.log("Received tag list:", tagListObj);
        const tagList: TagModel[] = tagListObj.map((tag: { tag_name: string; text: string }) => TagModel.fromObject(tag));
        await vectorInput(tagList);
        res.json({ message: 'Tag input successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while inputting the tag to MongoDB Atlas' })
    }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

// Endpoint to check the status of the server
app.get('/ping', (_, res) => {
	res.jsonp({ message: 'pong' });
});