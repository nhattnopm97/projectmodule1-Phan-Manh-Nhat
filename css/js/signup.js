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

function signup() {
    let listUser = JSON.parse(localStorage.getItem("listUser"));
    let taolaadmin = {
        email: "ad@gmail.com",
        password: 1,
        tel: +84922928430
    }
    if (listUser == null) {
        listUser = [];
        listUser.push(taolaadmin);
        localStorage.setItem("listUser", JSON.stringify(listUser));
    }
    let user = document.getElementById("user").value;
    let psw = document.getElementById("psw").value;
    let pswr = document.getElementById("pswr").value;
    let tel = document.getElementById("tel").value;
    console.log(isNaN(tel));
    if (user.indexOf("@") < 1 || user.lastIndexOf(".") < user.indexOf("@") + 2) {
        alert("email chưa đúng định dạng");
        return;
    }

    if(listUser.find(c=>c.email==user)){
        alert("email đã có người đăng ký");
        return;
    }

    if (psw.length < 6 || pswr < 6) {
        alert("mật khẩu phải dài hơn 6 ký tự");
        return;
    }

    if (psw !== pswr) {
        alert("Nhập lại mật khẩu chưa đúng");
        return;
    }

    let nguoiDung = {
        email: user,
        password: psw,
        tel: tel
    }

    listUser.push(nguoiDung);
    localStorage.setItem("listUser", JSON.stringify(listUser));
    window.location.href = "login.html";
}