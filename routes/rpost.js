const modelDb=require("../db-schema/model")

/*
exports.produto =(req, res)=>{
	console.log(req.body)
	res.json({"r": "Produto postado aqui"})
}


exports.produtoNome = (req, res)=>{
	res.send(`Enviando : ${req.params.nome}`)
}
exports.produtoNovo= async (req, res)=>{
	let Produto = await new modelDb.Produto(req.body)
	try{
		await Produto.save()
		//console.log(req.body)
		res.redirect("/produto/novo")
	}catch (error){
		response.status(500).send(error)
	}
}
*/

exports.salvarCatalogo= async (req, res)=>{
	if(!req.user){
		req.flash('error', 'Desculpa, tem que estar logada(o) para criar ')
		res.render("login",{message:req.flash('error')})
	}
	let catalogo =req.body;
	
	catalogo.idCriador = req.user._id;
	let Catalogo=  await new modelDb.Catalogo(catalogo)
	try{
		Catalogo.save()
		res.redirect("/meuCatalogo")
	}catch{
		response.status(500).send(error)
	}
}



exports.salvarDashboard = async (req, res)=>{
	let obj=req.body;
	obj.idUsuario= req.user._id;
	obj.nomeUsuario= req.user.username;		
	let Dashboard = await new modelDb.Dashboard(obj);
	try{
		await Dashboard.save()
		res.redirect("/dashboard")
	}catch(error){
		response.status(500).send(error)	
	}

//	res.redirect("/dashboard")
}

exports.cadastrarProduto = async (req, res)=>{
	let catalogo = await modelDb.Catalogo.findOne({_id:req.params.catalogoId})	
	catalogo.produtos.push(req.body)
	try{
		catalogo.save()
		res.redirect("/meuCatalogo")
	}catch(error){
		response.status(500).send(error)
	}
}
