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
        tel: +84922928430.
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
        popUpemailfailed();
        return;
    }

    //tk đã có người đăng ký
    if(listUser.find(c=>c.email==user)){
        popUpconguoidk();
        return;
    }

    if (psw.length < 6 || pswr < 6) {
        popUppswlength();
        return;
    }

    if (psw !== pswr) {
        popUppswfailed();
        return;
    }

    let nguoiDung = {
        email: user,
        password: psw,
        tel: tel,
        statususer:"bình thường"
    }

    listUser.push(nguoiDung);
    localStorage.setItem("listUser", JSON.stringify(listUser));
    window.location.href = "login.html";
}

function popUpconguoidk() {
    document.getElementById("snack-bar").innerHTML = `Tài khoản đã có người đăng ký`;
    var x = document.getElementById("snack-bar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

function popUppswlength() {
    document.getElementById("snack-bar").innerHTML = `Mật khẩu phải dài trên 6 ký tự`;
    var x = document.getElementById("snack-bar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

function popUpemailfailed() {
    document.getElementById("snack-bar").innerHTML = `Email chưa đúng`;
    var x = document.getElementById("snack-bar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

function popUppswfailed() {
    document.getElementById("snack-bar").innerHTML = `Nhập lại mật khẩu chưa đúng`;
    var x = document.getElementById("snack-bar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}