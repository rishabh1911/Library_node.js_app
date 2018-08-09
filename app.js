const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const bookRouter = express.Router();
const port = process.env.port || 8080;
const app = express();

// morgan used to console log all web traffic logs
app.use(morgan('tiny'));
// use static files in public folder
app.use(express.static(path.join(__dirname, 'public')));
// to avoid copy paste of js and css files we can give commands for alternate paths.
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/popper/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');


// // express is used to route requests
// app.get('/', (request, response) => {
//   // we need to send fully qualified path of file
//   // using __dirname, which gives location of current executable. we can
//   // use a kind of relative path but this has issue between platforms
//   // of mac and windows so we use path
//   response.sendFile(path.join(__dirname, 'views', 'index.html'));
// });

app.use('/books', bookRouter);

bookRouter.route('/')
  .get((req, res) => {
    res.send('Hello books');
  });

app.get('/', (request, response) => {
  response.render(
    'index',
    {
      nav:
        [{ title: 'Books', link: '/books' },
          { title: 'Authors', link: 'authors' }],
      title: 'Library'
    }
  );
});
// now we can run app using command: node app.js
// this command only runs the js file
// thus understand express is just another js file.
app.listen(3000, () => {
  // two ways of using chalk
  // console.log(`listening on ${chalk.red('port: ')} `+chalk.green(3000));

  // better not to use console.log() but use debug.
  debug(`listening at ${chalk.red('port: ')} ${chalk.green(port)}`);
  // now run app using: DEBUG=app node app.js
});
