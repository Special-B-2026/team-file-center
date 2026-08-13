// =======================================
// Loan Document Center
// app.js
// Version: Stable
// Compatible with FILE_LIBRARY
// =======================================

const STAT_API =
"https://script.google.com/macros/s/AKfycbyLxywK5BQ25-ZaPqvG1g_Lxlj4vdpnvpkIUdDHMJ95RLUScVInFnm-wCP-PM0Tss64AA/exec";


document.addEventListener("DOMContentLoaded", function(){

    if(typeof FILE_LIBRARY === "undefined"){
        console.error("FILE_LIBRARY not found");
        return;
    }

    countView();
    renderFiles(FILE_LIBRARY);

    updateSummary();

    initSearch();

});




// =======================================
// Render Files
// =======================================

function renderFiles(data){


    const pdfBox = document.getElementById("pdfList");
    const excelBox = document.getElementById("excelList");


    if(pdfBox) pdfBox.innerHTML = "";
    if(excelBox) excelBox.innerHTML = "";



    data.forEach(file=>{


        let card = createCard(file);


        let type = file.type.toLowerCase();



        if(type === "pdf"){

            pdfBox.innerHTML += card;

        }



        else if(
            type === "excel" ||
            type === "xlsx"
        ){

            excelBox.innerHTML += card;

        }


    });


}





// =======================================
// Create Card
// =======================================

function createCard(file){


    let icon =
    file.type.toLowerCase() === "pdf"
    ? "📕"
    : "📗";



    return `

    <div class="card">


        <div class="icon">
            ${icon}
        </div>


       <h3>
${file.title}
${file.isNew ? '<span class="new-badge">NEW</span>' : ''}
</h3>


        <p>
            หมวดหมู่ : ${file.category}
        </p>


        <a
class="download"
href="./files/${file.fileName}"
onclick="countDownload('${file.fileName}')">
ดาวน์โหลด
</a>


    </div>


    `;


}






// =======================================
// Summary
// =======================================

function updateSummary(){

    let all = FILE_LIBRARY.length;

    let pdf = FILE_LIBRARY.filter(file =>
        file.type.toLowerCase() === "pdf"
    ).length;


    let excel = FILE_LIBRARY.filter(file =>
        file.type.toLowerCase() === "excel" ||
        file.type.toLowerCase() === "xlsx"
    ).length;


    const allCount = document.getElementById("allCount");
    const pdfCount = document.getElementById("pdfCount");
    const excelCount = document.getElementById("excelCount");


    if(allCount)
        allCount.innerText = all;

    if(pdfCount)
        pdfCount.innerText = pdf;

    if(excelCount)
        excelCount.innerText = excel;



    fetch(STAT_API + "?action=summary")
    .then(res => res.json())
    .then(data => {

        const viewElement =
        document.getElementById("viewCount");

        const downloadElement =
        document.getElementById("downloadCount");


        fetch(STAT_API + "?action=summary")
.then(response => response.json())
.then(data => {

    if(viewElement)
        viewElement.innerText = data.views || 0;

    if(downloadElement)
        downloadElement.innerText = data.downloads || 0;

})
.catch(error => console.log(error));
    })
    .catch(err => console.log(err));

}







// =======================================
// Search
// =======================================

function initSearch(){



    const search =
    document.getElementById("search");



    if(!search)
        return;




    search.addEventListener(
    "input",
    function(){


        let keyword =
        this.value
        .toLowerCase();



        let result =
        FILE_LIBRARY.filter(file=>{


            return (

                file.title
                .toLowerCase()
                .includes(keyword)


                ||

                file.category
                .toLowerCase()
                .includes(keyword)

            );


        });



        renderFiles(result);



    });


}

function countView(){

    fetch(STAT_API + "?action=view")
        .then(response => console.log("View counted"))
        .catch(error => console.log(error));

}
function getSummary(){

  fetch(STAT_API + "?action=summary")
  .then(response => response.json())
  .then(data => {
      console.log(data);
      updateSummary(data);
  })
  .catch(error => console.log(error));

}
function countDownload(fileName){

fetch(STAT_API + "?action=download&file=" + encodeURIComponent(fileName))
.then(response => console.log("Download counted"))
.catch(error => console.log(error));
}

document.addEventListener("DOMContentLoaded", function(){
  getSummary();
});


