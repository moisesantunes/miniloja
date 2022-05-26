
let qtd=1;
let tmns={}

function addImg(){
		let box = document.getElementById("boxImgs")
		if(box.children.length <5){
//	let count= box.querySelectorAll(".imgs")
		let elemimg=`
		<article id="imgs_tools_${box.children.length +1}">
		<input type="file" class="imgs"
			id="img${box.children.length+1}" 
		 	name="imgnomes" accept="image/*"
			onchange="preview_image(event, this.id)"
			name="imgs" required>
		<input type="hidden" 
			id="base_img${box.children.length +1}" name="imagens">
		<img id="output_image_img${box.children.length+1 }"/>
		<span class="" id="tamanho_img${box.children.length +1}"></span>
		<hr><br>
		</article> `
		box.innerHTML+=elemimg;
	}else{
		alert("já tem 5 imagens, é o maximo")
	}

}


function remImg(){

	const box = document.getElementById("boxImgs");
	if(box.children.length <=1){
		 alert("só tem um e precisa de pelo menos uma")
	}else{
		box.removeChild(box.lastElementChild);
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
