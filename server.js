const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

const staticPath = path.resolve(__dirname, 'dist');

app.use(express.static(staticPath));

app.use('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Приложение доступно по адресу http://localhost:${PORT}`);
});
