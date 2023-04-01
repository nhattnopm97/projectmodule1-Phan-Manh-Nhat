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

function donhang(){
    window.location.href = "order.html";
}

// redder giỏ hàng 
function renderCart() {
    let listSPCart = JSON.parse(localStorage.getItem("listSPCart"));
    let flagLogin = JSON.parse(localStorage.getItem("flagLogin"));
    let kQ = "";
    let ttMn = 0;
    let coPrInUser = 0;
    for (i = 0; i < listSPCart.length; i++) {
        if (listSPCart[i].user == flagLogin.user) {
            ttMn += listSPCart[i].gia * listSPCart[i].sl;
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
    document.getElementById("totalMoney").innerHTML = `Tổng tiền:${ttMn.toLocaleString("en-US")}$`;
}

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
        let xacNhan = confirm("Cho sản phản ra ngoài giỏ đồ?");
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

function popUpCartDel() {
    document.getElementById("snack-bar").innerHTML = `Xóa thành công`;
    var x = document.getElementById("snack-bar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

//render ra các sản phẩm trong giỏ hàng để xác nhận thanh toán.
function taodon() {
    let listSPCart = JSON.parse(localStorage.getItem("listSPCart"));
    let flagLogin = JSON.parse(localStorage.getItem("flagLogin"));
    let count =0;
    let total=0;
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
            <td style="color:white" id="adress">Địa chỉ nhận hàng</td>
            <td style="color:white"><input type="text" placeholder="Hà Nội"></td>
        </tr>
        <tr>
            <td class="btn btn-success" onclick="xacNhanDonHang()">Xác nhận</td>
        </tr>
    `;
    for (i = 0; i < listSPCart.length; i++) {
        if (listSPCart[i].user == flagLogin.user) {
            ++count;
            total+=listSPCart[i].gia*listSPCart[i].sl;
            result +=
                `
            
            <tr class="spCartInf">
                <td><img class="imgelm" onclick="bamvaoanh()" style="width:50px; height:50px" src="${listSPCart[i].image}" alt=""></td>
                <td class="text-info">${count} . ${listSPCart[i].ten}</td>
                <td class="text-primary">${listSPCart[i].sl} Chiếc</td>
                <td class="text-primary">${listSPCart[i].gia*listSPCart[i].sl}$</td>
            </tr>
            `;
        }
    }
    result+=
    `
    <tr class="spCartInf">
        <td  style="color:white">Thành tiền:</td>
        <td></td>
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

function xacNhanDonHang(){
    let listSPCart = JSON.parse(localStorage.getItem("listSPCart"));
    let flagLogin = JSON.parse(localStorage.getItem("flagLogin"));
    let listDonHang =JSON.parse(localStorage.getItem("listDonHang"));
    let diaChi = document.getElementById("adress").value;
    let hoVaTen = document.getElementById("hoVaTen").value;
    let tel = document.getElementById("tel").value;
    if(diaChi==""||hoVaTen==""||tel==""){
        popUpCartAlert();
        return;
    }
    const uid = function () {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    let maDonHang = uid();
    let listMaSP=[];
    let listSLSP=[];
    let listGiaSP=[];
    let listTenSP=[];
    for(i=0;i<listSPCart.length;i++){
        if (listSPCart[i].user == flagLogin.user){
            listMaSP.push(listSPCart[i].ma);
            listSLSP.push(listSPCart[i].sl);
            listGiaSP.push(listSPCart[i].gia);
            listTenSP.push(listSPCart[i].ten);
        }
    }
    let don={
        user:flagLogin.user,
        sl:listSLSP,
        gia:listGiaSP,
        ten:listTenSP,
        tel:tel,
        adress:diaChi,
        hoVaTen:hoVaTen,
        maDonHang:maDonHang,
    }
    console.log("1111",don);
    if(listDonHang==null){
        listDonHang=[];
    }
    listDonHang.push(don);
    localStorage.setItem("listDonHang",JSON.stringify(listDonHang));
    popUpCartOK();
}

var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        console.log("1111", modal)
        modal.style.display = "none";
    }
}

//đăng xuất xóa cờ đăng nhập
function dangxuat() {
    localStorage.removeItem("flagLogin");
    kiemTraDangNhap();
    window.location.href = "../index.html";
}