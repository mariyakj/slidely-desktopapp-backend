// index.ts

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import { Submission, DBSchema } from './dbInterfaces';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Read data from db.json
const readDatabase = (): Submission[] => {
  try {
    const data = fs.readFileSync('./src/db.json', 'utf-8');
    const db: DBSchema = JSON.parse(data);
    return db.submissions || [];
  } catch (error) {
    console.error('Error reading database:', error);
    return [];
  }
};

// Write data to db.json
const writeDatabase = (data: Submission[]) => {
  try {
    const db: DBSchema = { submissions: data };
    fs.writeFileSync('./src/db.json', JSON.stringify(db, null, 2));
  } catch (error) {
    console.error('Error writing to database:', error);
  }
};

// Ping endpoint
app.get('/ping', (req: Request, res: Response) => {
  res.json({ success: true });
});

// Submit new submission
app.post('/submit', (req: Request, res: Response) => {
  try {
    const submissions = readDatabase();
    const newSubmission: Submission = {
      id: submissions.length ? submissions[submissions.length - 1].id + 1 : 1,
      ...req.body
    };
    submissions.push(newSubmission);
    writeDatabase(submissions);
    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ error: 'Failed to submit form' });
  }
});

// Read submission by index
app.get('/read', (req: Request, res: Response) => {
  try {
    const index = parseInt(req.query.index as string, 10);
    const submissions = readDatabase();
    if (index >= 0 && index < submissions.length) {
      res.json(submissions[index]);
    } else {
      res.status(404).json({ error: 'Submission not found' });
    }
  } catch (error) {
    console.error('Error reading submission:', error);
    res.status(500).json({ error: 'Failed to read submission' });
  }
});

// Edit submission
app.put('/edit/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const submissions = readDatabase();
    const index = submissions.findIndex(sub => sub.id === id);
    if (index !== -1) {
      submissions[index] = { ...submissions[index], ...req.body };
      writeDatabase(submissions);
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Submission not found' });
    }
  } catch (error) {
    console.error('Error editing submission:', error);
    res.status(500).json({ error: 'Failed to edit submission' });
  }
});

// Delete submission
app.delete('/delete/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const submissions = readDatabase();
    const newSubmissions = submissions.filter(sub => sub.id !== id);
    if (newSubmissions.length !== submissions.length) {
      writeDatabase(newSubmissions);
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Submission not found' });
    }
  } catch (error) {
    console.error('Error deleting submission:', error);
    res.status(500).json({ error: 'Failed to delete submission' });
  }
});

// Search submission by email
app.get('/search', (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    const submissions = readDatabase();
    const foundSubmission = submissions.find(sub => sub.email === email);
    if (foundSubmission) {
      res.json(foundSubmission);
    } else {
      res.status(404).json({ error: 'Submission not found for the given email' });
    }
  } catch (error) {
    console.error('Error searching submission by email:', error);
    res.status(500).json({ error: 'Failed to search submission by email' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
