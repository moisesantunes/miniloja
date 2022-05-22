
alert("ihh foi")
let qtd=1;

const corpo =document.getElementsByTagName("BODY")[0];
corpo.addEventListener("load",()=>{
	alert('corpo cargado')
})


function addImg(){
	let box = document.getElementById("boxImgs")
	let count= box.querySelectorAll(".imgs")
	let elemimg=`
		<input type="file" class="imgs"
			id="img${count.length + 1}" 
		 	name="imgnomes" accept="image/*"
			onchange="preview_image(event, this.id)"
			name="imgs">
		<input type="hidden" 
			id="base_img${count.length + 1}" name="imagens">
		<img id="output_image_img${count.length + 1}"/>
		${count.length + 1}
		<hr><br> `
	box.innerHTML+=elemimg;
qtd +=1;
console.log(qtd)

}




function preview_image(event, id){
	var reader = new FileReader();
	reader.onload = function(){
		var output = document.getElementById('output_image_'+id);
		let imgid= document.getElementById("base_"+id)
		output.src = reader.result;
		imgid.value= reader.result;
	}
 	reader.readAsDataURL(event.target.files[0]);
}

function dpsmanda(id){
var ps = document.getElementsByTagName('p');

alert(ps.length)

}
