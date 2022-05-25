
let qtd=1;
let tmns={}

function addImg(){
	if(qtd <5){
		qtd = qtd +1
		let box = document.getElementById("boxImgs")
//		let count= box.querySelectorAll(".imgs")
		let elemimg=`
		<input type="file" class="imgs"
			id="img${qtd}" 
		 	name="imgnomes" accept="image/*"
			onchange="preview_image(event, this.id)"
			name="imgs">
		<input type="hidden" 
			id="base_img${qtd}" name="imagens">
		<img id="output_image_img${qtd}"/>
		<span class="" id="tamanho_img${qtd}"></span>
		<hr><br> `
		box.innerHTML+=elemimg;
	}else{
		alert("já tem 5 imagens, é o maximo")
	}

}




function preview_image(event, id){
	var reader = new FileReader();
	reader.onload = function(){
		var output = document.getElementById('output_image_'+id);
		let imgid= document.getElementById("base_"+id)
		output.src = reader.result;
		imgid.value= reader.result;
		validaTamanho(event.target, id)
	}
 	reader.readAsDataURL(event.target.files[0]);
}

function validaTamanho(tmn, ref){	
	let img_tmn = (tmn.files[0].size /1000000).toFixed(2)
	tmns[tmn.id] = img_tmn
	console.log(tmns)
	let lista = Object.values(tmns)
	let res = lista.every((i)=>{
		return Number(i) < 1.2;
	})
	console.log(res)
	let span_tmn = document.getElementById("tamanho_"+ref)
	span_tmn.innerHTML = img_tmn

	document.getElementById("bot").disabled= !res;

	if(img_tmn >1.2){
		alert("maior")
		span_tmn.style.color ="red"
	}else {
		alert("menor")
		span_tmn.style.color ="green"

	}
}
