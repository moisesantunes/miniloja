const modelDb=require("../db-schema/model")

exports.dashboardEdit = async (req, res)=>{
//	console.log("PUTOU", req.body)
	 modelDb.Dashboard.findOneAndUpdate(
		{idUsuario:req.user._id},
		req.body,
		(err, dash)=>{
		if(err)return err;
		res.redirect("/dashboard")
	})

	//res.redirect("/dashboard")
}

exports.editarCatalogo = async (req,res)=>{
//	console.log(req.body)
	modelDb.Catalogo.findOneAndUpdate(
		{idCriador:req.user._id},
		req.body,
		(err, dash)=>{
		if(err)return err;
		res.redirect("/meuCatalogo")
	})	
	
}

exports.editarProduto = async (req,res)=>{
    let produto = await modelDb.Catalogo.findOne({idCriador:req.user._id})
	produto.produtos.id(req.params.prodId).nome =req.body.nome
	produto.produtos.id(req.params.prodId).precoVenda =req.body.precoVenda
	produto.produtos.id(req.params.prodId).desconto =req.body.desconto
	produto.produtos.id(req.params.prodId).tenho =req.body.tenho
	produto.produtos.id(req.params.prodId).categoria =req.body.categoria
	produto.produtos.id(req.params.prodId).descricao =req.body.descricao
	produto.produtos.id(req.params.prodId).imagens =req.body.imagens
	try{
		let prodAtualizado= await produto.save()
		res.redirect("/meuCatalogo")		

	}catch{
		res.send(`Acho que deu ruim em algum lugar`)
	}
/*
	modelDb.Catalogo.findOne({idCriador:req.user._id},
		(err, prod)=>{
		if(err)return err;
		let produto = prod.produtos.id(req.params.prodId) 
		produto =req.body
		prod.save((err,r)=>{
		res.redirect("/meuCatalogo")		
		})
	})	

*/

		
}
