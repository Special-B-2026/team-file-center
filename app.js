const API_URL =
"https://script.google.com/macros/s/AKfycbwYc5v4KWwzN0vRs51CHBE3P6Sgkoq_LIxhctwfkr08D_iRxV8IiblYfrBPKt3VHVu9kg/exec";


let downloadData={};



async function loadCount(){

const res =
await fetch(API_URL+"?action=count");


downloadData =
await res.json();


render(FILE_LIBRARY);

}




function render(files){


let pdf="";
let excel="";


files.forEach(file=>{


let icon =
file.type=="PDF"
?"📕"
:"📗";


let count =
downloadData[file.name] || 0;



let card = `


<div class="card">


<div class="icon">
${icon}
</div>


<h3>${file.name}</h3>


<div class="download-count">

⬇ ดาวน์โหลด ${count} ครั้ง

</div>


<a class="download"

href="${file.url}"

target="_blank"

onclick="addDownload('${file.name}')"

>

ดาวน์โหลดไฟล์

</a>


</div>


`;



if(file.type=="PDF")

pdf+=card;

else

excel+=card;



});



document.getElementById("pdfList").innerHTML=pdf;

document.getElementById("excelList").innerHTML=excel;



document.getElementById("allCount").innerHTML=files.length;


document.getElementById("pdfCount").innerHTML=
files.filter(x=>x.type=="PDF").length;


document.getElementById("excelCount").innerHTML=
files.filter(x=>x.type=="Excel").length;


}



function addDownload(name){


fetch(
API_URL+
"?action=download&file="
+
encodeURIComponent(name)

);


}



document
.getElementById("search")
.addEventListener("keyup",function(){


let keyword=this.value.toLowerCase();


let result =
FILE_LIBRARY.filter(
x=>x.name.toLowerCase().includes(keyword)
);


render(result);


});



loadCount();