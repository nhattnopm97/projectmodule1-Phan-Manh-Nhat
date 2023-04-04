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
    if(user=="ad@gmail.com"&&psw==1){
        let nguoidung = {
            user: user,
        }
        window.localStorage.setItem("flagLogin", JSON.stringify(nguoidung));
        window.location.href = "../index.html";
        return;
    }
    if (listUser.find(c => c.email == user) && listUser.find(c => c.password == psw)) {
        if (listUser.find(d => d.statususer == "ban")) {
            popUpfailed();
            return;
        } else {
            let nguoidung = {
                user: user,
                statususer: "bình thường"
            }
            window.localStorage.setItem("flagLogin", JSON.stringify(nguoidung));
            window.location.href = "../index.html";
        }
    } else {
        popUppsworuserfailed();
    }
}

function popUpfailed() {
    document.getElementById("snack-bar").innerHTML = `Tài khoản của bạn đã bị khóa`;
    var x = document.getElementById("snack-bar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

function popUppsworuserfailed() {
    document.getElementById("snack-bar").innerHTML = `Tài khoản hoặc mật khẩu chưa chính xác`;
    var x = document.getElementById("snack-bar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}