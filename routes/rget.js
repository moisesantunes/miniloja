const modelDb=require("../db-schema/model")
/*
exports.produtos =(req, res)=>{
	//res.send("Produtos aqui")
	console.log("getado")
	res.json({"p":"um"})
}

exports.produtoNome = (req, res)=>{
	res.send(`Enviando : ${req.params.nome}`)
}
*/
/*
exports.produtoNovo =(req, res)=>{
	if(!req.user)res.redirect("/login")
	res.render("produtoNovo", {user:req.user})
}

*/
// rotas dos catalogos

exports.meuCatalogo =(req, res)=>{
	if(!req.user)res.redirect("/login")
	modelDb.Catalogo.findOne({idCriador:req.user._id},
		(err,cat)=>{
		if(err)return err;
	//	console.log(cat)
		res.render("meusCatalogos",{
			user:req.user, 
			catalogo:cat
		})
	})	
}





exports.detalharCatalogo= (req, res)=>{
	if(!req.user)res.redirect("/login")
	modelDb.Catalogo.findOne({ _id:req.params.catalogoId},(err,cat)=>{
		if(err)return err;
//		console.log(cat);
		res.render("catalogo",{
		user:req.user,
		produtos:cat.produtos
		})
	})	
}

exports.criarCatalogo=(req,res)=>{
	if(!req.user)res.redirect("/login")
	res.render("catalogoForm",{
		user:req.user
	})
}

exports.editarCatalogo= (req, res)=>{
	if(!req.user)res.redirect("/login")
	modelDb.Catalogo.findOne({ idCriador:req.user._id},(err,cat)=>{
		if(err)return err;
//		console.log("para editar",cat);
		res.render("catalogoEdit",{
			user:req.user,
			catalogo:cat
		})
	})			
}

exports.editarProduto =(req,res)=>{
	if(!req.user)res.redirect("/login")
	modelDb.Catalogo.findOne({ idCriador:req.user._id},
	(err,cat)=>{
		if(err)return err;
//		console.log("este é: ", cat)
		res.render("produtoEdit",{
		user:req.user,
		produto: cat.produtos.id(req.params.prodId),
		catalogo:cat.nome
	})	
	})
}
//rotas do dasvoard
exports.dashboard =(req, res) =>{
	if(req.user){
		modelDb.Dashboard.findOne({idUsuario: req.user._id},(err, board)=>{
			if(err){
				return err;
			}
//			console.log(board)
			res.render("dashboard",{user: req.user, dash:board})
		})
	}else{
		req.flash('error', 'Desculpe, tem que estar logado para editar')
		res.redirect("/login")
	}	
}

exports.dashboardForm = (req, res)=>{
	if(req.user){
		res.render("dashboardForm",{user: req.user})
	}else{
		req.flash('error', 'Desculpe, tem que estar logado para editar')
		res.render("login")
	}
}

exports.dashboardEdit= (req,res)=>{
	if(req.user){
		modelDb.Dashboard.findOne({idUsuario: req.user._id},(err, board)=>{
			if(err)return err;
			res.render("dashboardEdit",{
				user: req.user, 
				dash:board,
			})		
		})	
	}else{
		
	}
}


exports.cadastrarProduto =(req, res)=>{
	if(!req.user)res.redirect("/login")
	res.render("produtoNovo", {
		user:req.user,
		catalogo:req.params.catalogoId
		})
}
