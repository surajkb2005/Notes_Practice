import express from 'express';
import cors from 'cors';

const app = express();

const port = process.env.PORT || 5000;

app.listen(port,'0.0.0.0',()=>{
    console.log(`Server is running on port ${port}`);
})