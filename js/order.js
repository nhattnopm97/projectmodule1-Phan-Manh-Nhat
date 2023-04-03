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

function donhang() {
    window.location.href = "order.html";
}

//đăng xuất xóa cờ đăng nhập
function dangxuat() {
    localStorage.removeItem("flagLogin");
    kiemTraDangNhap();
    window.location.href = "../index.html";
}
kiemTraDangNhap();
function kiemTraDangNhap() {
    let flagLogin = JSON.parse(localStorage.getItem("flagLogin"));
    console.log(flagLogin);
    if (flagLogin != null) {
        if (flagLogin.user == "ad@gmail.com") {
            document.getElementById("nameUser").innerHTML = `Xin chào Ngài Tiểu trưởng`;
            document.getElementById("dsSP").style.display = "block"
        } else {
            document.getElementById("nameUser").innerHTML = `Xin chào ${flagLogin.user}`;
            document.getElementById("dsSP").style.display = "none"
        }
        document.getElementById("dangXuat").style.display = "block";
        document.getElementById("dangnhap").style.display = "none";
        document.getElementById("dangky").style.display = "none";
    } else {
        document.getElementById("dangXuat").style.display = "none";
        document.getElementById("nameUser").style.display = "none";
        document.getElementById("dangnhap").style.display = "block";
        document.getElementById("dangky").style.display = "block";
        document.getElementById("dsSP").style.display = "none"

    }
}



function renderDonHang() {
    let listDonHang = JSON.parse(localStorage.getItem("listDonHang"));
    let flagLogin = JSON.parse(localStorage.getItem("flagLogin"));
    let result = "";
    let resultTenVaSL = "";
    if (flagLogin.user == "ad@gmail.com") {
        for (i = 0; i < listDonHang.length; i++) {
            let total = 0;
            for (j = 0; j < listDonHang[i].gia.length; j++) {
                total += listDonHang[i].sl[j] * listDonHang[i].gia[j];
                resultTenVaSL += `${listDonHang[i].ten[j]}: ${listDonHang[i].sl[j]} cái; ${listDonHang[i].sl[j] * listDonHang[i].gia[j]}$ ___<br>`;
            }
            result +=
                `
            <tr>
                <td>${i + 1}</td>
                <td>${listDonHang[i].hoVaTen} (${listDonHang[i].user})</td>
                <td>${listDonHang[i].adress})</td>
                <td>${listDonHang[i].maDonHang}</td>
                <td>${resultTenVaSL}</td>
                <td>${total}$</td>
                <td><select>
                <option>Chờ xác nhận</option>
                <option>Đã xác nhận</option>
                <option>Đang giao hàng</option>
                <option>Xóa đơn(xóa sau x ngày)</option>
                </select></td>
                <td><button class="btn btn-danger" onclick="xoaDonHang(${i})">Xóa đơn hàng</button></td>
            </tr>
            `;
        }
        document.getElementById("renderDonHang").innerHTML = result;
    } else {
        for (k = 0; k < listDonHang.length; k++) {
            let total = 0;
            if (flagLogin.user == listDonHang[k].user) {
                for (l = 0; l < listDonHang[k].gia.length; l++) {
                    total += listDonHang[k].sl[l] * listDonHang[k].gia[l];
                    resultTenVaSL += `${listDonHang[k].ten[l]}: ${listDonHang[k].sl[l]} cái ${listDonHang[k].sl[l] * listDonHang[k].gia[l]}$;___<br>`;
                }
                result +=
                    `
            <tr>
                <td>${listDonHang[k].maDonHang}</td>
                <td>${listDonHang[k].hoVaTen} (${listDonHang[k].user})</td>
                <td>${listDonHang[k].adress}</td>
                <td>${listDonHang[k].maDonHang}</td>
                <td>${resultTenVaSL}</td>
                <td>${total}$</td>
                <td>Chờ xác nhận(admin sẽ liên hệ với bạn trong thời gian sớm nhất)</td>
                <td><button class="btn btn-danger" onclick="xoaDonHang(${k})">Hủy đơn hàng</button></td>
            </tr>
            `;
            }
        }
        document.getElementById("renderDonHang").innerHTML = result;
    }
    countPr();
}
renderDonHang();

function xoaDonHang(iddonhang) {
    let listDonHang = JSON.parse(localStorage.getItem("listDonHang"));
    let flagLogin = JSON.parse(localStorage.getItem("flagLogin"));
    if(flagLogin.user=="ad@gmail.com"){
        listDonHang.splice(iddonhang, 1);
        localStorage.setItem("listDonHang", JSON.stringify(listDonHang));
        renderDonHang();
    }else{
        popUpdelDonHang();
    }
}

function popUpdelDonHang() {
    document.getElementById("snack-bar").innerHTML = `Đang chờ xác nhận của admin`;
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