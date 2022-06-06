const modelDb=require("../db-schema/model");

exports.excluirProduto = (req, res)=>{
	console.log("excluindo ",req.params.prodid)
	res.redirect("/meuCatalogo")
}
