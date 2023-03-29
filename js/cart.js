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

// redder giỏ hàng 
function renderCart() {
    let listSPCart = JSON.parse(localStorage.getItem("listSPCart"));
    let kQ = "";
    for (i = 0; i < listSPCart.length; i++) {
        kQ +=
            `
        <div class=element>
                <img class="imgelm" src="" alt="">
                <div class="infSP">
                    <button onclick="del(${i})">XÓA</button>
                    <div>${listSPCart[i].ten}</div>
                    <div>${listSPCart[i].gia*listSPCart[i].sl}</div>
                    <div class="cAndt"><button onclick="minusSL(${i})">-</button><span><div>${listSPCart[i].sl}</div></span><button onclick="plusSL(${i})">+</button></div>
                    <div><button>Mua</button></div>
                </div>
            </div>
        `;
    }
    document.getElementById("cart").innerHTML = kQ;
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
    if(listSPCart[idsp].sl==0){
        let xacNhan = confirm("Cho sản phản ra ngoài giỏ đồ?");
        if(xacNhan){
            listSPCart.splice(idsp, 1);
        }else{
            ++listSPCart[idsp].sl;
        }
    }
    localStorage.setItem("listSPCart", JSON.stringify(listSPCart));
    renderCart();
}