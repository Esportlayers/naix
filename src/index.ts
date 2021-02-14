require('dotenv').config();
import bodyParser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
import {sentimentAnalyses} from './sentimentAnalyses';

const app = express();
app.use(bodyParser.json());

function checkApiKey(req: Request, res: Response, next: NextFunction) {
  const key = req.params.apiKey as string || req.query.apiKey as string;

  if(!key || key !== process.env.API_KEY) {
    return res.status(401).json({msg: 'Unauthorized'});
  }

  return next();
}

app.post('/', checkApiKey, async (req, res) => {
  const content = req.body.message;

  if(!content) {
      return res.sendStatus(400);
  }

  const analyses = await sentimentAnalyses(content);
  console.log(`[Sentiment Analyze] "${content}" | Score: ${analyses.score} | Magnitude: ${analyses.magnitude}`);
  return res.json(analyses).status(200);
})

app.listen(process.env.PORT, () => {
  console.log(`API started on port ${process.env.PORT}`)
});