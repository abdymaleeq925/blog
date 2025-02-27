import express from 'express';
import path from 'path';

const app = express();

// Обслуживание статических файлов из папки build
app.use(express.static(path.join(__dirname, 'build')));

// Перенаправление всех запросов на index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});