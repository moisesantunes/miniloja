const modelDb=require("../db-schema/model");

exports.excluirProduto = (req, res)=>{
	console.log("excluindo ",req.params.prodid)
modelDb.Catalogo.findOne({idCriador:req.user._id},(err,res)=>{
	res.produtos.id(req.params.prodid).remove()
	res.save()

})

	res.redirect("/meuCatalogo")
	
}
