let current = FILE_LIBRARY;

const list = document.getElementById("fileList");


// Dashboard

document.getElementById("count").innerText =
FILE_LIBRARY.length;


document.getElementById("pdfCount").innerText =
FILE_LIBRARY.filter(f => f.type === "PDF").length;


document.getElementById("excelCount").innerText =
FILE_LIBRARY.filter(f => f.type === "EXCEL").length;


document.getElementById("wordCount").innerText =
FILE_LIBRARY.filter(f => f.type === "WORD").length;



function show(data){

    list.innerHTML = "";

    data.forEach(file => {


        list.innerHTML += `

        <div class="card">


            <h3>${file.name}</h3>


            <p>
            ${file.group || "เอกสาร"}
            |
            ${file.type}
            </p>



            <a class="download-btn"
            href="${file.url}"
            target="_blank"
            download>

            ดาวน์โหลดไฟล์

            </a>


        </div>


        `;


    });

}



show(current);




// Search

document.getElementById("search").oninput = function(){

    let keyword =
    this.value.toLowerCase();


    let result =
    FILE_LIBRARY.filter(file =>
    file.name.toLowerCase()
    .includes(keyword));


    show(result);

};