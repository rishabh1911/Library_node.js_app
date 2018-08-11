const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyparser = require('body-parser');// from node modules


const port = process.env.port || 8080;
const app = express();

// morgan used to console log all web traffic logs
app.use(morgan('tiny'));
// to get body from post
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
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

const nav = [{ title: 'Books', link: '/books' },
  { title: 'Author', link: 'authors' }];

const bookRoutes = require('./src/routes/bookRouter')(nav); // from files
const adminRoutes = require('./src/routes/adminRouter')();
const authRoutes = require('./src/routes/authRouter')();

app.use('/books', bookRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);

app.get('/', (request, response) => {
  response.render(
    'index',
    {
      nav,
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
