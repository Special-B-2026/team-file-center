function login(){

const username =
document.getElementById("username").value;

const password =
document.getElementById("password").value;


// ทดลองก่อน
const user = USERS.find(
    u => u.username === username && u.password === password
);

if(user){

sessionStorage.setItem(
"login",
"true"
);

sessionStorage.setItem(
"user",
JSON.stringify(user)
);

window.location.href="index.html";

}else{


document.getElementById("message").innerHTML=
"Username หรือ Password ไม่ถูกต้อง";

}

}