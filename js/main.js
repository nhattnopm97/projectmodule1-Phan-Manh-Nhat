function dangnhap() {
    window.location.href = "./html/login.html";
}

function cart(){
    window.location.href = "./html/cart.html";
}

function home(){
    window.location.href = "./html/index.html";

}

function dangky(){
    window.location.href = "./html/signup.html";
}

function renderSP() {
    let kQ = "";
    let dsSP = JSON.parse(localStorage.getItem("dsSP"));
    for (i = 0; i < dsSP.length; i++) {
        kQ +=
            `
            <div class=element>
                <img class="imgelm" src="" alt="">
                <div class="infSP">
                    <div>${dsSP[i].ten}</div>
                    <div>${dsSP[i].gia}</div>
                    <div><button>Mua</button></div>
                    <div><button onclick=addCart("${dsSP[i].ma}")>Thêm vào giỏ hàng</button></div>
                </div>
            </div>
        `;
    }
    document.getElementById("sanPham").innerHTML = kQ;
}


function addCart(idSP) {
    console.log("5555555");
    let dsSP = JSON.parse(localStorage.getItem("dsSP"));
    console.log(idSP);
    let listSPCart = JSON.parse(localStorage.getItem("listSPCart"));
    if (listSPCart == null) {
        //trường hợp giỏ hàng chưa có gì.
        listSPCart = [];
        for (i = 0; i < dsSP.length; i++) {
            if (dsSP[i].ma == idSP) {
                listSPCart.push(dsSP[i]);
                localStorage.setItem("listSPCart", JSON.stringify(listSPCart));
                console.log("thêm vào giỏ hàng thành công");
                popUpCart2();
                break;
            }
        }
    } else {
        //trường hợp có sản phẩm trong giỏ hàng thì kiểm tra xem có trung id trong giỏ hàng không
        for (j = 0; j < dsSP.length; j++) {
            if (dsSP[j].ma == idSP) {
                let flag = true;
                for (k = 0; k < listSPCart.length; k++) {
                    if (listSPCart[k].ma == idSP) {
                        flag = false;
                    } else {
                        flag = true;
                    }
                }
                if (!flag) {
                    popUpCart1();
                    console.log("sản phẩm đã có trong giỏ hàng");
                } else {
                    listSPCart.push(dsSP[j]);
                    localStorage.setItem("listSPCart", JSON.stringify(listSPCart));
                    popUpCart2();
                    console.log("thêm vào giỏ hàng thành công");
                }
            }

        }

    }
}

// hiện pop up sản phẩm đã có trong giỏ hàng
function popUpCart1() {
    document.getElementById("snack-bar").innerHTML = `Sản phẩm đã có trong giỏ hàng!`;
    var x = document.getElementById("snack-bar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

//hiện "thêm vào giỏ hàng thành công"
function popUpCart2() {
    document.getElementById("snack-bar").innerHTML = `Thêm vào giỏ hàng thành công`;
    var x = document.getElementById("snack-bar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

