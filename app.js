let current = FILE_LIBRARY;

const list = document.getElementById("fileList");

const count = document.getElementById("count");
if(count){
    count.innerText = FILE_LIBRARY.length;
}

const pdf = document.getElementById("pdfCount");
if(pdf){
    pdf.innerText = FILE_LIBRARY.filter(f=>f.type==="PDF").length;
}

const excel = document.getElementById("excelCount");
if(excel){
    excel.innerText = FILE_LIBRARY.filter(f=>f.type==="EXCEL").length;
}

const word = document.getElementById("wordCount");
if(word){
    word.innerText = FILE_LIBRARY.filter(f=>f.type==="WORD").length;
}


function show(data){

    list.innerHTML = "";

    data.forEach(f=>{

        list.innerHTML += `

        <div class="file-card">

            <h3>${f.name}</h3>

            <p>
            ${f.group || ""}
            |
            ${f.type}
            </p>

            <a href="${f.url}" target="_blank" download>
            ดาวน์โหลดไฟล์
            </a>

        </div>

        `;

    });

}


show(current);


const search = document.getElementById("search");

if(search){

search.oninput = e=>{

    const text = e.target.value.toLowerCase();

    const result = FILE_LIBRARY.filter(f=>
        f.name.toLowerCase().includes(text)
    );

    show(result);

};

}