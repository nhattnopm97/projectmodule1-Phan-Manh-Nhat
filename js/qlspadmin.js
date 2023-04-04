function dangnhap() {
    window.location.href = "login.html";
}

function home() {
    window.location.href = "../index.html";
}

function cart() {
    window.location.href = "../html/cart.html";
}

function kiemTraDangNhap() {
    let flagLogin = JSON.parse(localStorage.getItem("flagLogin"));
    if (flagLogin != null) {
        if (flagLogin.user == "ad@gmail.com") {
            document.getElementById("nameUser").innerHTML = `Xin chào admin`;
            document.getElementById("danhsachSP").style.display = "block"
        } else {
            document.getElementById("nameUser").innerHTML = `Xin chào ${flagLogin.user}`;
        }
        document.getElementById("dangxuat").style.display = "block";
        document.getElementById("dangnhap").style.display = "none";
    } else {
        document.getElementById("dangxuat").style.display = "none";
        document.getElementById("nameUser").style.display = "none";
        document.getElementById("dangnhap").style.display = "block";
        document.getElementById("danhsachSP").style.display = "none"

    }
}
kiemTraDangNhap();

//đăng xuất
function dangxuat() {
    localStorage.removeItem("flagLogin");
    kiemTraDangNhap();
    window.location.href = "../index.html"
}

function addimage() {
    // Lấy thẻ hình ảnh từ HTML
    const myImage = document.getElementById("image");

    // Lắng nghe sự kiện onchange của input
    const imageInput = document.getElementById("imgProduct");

    imageInput.onchange = function (event) {
        const file = event.target.files[0];

        // Đọc tệp ảnh và chuyển đổi nó thành dữ liệu URL
        const reader = new FileReader();
        reader.onload = function (event) {
            const dataUrl = event.target.result;

            // Thiết lập nguồn ảnh của đối tượng ảnh với dữ liệu URL
            myImage.src = dataUrl;

            // Lưu dữ liệu URL vào local storage
            localStorage.setItem("myImage", dataUrl);

            // // Hiển thị ảnh
            // imgElement.src = dataUrl;
        };
        reader.readAsDataURL(file);
    };
}
addimage();

function popUpnotadmin() {
    document.getElementById("snack-bar").innerHTML = `Bạn đang truy cập trái phép!`;
    var x = document.getElementById("snack-bar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}


//khi bấm vào nút lưu sản phẩm, lưu sản phẩm lên và sinh id cho sản phẩm
let dsSP = JSON.parse(localStorage.getItem("dsSP"));
function save() {
    let flagLogin = JSON.parse(localStorage.getItem("flagLogin"));
    if (flagLogin.user != "ad@gmail.com") {
        popUpnotadmin();
        return;
    }
    addimage();
    let ten = document.getElementById("ten").value;
    let gia = document.getElementById("gia").value;
    let hinhAnh = localStorage.getItem("myImage");
    const uid = function () {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    let ma = uid();
    let moTa = document.getElementById("moTa").value;
    let sanPham = {
        ten: ten,
        gia: gia,
        ma: ma,
        moTa: moTa,
        sl: 1,
        image: hinhAnh
    }
    if (dsSP == null) {
        dsSP = [];
    }
    dsSP.push(sanPham);
    localStorage.setItem("dsSP", JSON.stringify(dsSP));
    themVaoBang();
}


function themVaoBang() {
    let kq =
        `
    <tr>
        <td>STT</td>
        <td>Tên sản phẩm</td>
        <td>Giá</td>
        <td>Mã sản phẩm</td>
        <td>Edit</td>
        <td>Xóa</td>
        <td>Xem chi tiết</td>
    </tr>
    `;
    for (i = 0; i < dsSP.length; i++) {
        kq +=
            `
        <tr>
            <td>${i + 1}</td>
            <td>${dsSP[i].ten}</td>
            <td>${dsSP[i].gia}</td>
            <td>${dsSP[i].ma}</td>
            <td><button onclick="ed(${i})"  class="btn btn-info">Edit</button></td>
            <td><button onclick="del(${i})"  class="btn btn-danger">Xóa</button></td>
            <td><button>Xem chi tiết</button></td>
        </tr>
        `;
    }
    document.getElementById("table").innerHTML = kq;
    document.getElementById("ten").value = "";
    document.getElementById("gia").value = "";
    document.getElementById("moTa").value = "";
}
themVaoBang();
function del(id) {
    let flagLogin = JSON.parse(localStorage.getItem("flagLogin"));
    if (flagLogin.user != "ad@gmail.com") {
        popUpnotadmin();
        return;
    }
    dsSP.splice(id, 1);
    localStorage.setItem("dsSP", JSON.stringify(dsSP));
    themVaoBang();
}

//khi bấm vào nút edit thì ẩn nút lưu sản phẩm, hiện nút update sản phẩm cũ.
function ed(id) {
    let flagLogin = JSON.parse(localStorage.getItem("flagLogin"));
    if (flagLogin.user != "ad@gmail.com") {
        popUpnotadmin();
        return;
    }
    document.getElementById("ten").value = dsSP[id].ten;
    document.getElementById("gia").value = dsSP[id].gia;
    document.getElementById("moTa").value = dsSP[id].moTa;
    const idSPNed = dsSP[id].ma;
    let idAndMa = [id, idSPNed];
    localStorage.setItem("flag", JSON.stringify(idAndMa));
    let hidenbutton = document.getElementById("btnSave");
    hidenbutton.style.display = "none";
    let showHidenBtn = document.getElementById("btnhiden");
    showHidenBtn.style.display = "block";
}


//Tìm kiếm theo tên sản phẩm
function timKiem() {
    let flagLogin = JSON.parse(localStorage.getItem("flagLogin"));
    if (flagLogin.user != "ad@gmail.com") {
        popUpnotadmin();
        return;
    }
    let ndTK = document.getElementById("timKiem").value;
    let kqTK = "";
    for (j = 0; j < dsSP.length; j++) {
        if (dsSP[j].ten.toLowerCase().includes(ndTK.toLowerCase())) {
            kqTK +=
                `
            <tr>
                <td>${j + 1}</td>
                <td><img src="${dsSP[j].image}" width="100px" height="100px"></td>
                <td>${dsSP[j].ten}</td>
                <td>${dsSP[j].gia}</td>
                <td>${dsSP[j].ma}</td>
                <td>${dsSP[j].moTa}</td>
            </tr>
            `
        }
        document.getElementById("tbsearch").innerHTML = kqTK;
    }
}

//xóa dữ liệu cũ và cập nhật dữ liệu mới với mã là mã cũ vào danh sách sản phẩm lưu trên local, chuyển nút cập nhật thành nút lưu
function updateSP() {
    let flagLogin = JSON.parse(localStorage.getItem("flagLogin"));
    if (flagLogin.user != "ad@gmail.com") {
        popUpnotadmin();
        return;
    }
    flag = JSON.parse(localStorage.getItem("flag"));
    if (flag != null) {
        // Lấy thẻ hình ảnh từ HTML
        const myImage = document.getElementById("image");

        // Lắng nghe sự kiện onchange của input
        const imageInput = document.getElementById("imgProduct");

        imageInput.onchange = function (event) {
            const file = event.target.files[0];

            // Đọc tệp ảnh và chuyển đổi nó thành dữ liệu URL
            const reader = new FileReader();
            reader.onload = function (event) {
                const dataUrl = event.target.result;

                // Thiết lập nguồn ảnh của đối tượng ảnh với dữ liệu URL
                myImage.src = dataUrl;

                // Lưu dữ liệu URL vào local storage
                localStorage.setItem("myImage", dataUrl);

                // // Hiển thị ảnh
                // imgElement.src = dataUrl;
            };
            reader.readAsDataURL(file);
        };
        let gia = document.getElementById("gia").value;
        let ten = document.getElementById("ten").value;
        let ma = flag[1];
        let moTa = document.getElementById("moTa").value;
        let hinhAnh = localStorage.getItem("myImage");

        sanPham = {
            ten: ten,
            gia: gia,
            ma: ma,
            moTa: moTa,
            sl: 1,
            image: hinhAnh
        }
        localStorage.removeItem("flag");
        dsSP.splice(flag[0], 1, sanPham);
        localStorage.setItem("dsSP", JSON.stringify(dsSP));
        themVaoBang();
        let hidenbutton = document.getElementById("btnSave");
        hidenbutton.style.display = "block";
        let showHidenBtn = document.getElementById("btnhiden");
        showHidenBtn.style.display = "none";
    }
}

//render danh sách người dùng
function uoa() {
    let flagLogin = JSON.parse(localStorage.getItem("flagLogin"));
    if (flagLogin.user != "ad@gmail.com") {
        popUpnotadmin();
        return;
    }
    let listUser = JSON.parse(localStorage.getItem("listUser"));
    let kQ = `
    <tr>
        <td>stt</td>
        <td>tên người dùng</td>
        <td>sdt:</td>
        <td>Ban</td>
        <td>Xóa</td>
    </tr>`;
    for (i = 0; i < listUser.length; i++) {
        kQ +=
            `
        <tr>
            <td>${i + 1}  </td>
            <td>${listUser[i].email}</td>
            <td>${listUser[i].tel}</td>
            <td><button class="btn btn-danger" onclick="banlUser(${i})">Lock</button></td>
            <td><button class="btn btn-danger" onclocl="delUser${i}">xóa</button></td>
            <td><button class="btn btn-primary" onclick="unbanlUser(${i})">Unlock</button></td>
        </tr>
        `;
    }
    document.getElementById("listUserRender").innerHTML = kQ;
}
uoa();

function delUser(id) {
    let flagLogin = JSON.parse(localStorage.getItem("flagLogin"));
    if (flagLogin.user != "ad@gmail.com") {
        popUpnotadmin();
        return;
    }
    let listUser = JSON.parse(localStorage.getItem("listUser"));
    listUser.splice(id, 1);
    localStorage.setItem("listUser", JSON.stringify(listUser));
    uoa();
}

function banlUser(id) {
    let flagLogin = JSON.parse(localStorage.getItem("flagLogin"));
    if (flagLogin.user != "ad@gmail.com") {
        popUpnotadmin();
        return;
    }
    let listUser = JSON.parse(localStorage.getItem("listUser"));
    console.log(id);
    if (id == 0) {
        popUpadmin();
    } else {
        listUser[id].statususer = "ban";
        localStorage.setItem("listUser", JSON.stringify(listUser));
        popUpban();
    }
}

function unbanlUser(id) {
    let flagLogin = JSON.parse(localStorage.getItem("flagLogin"));
    if (flagLogin.user != "ad@gmail.com") {
        popUpnotadmin();
        return;
    }
    let listUser = JSON.parse(localStorage.getItem("listUser"));
    listUser[id].statususer = "bình thường";
    localStorage.setItem("listUser", JSON.stringify(listUser));
    popUpunban();
}

function popUpban() {
    document.getElementById("snack-bar").innerHTML = `Tài khoản đã bị khóa`;
    var x = document.getElementById("snack-bar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

function popUpunban() {
    document.getElementById("snack-bar").innerHTML = `Mở khóa tài khoản thành công`;
    var x = document.getElementById("snack-bar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

function popUpadmin() {
    document.getElementById("snack-bar").innerHTML = `Không thể khóa tài khoản admin`;
    var x = document.getElementById("snack-bar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}


