let current = FILE_LIBRARY;

const list = document.getElementById("fileList");


// จำนวนไฟล์ทั้งหมด
document.getElementById("count").innerText = FILE_LIBRARY.length;


// จำนวน PDF
const pdf = document.getElementById("pdfCount");
if(pdf){
    pdf.innerText = FILE_LIBRARY.filter(
        f => f.type === "PDF"
    ).length;
}


// จำนวน EXCEL
const excel = document.getElementById("excelCount");
if(excel){
    excel.innerText = FILE_LIBRARY.filter(
        f => f.type === "EXCEL"
    ).length;
}


// จำนวน WORD
const word = document.getElementById("wordCount");
if(word){
    word.innerText = FILE_LIBRARY.filter(
        f => f.type === "WORD"
    ).length;
}



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



            <a 
            class="download-btn"
            href="${file.url}"
            target="_blank">

            ดาวน์โหลดไฟล์

            </a>


        </div>

        `;


    });


}



// แสดงข้อมูลเริ่มต้น
show(current);



// ระบบค้นหา
const search = document.getElementById("search");

if(search){

search.addEventListener("input",()=>{


    const text = search.value.toLowerCase();


    const result = FILE_LIBRARY.filter(file =>

        file.name.toLowerCase().includes(text)

    );


    show(result);


});


}