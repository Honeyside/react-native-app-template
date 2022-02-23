require('colors');
// eslint-disable-next-line import/no-extraneous-dependencies
const Express = require('express');
const { exec } = require('child_process');

const app = new Express();

app.use((req, res) => {
  console.log('refreshing...'.green);
  exec('eslint "./**/*.js"', (error, stdout) => {
    if (error) {
      console.log(stdout);
      console.log('you have eslint errors: you have to solve them or your app will not start'.red);
      console.log('');
      return res.status(500).send(stdout);
    }
    console.log('no errors, all good'.green);
    console.log('');
    return res.status(200).send('ok');
  });
});

app.listen(3022, () => {
  console.log('');
  console.log('metro linter is running, eslint will run every time you change a file'.green);
  console.log('');
});
