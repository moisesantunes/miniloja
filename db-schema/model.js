/*
coleções:
1- usuarios =UsuarioSchema *ok*
2- informacao do usuario = DashboardSchema *ok*
3- catalogos criadoa = CatalogoSchema
4- produtos (talves seja sub-doc dos catalogos)= ProdutoSchema *ok*
5- carrinho =CarrinhoSchema
*/



const mongoose =require("mongoose")
const passportLocalMongoose = require('passport-local-mongoose');
const Schema =mongoose.Schema



const UsuarioSchema = new Schema({
	username :{
		type:String,
	},
	hashed_password	:{
		type: String,
	}
})
UsuarioSchema.plugin(passportLocalMongoose);


const ProdutoSchema = new Schema({
	fabricante: String,
	nome: String,
	imagens:[String],
	imgnomes:[String],
	precoVenda: Number,
	precoOriginal: Number,
	desconto: Number,
	pesoMl:Number,
	descricao: String,
	qtdEstoque:Number	
})

const CatalogoSchema = new Schema({
	idCriador: String,
	nome:String,
	estado: String,
	descricao: String,
	categoria:String,
	produtos:[ProdutoSchema]
})


const DashboardSchema = new Schema({
	idUsuario:String,
	nomeUsuario:String,
	email:String,
	nomeComp: String,
	endereco: String,
	cep:String,
	numCasa:String,
	complemento: String,
	telefone:[String]	
})

const Produto = mongoose.model("Produto", ProdutoSchema)
const Usuario = mongoose.model("Usuario", UsuarioSchema, "Usuario")
const Dashboard = mongoose.model("Dashboard", DashboardSchema)
const Catalogo = mongoose.model("Catalogo", CatalogoSchema)

exports.Produto = Produto;
exports.Usuario = Usuario;
exports.Dashboard = Dashboard;
exports.Catalogo =Catalogo;
/*

const url = `mongodb+srv://moises01:12345@mycluster.t1zs5.mongodb.net/GeralDb?retryWrites=true&w=majority`

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(url,connectionParams)
    .then( () => {
         console.log('Connected to database ')
	})
	.catch( (err) => {
	console.error(`Error connecting to the database.`
	})
	*/
