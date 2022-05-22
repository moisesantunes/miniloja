const express = require("express")
const app =express()
const methodOverride = require('method-override')
const mongoose = require("mongoose")
const bodyParser =require("body-parser")
const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');
const session = require('express-session');
const connectEnsureLogin = require('connect-ensure-login'); 
const flash = require('connect-flash');

app.use(methodOverride('_method'))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.authenticate('session'));

app.use(express.static('public'))

app.set('view engine', 'ejs');

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended: true}))
/*
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
*/
app.use(passport.initialize());
app.use(passport.session());

app.use(flash())

const rget = require("./routes/rget.js")
const rpost= require("./routes/rpost.js")
const rput= require("./routes/rput.js")
const modelDb= require("./db-schema/model.js")

passport.use(modelDb.Usuario.createStrategy())
passport.serializeUser(modelDb.Usuario.serializeUser());
passport.deserializeUser(modelDb.Usuario.deserializeUser());



const url = `mongodb+srv://moises01:12345@mycluster.t1zs5.mongodb.net/GeralDb?retryWrites=true&w=majority`
//`mongodb+srv://moises:12345@mycluster-b3ugy.mongodb.net/<dbname>?retryWrites=true&w=majority`;

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })


app.get("/",(req,res)=>{
	//console.log(req.session)
	res.render("home",{user:req.user})
})



// rotas auth

app.use("/", require("./routes/auth"))

//rotas get
/*
app.get("/produtos", rget.produtos)
app.get("/produto/novo", rget.produtoNovo)
*/

app.get("/dashboard", rget.dashboard)
app.get("/dashboardForm", rget.dashboardForm)
app.get("/dashboardEdit", rget.dashboardEdit)

app.get("/meusCatalogos", rget.meusCatalogos)
app.get("/criarCatalogo", rget.criarCatalogo)
app.get("/detalharCatalogo/:catalogoId", rget.detalharCatalogo)

app.get("/cadastrarProduto/:catalogoId", rget.cadastrarProduto)




//rotas post
//app.post("/produto/novo", rpost.produtoNovo)

app.post("/salvarDashboard", rpost.salvarDashboard)

app.post("/salvarCatalogo", rpost.salvarCatalogo)

app.post("/cadastrarProduto/:catalogoId", rpost.cadastrarProduto)

//rotas put
app.put("/salvarDashboard", rput.dashboardEdit)



app.listen(3000, ()=>{
	console.log("ta onn")
})
