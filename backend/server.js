const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'endo-quiz-db.cvucwm84awwu.eu-north-1.rds.amazonaws.com',
  user: 'admin',
  password: 'admin123',
  database: 'endo_app_db'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

// Register user
app.post('/api/register', async (req, res) => {
  const { username, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
  db.query(query, [username, hashedPassword, email], (err, results) => {
    if (err) {
      console.error('Error registering user:', err);
      res.status(500).send('Server error');
      return;
    }
    res.status(201).send('User registered');
  });
});

// Login user
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], async (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      res.status(500).send('Server error');
      return;
    }

    if (results.length === 0) {
      res.status(401).send('Invalid username or password');
      return;
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).send('Invalid username or password');
      return;
    }

    const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  });
});

// Define the route to get all quizzes
app.get('/api/quizzes', (req, res) => {
  const query = 'SELECT * FROM quizzes';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching quizzes:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json(results);
  });
});

// Define the route to get all questions for a specific quiz
app.get('/api/quizzes/:quizId/questions', (req, res) => {
  const { quizId } = req.params;
  const query = `
    SELECT q.id as questionId, q.text as questionText, q.correct_answer_id, o.id as optionId, o.text as optionText, o.is_correct
    FROM questions q
    JOIN options o ON q.id = o.question_id
    WHERE q.quiz_id = ?
  `;
  db.query(query, [quizId], (err, results) => {
    if (err) {
      console.error('Error fetching questions:', err);
      res.status(500).send('Server error');
      return;
    }

    const questions = {};
    results.forEach(row => {
      if (!questions[row.questionId]) {
        questions[row.questionId] = {
          id: row.questionId,
          text: row.questionText,
          correct_answer_id: row.correct_answer_id,
          options: []
        };
      }
      questions[row.questionId].options.push({
        id: row.optionId,
        text: row.optionText,
        isCorrect: row.is_correct
      });
    });

    res.json(Object.values(questions));
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
