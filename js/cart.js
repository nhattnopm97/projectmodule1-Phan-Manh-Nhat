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

function dsSP() {
    window.location.href = "qlspadmin.html";
}

// redder giỏ hàng 
function renderCart() {
    let listSPCart = JSON.parse(localStorage.getItem("listSPCart"));
    let flagLogin = JSON.parse(localStorage.getItem("flagLogin"));
    let kQ = "";
    let ttMn = 0;
    let coPrInUser = 0;
    for (i = 0; i < listSPCart.length; i++) {
        ttMn += listSPCart[i].gia * listSPCart[i].sl;
        if (listSPCart[i].user == flagLogin.user) {
            ++coPrInUser;
            kQ +=
                `
        <div class=element>
                <img class="imgelm" src="${listSPCart[i].image}" alt="">
                <div class="infSP">
                    <button class="btn btn-danger" onclick="del(${i})">XÓA</button>
                    <div>${listSPCart[i].ten}</div>
                    <div>${listSPCart[i].gia * listSPCart[i].sl}$</div>
                    <div class="cAndt"><button class="btn btn-danger" onclick="minusSL(${i})">-</button><span><div>${listSPCart[i].sl}</div></span><button class="btn btn-primary" onclick="plusSL(${i})">+</button></div>
                    <div><button class="btn btn-success">Mua</button></div>
                </div>
            </div>
        `;
        }
    }
    document.getElementById("userName").innerHTML = `Giỏ hàng của ${flagLogin.user}`;
    document.getElementById("cart").innerHTML = kQ;
    document.getElementById("qttCart").innerHTML = `(${coPrInUser})`;
    document.getElementById("totalMoney").innerHTML = `Tổng tiền:${ttMn}$`;
}

//xóa sản phẩm giỏ hàng
function del(iddel) {
    let listSPCart = JSON.parse(localStorage.getItem("listSPCart"));
    listSPCart.splice(iddel, 1);
    localStorage.setItem("listSPCart", JSON.stringify(listSPCart));
    renderCart();
}

//tăng số lượng sản phẩm
function plusSL(idsp) {
    let listSPCart = JSON.parse(localStorage.getItem("listSPCart"));
    ++listSPCart[idsp].sl;
    localStorage.setItem("listSPCart", JSON.stringify(listSPCart));
    renderCart();
}

//Giảm số lượng sản phẩm
function minusSL(idsp) {
    let listSPCart = JSON.parse(localStorage.getItem("listSPCart"));
    --listSPCart[idsp].sl;
    if (listSPCart[idsp].sl == 0) {
        let xacNhan = confirm("Cho sản phản ra ngoài giỏ đồ?");
        if (xacNhan) {
            listSPCart.splice(idsp, 1);
        } else {
            ++listSPCart[idsp].sl;
        }
    }
    localStorage.setItem("listSPCart", JSON.stringify(listSPCart));
    renderCart();
}

function kiemTraDangNhap() {
    let flagLogin = JSON.parse(localStorage.getItem("flagLogin"));
    if (flagLogin != null) {
        if (flagLogin.user == "ad@gmail.com") {
            document.getElementById("nameUser").innerHTML = `Xin chào Ngài Tiểu trưởng`;
            document.getElementById("dsSP").style.display = "block"
        } else {
            document.getElementById("nameUser").innerHTML = `Xin chào ${flagLogin.user}`;
            document.getElementById("dsSP").style.display = "none"
        }
        document.getElementById("dangxuat").style.display = "block";
        document.getElementById("dangnhap").style.display = "none";
        document.getElementById("dangky").style.display = "none";
    } else {
        document.getElementById("dangxuat").style.display = "none";
        document.getElementById("nameUser").style.display = "none";
        document.getElementById("dangnhap").style.display = "block";
        document.getElementById("dangky").style.display = "block";
        document.getElementById("dsSP").style.display = "none"

    }
}

//đăng xuất xóa cờ đăng nhập
function dangxuat() {
    localStorage.removeItem("flagLogin");
    kiemTraDangNhap();
}