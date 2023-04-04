
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        console.log("1111", modal)
        modal.style.display = "none";
    }
}

function dangnhap() {
    window.location.href = "./html/login.html";
}

function cart() {
    window.location.href = "./html/cart.html";
}

function home() {
    window.location.href = "./html/index.html";

}

function dangky() {
    window.location.href = "./html/signup.html";
}

function dsSP() {
    window.location.href = "./html/qlspadmin.html";
}

function popUpCartDangNhap() {
    console.log("aa");
    document.getElementById("snack-bar").innerHTML = `Mời bạn đăng nhập để có trải nghiệm mua sắm tốt hơn`;
    var x = document.getElementById("snack-bar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

function countPr() {
    let listSPCart = JSON.parse(localStorage.getItem("listSPCart"));
    let flagLogin = JSON.parse(localStorage.getItem("flagLogin"));
    let coPrInUser = 0;
    if (flagLogin == null) {
        popUpCartDangNhap();
    } else {
        for (j = 0; j < listSPCart.length; j++) {
            if (listSPCart[j].user === flagLogin.user) {
                ++coPrInUser;
            }
        }
    }
    document.getElementById("qttCart").innerHTML = `(${coPrInUser})`;
}

function renderSP() {
    let kQ = "";
    let dsSP = JSON.parse(localStorage.getItem("dsSP"));

    for (i = 0; i < dsSP.length; i++) {
        kQ +=
            `
            <div class="element">
                <img class="imgelm" onclick=bamvaoanh("${dsSP[i].ma}") style="width:auto;" src="${dsSP[i].image}" alt="">
                <div class="infSP">
                    <div class="bg-info text-white">${dsSP[i].ten}</div>
                    <div class="bg-primary text-white">${dsSP[i].gia}$</div>
                    <div><button class="btn btn-success" onclick=addCart("${dsSP[i].ma}")>Thêm vào giỏ hàng</button></div>
                </div>
            </div>
        `;
    }
    document.getElementById("sanPham").innerHTML = kQ;
    countPr();
}

//thêm sản phẩm vào giỏ hàng.
function addCart(idSP) {
    let dsSP = JSON.parse(localStorage.getItem("dsSP"));
    let flagLogin = JSON.parse(localStorage.getItem("flagLogin"));
    let listSPCart = JSON.parse(localStorage.getItem("listSPCart"));
    if (flagLogin == null) {
        popUpCartDangNhap();
        return;
    }
    if (listSPCart == null) {
        console.log(listSPCart);
        //trường hợp giỏ hàng chưa có gì.
        listSPCart = [];
        for (i = 0; i < dsSP.length; i++) {
            if (dsSP[i].ma == idSP) {
                dsSP[i].user = flagLogin.user;
                listSPCart.push(dsSP[i]);
                localStorage.setItem("listSPCart", JSON.stringify(listSPCart));
                console.log("thêm vào giỏ hàng thành công");
                countPr();
                popUpCart2();
                console.log("11111", listSPCart);
                break;
            }
        }
    } else {
        console.log(listSPCart);
        //trường hợp có sản phẩm trong giỏ hàng thì kiểm tra xem có trung id trong giỏ hàng không
        for (j = 0; j < dsSP.length; j++) {
            if (dsSP[j].ma == idSP) {
                let flag = true;
                for (k = 0; k < listSPCart.length; k++) {
                    if (listSPCart[k].ma == idSP && listSPCart[k].user === flagLogin.user) {
                        flag = false;
                        break;
                    } else {
                        flag = true;
                    }
                }
                if (!flag) {
                    console.log(flag);
                    popUpCart1();
                    break;
                } else {
                    console.log(flag);
                    dsSP[j].user = flagLogin.user;
                    listSPCart.push(dsSP[j]);
                    localStorage.setItem("listSPCart", JSON.stringify(listSPCart));
                    countPr();
                    popUpCart2();
                    break;
                }
            }

        }

    }
}


// hiện pop up sản phẩm đã có trong giỏ hàng
function popUpCart1() {
    console.log("aa");
    document.getElementById("snack-bar").innerHTML = `Sản phẩm đã có trong giỏ hàng!`;
    var x = document.getElementById("snack-bar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

//hiện "thêm vào giỏ hàng thành công"
function popUpCart2() {
    console.log("bb");
    document.getElementById("snack-bar").innerHTML = `Thêm vào giỏ hàng thành công`;
    var x = document.getElementById("snack-bar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

//kiểm tra cờ đăng nhập
function kiemTraDangNhap() {
    let flagLogin = JSON.parse(localStorage.getItem("flagLogin"));
    if (flagLogin != null) {
        // đã đăng nhập
        if (flagLogin.user == "ad@gmail.com") {
            document.getElementById("nameUser").innerHTML = `Xin chào admin`;
            document.getElementById("dsSP").style.display = "block"
        } else {
            document.getElementById("nameUser").innerHTML = `Xin chào ${flagLogin.user}`;
        }
        document.getElementById("dangxuat").style.display = "block";
        document.getElementById("dangnhap").style.display = "none";
        document.getElementById("dangky").style.display = "none";
    } else {
        //chưa đăng nhập
        document.getElementById("dangxuat").style.display = "none";
        document.getElementById("nameUser").style.display = "none";
        document.getElementById("dangnhap").style.display = "block";
        document.getElementById("dangky").style.display = "block";
        document.getElementById("dsSP").style.display = "none"

    }
}

//đăng xuất xóa cờ đăng nhập
kiemTraDangNhap();
function dangxuat() {
    localStorage.removeItem("flagLogin");
    kiemTraDangNhap();
    countPr();
}

//khi ấn vào ảnh sản phẩm
function bamvaoanh(maSP) {
    let dsSP = JSON.parse(localStorage.getItem("dsSP"));
    let result = "";
    for (i = 0; i < dsSP.length; i++) {
        if (dsSP[i].ma == maSP) {
            result =
                `
            <div class="elementIfo">
                <img class="imgelm" style="width:auto;" src="${dsSP[i].image}" alt="">
                <div class="bg-info text-white">${dsSP[i].ten}</div>
                <div class="bg-primary text-white">${dsSP[i].gia}$</div>
                <div class="bg-info text-white">${dsSP[i].moTa}</div>
                <div><button class="btn btn-success" onclick=addCart("${dsSP[i].ma}")>
                    Thêm vào giỏ hàng
                </button>
                <button class="btn btn-success" onclick=review("${dsSP[i].ma}")>Xem review</button></div>
            </div>
            `;
        }
    }
    document.getElementById('id01').innerHTML = result;
    document.getElementById('id01').style.display = 'block';
}

{/* <div id="searchDiv">
        <label for="a">Sản phẩm</label>
        <input id="inputSearch" type="text" placeholder="Tìm kiếm theo tên"><br>
        <label for="">Mức giá chấp nhận được</label>
        <input id="inputPrice" type="number" placeholder="vd:500"><br>
        <button class="btn btn-primary" onclick="searchName()">Tìm kiếm sản phẩm</button>
    </div> */}

function searchName() {
    let dsSP = JSON.parse(localStorage.getItem("dsSP"));
    let result = "";
    let inputSearch = document.getElementById("inputSearch").value;
    for (i = 0; i < dsSP.length; i++) {
        if (dsSP[i].ten.toLowerCase().includes(inputSearch.toLowerCase())) {
            result +=
                `
                <div class="element">
                    <img class="imgelm" onclick=bamvaoanh("${dsSP[i].ma}") style="width:auto;" src="${dsSP[i].image}" alt="">
                    <div class="infSP">
                        <div class="bg-info text-white">${dsSP[i].ten}</div>
                        <div class="bg-primary text-white">${dsSP[i].gia}$</div>
                        <div><button class="btn btn-success" onclick=addCart("${dsSP[i].ma}")>Thêm vào giỏ hàng</button></div>
                    </div>
                </div>
            `;
        }
    }
    document.getElementById("sanPham").innerHTML = result;
}

function review(id) {
    let flagLogin = JSON.parse(localStorage.getItem("flagLogin"));
    console.log(id);
    flagLogin.reviewid = id;
    localStorage.setItem("flagLogin", JSON.stringify(flagLogin));
    window.location.href = "./html/listreview.html";
}