let current = FILE_LIBRARY;


const list = document.getElementById("fileList");



// ======================
// Dashboard Counter
// ======================


const count = document.getElementById("count");

if(count){

    count.innerText = FILE_LIBRARY.length;

}



const pdfCount = document.getElementById("pdfCount");

if(pdfCount){

    pdfCount.innerText =
    FILE_LIBRARY.filter(
        f=>f.type==="PDF"
    ).length;

}



const excelCount = document.getElementById("excelCount");

if(excelCount){

    excelCount.innerText =
    FILE_LIBRARY.filter(
        f=>f.type==="EXCEL"
    ).length;

}



const wordCount = document.getElementById("wordCount");

if(wordCount){

    wordCount.innerText =
    FILE_LIBRARY.filter(
        f=>f.type==="WORD"
    ).length;

}





// ======================
// File Icon
// ======================


function getIcon(type){


    if(type==="PDF"){

        return "📕";

    }


    if(type==="EXCEL"){

        return "📗";

    }


    if(type==="WORD"){

        return "📘";

    }


    return "📄";

}





// ======================
// Show File Card
// ======================


function show(data){


    list.innerHTML="";



    data.forEach((file,index)=>{


        list.innerHTML += `


        <div class="card"
        style="animation-delay:${index*0.08}s">


            <div class="file-icon">

                ${getIcon(file.type)}

            </div>



            <h3>

            ${file.name}

            </h3>



            <p>

            ${file.group || "เอกสาร"}

            <br>

            <b>${file.type}</b>

            </p>



            <a

            class="download-btn"

            href="${file.url}"

            target="_blank">

            ⬇ ดาวน์โหลดไฟล์

            </a>


        </div>


        `;


    });


}




// เริ่มต้นแสดงไฟล์

show(current);






// ======================
// Search System
// ======================



const search =
document.getElementById("search");



if(search){


search.addEventListener(

"input",

function(){



    const keyword =
    this.value.toLowerCase();




    const result =
    FILE_LIBRARY.filter(file=>


        file.name
        .toLowerCase()
        .includes(keyword)


    );



    show(result);



});


}