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
    let flagLogin = JSON.parse(localStorage.getItem("flagLogin"));
    if (flagLogin == null) {
        popUpCartNotOke();
        return;
    }
    window.location.href = "order.html";
}

//đăng xuất xóa cờ đăng nhập
function dangxuat() {
    localStorage.removeItem("flagLogin");
    kiemTraDangNhap();
    window.location.href = "../index.html";
}

// redder giỏ hàng 
function renderCart() {
    let listSPCart = JSON.parse(localStorage.getItem("listSPCart"));
    let flagLogin = JSON.parse(localStorage.getItem("flagLogin"));
    let kQ = "";
    let ttMn = 0;
    let coPrInUser = 0;
    if (flagLogin == null) {
        popUpCartLogIn();
        return;
    }
    for (i = 0; i < listSPCart.length; i++) {
        if (listSPCart[i].user == flagLogin.user) {
            ttMn += listSPCart[i].gia * listSPCart[i].sl;
            ++coPrInUser;
            kQ +=
                `
            
                <div class="element">
                    <img class="imgelm" src="${listSPCart[i].image}" alt="">
                    <div class="infSP">
                        <button class="btn btn-danger" onclick="del(${i})">XÓA</button>
                        <div>${listSPCart[i].ten}</div>
                        <div>${listSPCart[i].gia * listSPCart[i].sl}$</div>
                        <div class="cAndt"><button class="btn btn-danger" onclick="minusSL(${i})">-</button><span><div>${listSPCart[i].sl}</div></span><button class="btn btn-primary" onclick="plusSL(${i})">+</button></div>
                    </div>
                </div>
        `;
        }
    }

    if(coPrInUser == 0){
        document.getElementById("themDon").disabled =true;
    }else{
        document.getElementById("themDon").disabled =false;
    }

    document.getElementById("userName").innerHTML = `Giỏ hàng của ${flagLogin.user}`;
    document.getElementById("cart").innerHTML = kQ;
    document.getElementById("qttCart").innerHTML = `(${coPrInUser})`;
    document.getElementById("totalMoney").innerHTML = `Tổng tiền:${ttMn.toLocaleString("en-US")}$`;
}

//mua sản phẩm lẻ trong giỏ hàng.
// function muaLe(id) {
//     console.log("111111", document.getElementsByClassName("showSP").display);
//     let listSPCart = JSON.parse(localStorage.getItem("listSPCart"));
//     let result =
//         `
//         <div class="modal-content animate">
//             <div>
//                 <img src="${listSPCart[id].image}" alt="">
//                 <div>${listSPCart[id].ten}</div>
//                 <div>${listSPCart[id].gia * listSPCart[id].sl} (${listSPCart[id].sl}cái)</div>
//                 <div>${listSPCart[id].moTa}</div>
//             </div>
//             <div>
//                 <label>Họ và tên</label>
//                 <input type="text" place holder="VD:Phan Mạnh Nhật">
//                 <label>Số điện thoại</label>
//                 <input type="number" place holder="VD:012345678">
//                 <label>Địa chỉ nhận hàng</label>
//                 <input type="text" place holder="VD:Hà nội">
//                 <h3>Admin sẽ sớm liên hệ với bạn để xác nhận đơn hàng</h3>
//                 <button>Xác Nhận</button>
//             </div>
//         </div>
//     `;
//     document.getElementById("bangMuaLe").innerHTML = result;
//     document.getElementById("bangMuaLe").display = "block";
//     console.log("111111", document.getElementById("bangMuaLe").display);

// }

//xóa sản phẩm giỏ hàng
function del(iddel) {
    let listSPCart = JSON.parse(localStorage.getItem("listSPCart"));
    listSPCart.splice(iddel, 1);
    localStorage.setItem("listSPCart", JSON.stringify(listSPCart));
    renderCart();
    popUpCartDel();
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
        let xacNhan = confirm("Xóa sản phẩm ra ngoài giỏ đồ?");
        if (xacNhan) {
            listSPCart.splice(idsp, 1);
            popUpCartDel();
        } else {
            ++listSPCart[idsp].sl;
        }
    }
    localStorage.setItem("listSPCart", JSON.stringify(listSPCart));
    renderCart();
}

//kiểm tra đăng nhập
kiemTraDangNhap();
function kiemTraDangNhap() {
    let flagLogin = JSON.parse(localStorage.getItem("flagLogin"));
    if (flagLogin != null) {
        if (flagLogin.user == "ad@gmail.com") {
            document.getElementById("nameUser").innerHTML = `Xin chào admin`;
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

function popUpCartDel() {
    document.getElementById("snack-bar").innerHTML = `Xóa thành công`;
    var x = document.getElementById("snack-bar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

function popUpCartLogIn() {
    document.getElementById("snack-bar").innerHTML = `Bạn chưa đăng nhập`;
    var x = document.getElementById("snack-bar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

//render ra các sản phẩm trong giỏ hàng để xác nhận thanh toán.
function taodon() {
    let listSPCart = JSON.parse(localStorage.getItem("listSPCart"));
    let flagLogin = JSON.parse(localStorage.getItem("flagLogin"));
    if (flagLogin == null) {
        popUpCartNotOke();
        return;
    }
    let count = 0;
    let total = 0;
    let result =
        `
        <h2 style="color:white">Xác nhận đơn hàng.</h2>
        <tr>
            <td style="color:white">Nhập Tên</td>
            <td style="color:white"><input id="hoVaTen" type="text" placeholder="Họ và tên"></input></td>
        </tr>
        <tr>
            <td style="color:white">Nhập số điện thoại</td>
            <td style="color:white"><input id="tel" type="number" placeholder="0912345678"></input></td>
        </tr>
        <tr>
            <td style="color:white">Địa chỉ nhận hàng</td>
            <td style="color:white"><input id="adress" type="text" placeholder="Hà Nội"></td>
        </tr>
        <tr>
            <td class="btn btn-success" onclick="xacNhanDonHang()">Xác nhận</td>
        </tr>
    `;
    for (i = 0; i < listSPCart.length; i++) {
        if (listSPCart[i].user == flagLogin.user) {
            ++count;
            total += listSPCart[i].gia * listSPCart[i].sl;
            result +=
                `
            
            <tr class="spCartInf">
                <td><img class="imgelm" onclick="bamvaoanh()" style="width:50px; height:50px" src="${listSPCart[i].image}" alt=""></td>
                <td class="text-info">${count} . ${listSPCart[i].ten}</td>
                <td class="text-primary">${listSPCart[i].sl} Chiếc</td>
                <td class="text-primary">${listSPCart[i].gia * listSPCart[i].sl}$</td>
            </tr>
            `;
        }
    }
    result +=
        `
    <tr class="spCartInf">
    <td></td>
    <td  style="color:white; text-align:right">Thành tiền:</td>
        <td class="text-primary">${total}$</td>
    </tr> 
    `;
    document.getElementById('id01').innerHTML = result;
    document.getElementById('id01').style.display = 'block';
}

function popUpCartAlert() {
    document.getElementById("snack-bar").innerHTML = `Hãy điền đầy đủ thông tin`;
    var x = document.getElementById("snack-bar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

function popUpCartOK() {
    document.getElementById("snack-bar").innerHTML = `Xác nhận đơn hàng thành công, đang đợi xác nhận của admin!`;
    var x = document.getElementById("snack-bar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

function popUpCartNotOke() {
    document.getElementById("snack-bar").innerHTML = `Đăng nhập để thực hiện đầy đủ chức năng!`;
    var x = document.getElementById("snack-bar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

function xacNhanDonHang() {
    let listSPCart = JSON.parse(localStorage.getItem("listSPCart"));
    let newlistSPCart=[];
    let flagLogin = JSON.parse(localStorage.getItem("flagLogin"));
    let listDonHang = JSON.parse(localStorage.getItem("listDonHang"));
    let diaChi = document.getElementById("adress").value;
    let hoVaTen = document.getElementById("hoVaTen").value;
    let tel = document.getElementById("tel").value;
    console.log(diaChi);

    if (diaChi == "" || hoVaTen == "" || tel == "") {
        popUpCartAlert();
        return;
    }
    const uid = function () {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    let maDonHang = uid();
    let listMaSP = [];
    let listSLSP = [];
    let listGiaSP = [];
    let listTenSP = [];
    for (i = 0; i < listSPCart.length; i++) {
        if (listSPCart[i].user == flagLogin.user) {
            listMaSP.push(listSPCart[i].ma);
            listSLSP.push(listSPCart[i].sl);
            listGiaSP.push(Number(listSPCart[i].gia));
            listTenSP.push(listSPCart[i].ten);
        }
    }
    let don = {
        user: flagLogin.user,
        msp: listMaSP,
        sl: listSLSP,
        gia: listGiaSP,
        ten: listTenSP,
        tel: tel,
        adress: diaChi,
        hoVaTen: hoVaTen,
        maDonHang: maDonHang,
    }
    console.log("1111", don);
    if (listDonHang == null) {
        listDonHang = [];
    }
    listDonHang.push(don);
    localStorage.setItem("listDonHang", JSON.stringify(listDonHang));
    modal.style.display = "none";
    popUpCartOK();
    for(j=0;j<listSPCart.length;j++){
        if(listSPCart[j].user!==flagLogin.user){
            newlistSPCart.push(listSPCart[j]);
        }
    }
    localStorage.setItem("listSPCart",JSON.stringify(newlistSPCart));
    renderCart();
}

var modal = document.getElementById('id01');
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        console.log("1111", modal)
        modal.style.display = "none";
    }
}