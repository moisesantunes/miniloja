
let qtd=1;
let tmns={}

const MAX_WIDTH = 480;
const MAX_HEIGHT = 480;


function addImg(){
		let box = document.getElementById("boxImgs")
		if(box.children.length <5){
//	let count= box.querySelectorAll(".imgs")
		let article = document.createElement("article")
		article.id= `imgs_tools_${box.children.length+1}`
		let elemimg=`
		<input type="file" class="imgs"
			id="img${box.children.length+1}" 
		 	name="imgnomes" accept="image/*"
			onchange="ajustar(event, this.id)"
			name="imgs" required>
		<input type="hidden" 
			id="base_img${box.children.length +1}" name="imagens">
		<img id="output_image_img${box.children.length+1 }"/>
		<span class="" id="tamanho_img${box.children.length +1}"></span>
		<hr><br>
		 `
		article.innerHTML =elemimg;
		box.appendChild(article)
	//	box.innerHTML+=elemimg;
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
function ajustar(imgs, id){
alert("ajuste iniciado")
	let output = document.getElementById('output_image_'+id);
	let imgInput = document.getElementById('img1');
	let imgid= document.getElementById("base_"+id)

	alert("passo 1")
			let imageFile = imgs.target.files[0];
			let reader = new FileReader();
			reader.onload = (e)=>{
				alert("passo 2")
				let img = document.createElement("img");
				img.onload=(e)=>{
					alert("passo 3")
					let width =img.width;	
					let height= img.height;
					console.log(`antes de ajustar w ${width} e h  ${height}`)
					if(width > height){
						if (width > MAX_WIDTH) {
							height = height * (MAX_WIDTH / width);
							width = MAX_WIDTH;
						}		
					}else{
						if (height > MAX_HEIGHT) {
						        width = width * (MAX_HEIGHT / height);
						        height = MAX_HEIGHT;
						}
						
					}

					let canvas= document.createElement("canvas");
					canvas.id="preCanvas_"+id
					canvas.width = width;
					canvas.height = height

					let ctx = canvas.getContext("2d");
					ctx.drawImage(img,0,0,width,height)

					ctx.mozImageSmoothingEnabled = false;
					ctx.webkitImageSmoothingEnabled = false;
					ctx.msImageSmoothingEnabled = false;
					ctx.imageSmoothingEnabled = false

					let dataurl = canvas.toDataURL(imageFile.type);
				//	document.getElementById("preview")
					output.src = dataurl;
					console.log(`depois de ajustar w ${width} e h  ${height}`)
					imgid.value=dataurl;
				}
				img.src = e.target.result;
			

			}
			reader.readAsDataURL(imageFile)	
}

/*
function preview_image(event, id){
	var reader = new FileReader();
	reader.onload = function(){
//		var output = document.getElementById('output_image_'+id);
		let imgid= document.getElementById("base_"+id)
	//	output.src = reader.result;
		imgid.value= reader.result;
		validaTamanho(event.target, id)
	}
 	reader.readAsDataURL(event.target.files[0]);
 	ajustada(event.target)
}
*/

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


function corrigirImg(){


const car = document.getElementById("carrocel")
//alert(car.offsetWidth)
//alert(car.offsetHeight)
const imgs= document.querySelectorAll(".car-img img");
imgs.forEach((i)=>{
//  alert(`largura ${i.naturalWidth}, alruta ${i.naturalHe

	if(i.naturalHeight > i.naturalWidth){
		i.classList.add("retrato");
 //  alert("retrato")
//      i.width=200
 //      i.height = car.offsetHeight
    }else{
    	i.classList.add("paisagem");                       91 //      alert("paisagem")
 //      i.width= car.offsetWidth
 //  i.heigth=200
    }
 })

 }
