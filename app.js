let current = FILE_LIBRARY;

const list = document.getElementById('fileList');

document.getElementById('count').innerText = FILE_LIBRARY.length;


const pdf = document.getElementById('pdfCount');
if(pdf){
    pdf.innerText =
    FILE_LIBRARY.filter(f => f.type === "PDF").length;
}


const excel = document.getElementById('excelCount');
if(excel){
    excel.innerText =
    FILE_LIBRARY.filter(f => f.type === "EXCEL").length;
}


const word = document.getElementById('wordCount');
if(word){
    word.innerText =
    FILE_LIBRARY.filter(f => f.type === "WORD").length;
}



function show(data){

    list.innerHTML = "";

    data.forEach(f=>{

        list.innerHTML += `
        <div class="card">

            <h3>${f.name}</h3>

            <p>${f.group} | ${f.type}</p>

            <a href="${f.url}" download>
                <button>
                Download
                </button>
            </a>

        </div>
        `;

    });

}


show(current);



document.getElementById('search').oninput = e=>{

show(
FILE_LIBRARY.filter(
f=>f.name.toLowerCase()
.includes(
e.target.value.toLowerCase()
)
)
);

};