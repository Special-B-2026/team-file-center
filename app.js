const pdfList =
document.getElementById("pdfList");


const excelList =
document.getElementById("excelList");


const search =
document.getElementById("search");



function render(data){


pdfList.innerHTML="";
excelList.innerHTML="";



let pdf =
data.filter(
f=>f.type==="PDF"
);



let excel =
data.filter(
f=>f.type==="EXCEL"
);



pdf.forEach(file=>{


pdfList.innerHTML += createCard(file);


});



excel.forEach(file=>{


excelList.innerHTML += createCard(file);


});



document.getElementById("totalCount").innerText=data.length;


document.getElementById("pdfCount").innerText=pdf.length;


document.getElementById("excelCount").innerText=excel.length;


}



function createCard(file){


let icon =
file.type==="PDF"
?
"📕"
:
"📗";


return `

<div class="card" data-file="$
{file.name}">

<div class="icon">

${icon}

</div>


<h3>

${file.name}


${
file.update &&
(
(new Date() - new Date(file.update))
/
(1000*60*60*24)
<=7f
)

?

'<span class="new-badge">NEW</span>'

:

''

}

</h3>


<p>

${file.group}

|

${file.type}

</p>


<a 
href="${file.url}"
target="_blank"
class="download"
onclick="downloadCount('${file.url}')">

⬇ ดาวน์โหลดไฟล์

</a>



</div>

`;

}




render(FILE_LIBRARY);




search.addEventListener(

"keyup",

()=>{


let keyword =
search.value.toLowerCase();



let result =

FILE_LIBRARY.filter(

file=>

file.name
.toLowerCase()
.includes(keyword)


);



render(result);



});

async function loadDownloadCount(){

const api =
"https://script.google.com/macros/s/AKfycbwYc5v4KWwzN0vRs51CHBE3P6Sgkoq_LIxhctwfkr08D_iRxV8IiblYfrBPKt3VHVu9kg/exec?action=count";


const res =
await fetch(api);


const data =
await res.json();


document
.querySelectorAll(".card")
.forEach(card=>{


let name =
card.dataset.file;


let count =
data[name] || 0;


let div =
document.createElement("div");


div.className =
"download-count";


div.innerHTML =
"📥 ดาวน์โหลด " + count + " ครั้ง";


card.insertBefore(
div,
card.querySelector(".download")
);


});


}


loadDownloadCount();






