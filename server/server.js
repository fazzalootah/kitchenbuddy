require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();

app.use(cors());
app.use(express.json());

const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post('/openai', async (req, res) => {
    const { protein, diet, cuisine } = req.body;

    const messagesToSend = [
        { "role": "system", "content": "You are a helpful assistant." },
        { "role": "user", "content": `Suggest a meal with ${protein}, that is ${diet}, and ${cuisine} cuisine.` }
    ];

    try {
        const response = await openai.createCompletion({
            model: 'gpt-3.5-turbo', 
            messages: messagesToSend
        });
        const assistantReply = response.data.choices[0].message.content;
        res.json({ meal: assistantReply });
    } catch (error) {
        console.error("OpenAI Request Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error connecting to OpenAI', details: error.response ? error.response.data : error.message });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
