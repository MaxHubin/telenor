const express = require('express');
const bodyParser = require('body-parser');
const { enterPin } = require('./index');

const app = express();
const port = 8888;

app.use(bodyParser.json());

app.post('/pin', async (req, res) => {
  let result;
  try {
    const { loginURL, email, password, code } = req.body;
    result = await enterPin({
      loginURL,
      email,
      password,
      code,
    });
  } catch (e) {
    result = e.message;
  }

  res.send({ result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
