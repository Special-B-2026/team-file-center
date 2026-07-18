let current = FILE_LIBRARY;

const list = document.getElementById("fileList");


// จำนวนไฟล์ทั้งหมด
const count = document.getElementById("count");
if(count){
    count.innerText = FILE_LIBRARY.length;
}


// จำนวน PDF
const pdf = document.getElementById("pdfCount");
if(pdf){
    pdf.innerText = FILE_LIBRARY.filter(f => f.type === "PDF").length;
}


// จำนวน Excel
const excel = document.getElementById("excelCount");
if(excel){
    excel.innerText = FILE_LIBRARY.filter(f => f.type === "EXCEL").length;
}


// จำนวน Word
const word = document.getElementById("wordCount");
if(word){
    word.innerText = FILE_LIBRARY.filter(f => f.type === "WORD").length;
}



function show(data){

    list.innerHTML = "";

    data.forEach(f => {

        list.innerHTML += `

        <div class="card">

            <h3>${f.name}</h3>

            <p>
                ${f.group || ""}
                |
                ${f.type}
            </p>


            <button onclick="window.open('${f.url}','_blank')">
                ดาวน์โหลดไฟล์
            </button>


        </div>

        `;

    });

}



show(current);



// ระบบค้นหา
const search = document.getElementById("search");

if(search){

    search.oninput = e => {

        const keyword = e.target.value.toLowerCase();


        const result = FILE_LIBRARY.filter(f =>
            f.name.toLowerCase().includes(keyword)
        );


        show(result);

    };

}