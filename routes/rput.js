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
