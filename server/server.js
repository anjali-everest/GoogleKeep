import express from 'express';
import {getAllNotes} from './api/controller/notecontroller'

const app = express();
process.env.NODE_ENV = "development";
app.get('', (request, response) => {
    response.send("Welcome to Google-Keep")
});
app.get('/notes', getAllNotes);

app.listen(3000);

export default app;