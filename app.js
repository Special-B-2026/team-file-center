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

<div class="card">


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
<=7
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
onclick="trackDownload('${file.name}')"
href="${file.url}"
target="_blank"
class="download">

↓ ดาวน์โหลดไฟล์

</a>



</div>

`;

}




render(FILE_LIBRARY);
loadStatistics();




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

const STAT_URL = 
"https://script.google.com/macros/s/AKfycbxg-Lude_lyPCMhkUIuPE3bO9c_-o9qNHz3YMtrCwpMsVV4frXlFXb0_BVuLPk8xAVY/exec";


function trackDownload(fileName){

fetch(STAT_URL,{
    method:"POST",
    mode:"no-cors",
    keepalive:true,
    body:JSON.stringify({
        file:fileName,
        action:"Download"
    })
});

}

async function loadStatistics(){

  const res = await fetch(STAT_URL);

  const data = await res.json();

  document.querySelectorAll(".card").forEach(card=>{

    let name = card.dataset.name;

    if(data[name]){

      let count = document.createElement("div");

      count.className="download-count";

      count.innerHTML =
      "ดาวน์โหลดแล้ว "+data[name]+" ครั้ง";

      card.appendChild(count);

    }

  });

}

