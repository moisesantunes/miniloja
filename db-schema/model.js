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

/*
Mudancas:
tirar fabricante,
limitar imagens entre 2 e 5
tirar preco original,
refatorar desconto - agorar sera deafult 0,
tiar peso
tirar qtdEstoque 
colocar :tenhoparavender


*/

const ProdutoSchema = new Schema({
	nome: String,
	imagens:[String],
	imgnomes:[String],
	precoVenda: Number,
	desconto: {type:Number, default:0},
	descricao: String,
	tenho: String	
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
