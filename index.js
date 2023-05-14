const express= require('express');
const app = express();
const port = 8050;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session=require('express-session');
// const passport=require('passport');
const passport=require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware=require('node-sass-middleware');
// app.use(sassMiddleware({
//     src:'./assets/scss',
//     dest:'./assets/css',
//     debug: true,
//     outputStyle: 'extended',
//     prefix: '/css'  
// }));
app.use(express.urlencoded());

app.use(express.static('./assets'));
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine','ejs');
app.set('views','./views');
//mongo store is used to store the session cookies in db
app.use(session({
  name: 'codeial',
  secret: 'blahsomething',
  saveUninitialized: false,
  resave : false,
  cookie: {
    maxAge: (1000*60*100)
  },

}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use('/',require('./routes'));

app.listen(port,function(err){
      if(err){
          console.log(`Error: ${err}`);
      }else{
    console.log(`server is running on port : ${port}`);
      }  
});