# Library


Library is a small app which I created to learn node.js with express. It has the following features:

  - Authentication with the help of passport API is added. 
  - UI is made using Bootstrap.
  - EJS template engine is used.
  - Mongo-DB is used to store list of Books in library and list of allowed users.

# Features!

  - First a default set of 8 books is added to add and a user admin is added.
  - User can sign in with username and password.
  - If user is new, he/she can sign up.
  - After signing in we are redirected to library page with list of all books.
  - user can add book by clicking on add book page.
  - user can also see book details by clicking read more button


### Installation

Library runs on  [Node.js](https://nodejs.org/) version 10.4.1. Please have node and npm setup before to run this.  

It uses mongoDB as database. Please install mongodb and run its server before starting the application.

Install the dependencies and devDependencies and start the server.

```sh
$ git clone https://github.com/rishabh1911/library.git
$ npm start
```

For Windows ...

```sh
$ git clone https://github.com/rishabh1911/library.git
$ npm run startWindows
```

Then open browser and hit url http://localhost:3000/admin once.
Then open http://localhost:3000/ to run the app.

### Tools

Library is developed using the following tools.

| Tools |
| ------ |
| Node |
| Npm |
| NVM | 
| eslint | 
| nodemon | 
| ejs | 
| passport-local |
| express |
| mongodb |
