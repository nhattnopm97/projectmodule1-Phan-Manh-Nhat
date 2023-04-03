function dangnhap() {
    window.location.href = "login.html";
}

function cart() {
    window.location.href = "cart.html";
}

function home() {
    window.location.href = "../index.html";
}

function dangky() {
    window.location.href = "signup.html";
}

function Login() {
    let user = document.getElementById("user").value;
    let psw = document.getElementById("psw").value;
    let listUser = JSON.parse(localStorage.getItem("listUser"));
    console.log(listUser.find(d => d.password == psw));
    if (listUser.find(c => c.email == user) && listUser.find(c => c.password == psw)) {
        let nguoidung = {
            user:user,
            trangThai:"hoạt động"
        }
        window.localStorage.setItem("flagLogin",JSON.stringify(nguoidung))
        window.location.href = "../index.html";
    }else{
        alert("Tài khoản hoặc mật khẩu chưa chính xác");
    }
}