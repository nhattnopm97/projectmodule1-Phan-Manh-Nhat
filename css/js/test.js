let listProduct = JSON.parse(localStorage.getItem("listProduct"));
function saveInfor() {

    // hàm sinh id
    const uid = function () {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
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

    let productName = document.getElementById("product-name").value;
    let genre = document.getElementById("genre").value;
    let madeIn = document.getElementById("made-in").value;
    let price = document.getElementById("price").value;
    let quantity = 1;
    let image = localStorage.getItem("myImage");
    let productID = uid();
    document.getElementById("product-name").value = "";
    document.getElementById("genre").value = "";
    document.getElementById("made-in").value = "";
    document.getElementById("price").value = "";

    newProduct = {
        productID: productID,
        productName: productName,
        productGenre: genre,
        madeIn: madeIn,
        price: price,
        quantity: quantity,
        productImage: image,
    }

    if (listProduct == null) {
        listProduct = [];
    }

    listProduct.push(newProduct);
    localStorage.setItem("listProduct", JSON.stringify(listProduct));
    searchProduct();
}

function searchProduct() {
    let searchValue = document.getElementById("search").value;
    document.getElementById("search").value = "";
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    let money = 0;
    let total = `
    <tr>
    <td id="td-title">Ảnh</td>
    <td id="td-title" class="product-name">Tên sản phẩm</td>
    <td id="td-title">Loại đèn</td>
    <td id="td-title">Nơi xuất xứ</td>
    <td id="td-title">Giá tiền</td>
    <td id="td-title" colspan=2>Sửa/Xóa</td>
</tr>
    `  ;
    for (let i = 0; i < listProduct.length; i++) {
        if (listProduct[i].productName.toLowerCase().includes(searchValue.toLowerCase())) {
            money = listProduct[i].price;
            let resultMoney = VND.format(money);
            total += `
        <tr>
<td><img src="${listProduct[i].productImage}" alt="${listProduct[i].productName}" width="100px" height="100px" /></td>
            <td>${listProduct[i].productName}</td>
            <td>${listProduct[i].productGenre}</td>
            <td>${listProduct[i].madeIn}</td>
            <td>${resultMoney}</td>
            <td class = "edit-delete"><button onclick="editProduct(${i})">Sửa</button></td>
            <td class = "edit-delete"><button onclick="deleteProduct(${i})">Xóa</button></td>
        </tr>
            `;
        }
    }
    document.getElementById("table").innerHTML = total;
}

searchProduct();

function deleteProduct(id) {
    listProduct.splice(id, 1);
    localStorage.setItem("listProduct", JSON.stringify(listProduct));
    searchProduct();
}

function editProduct(id) {
    let product = listProduct[id];
    document.getElementById("product-name").value = product.productName;
    document.getElementById("genre").value = product.productGenre;
    document.getElementById("made-in").value = product.madeIn;
    document.getElementById("price").value = product.price;
    const stillID = listProduct[id].productID;
    let arrStillID = [id, stillID];
    localStorage.setItem("flag", JSON.stringify(arrStillID));
    let hidenButton = document.getElementById("create");
    hidenButton.style.display = "none";
    let showButton = document.getElementById("update");
    showButton.style.display = "block";
}

function updateInfor() {
    flag = JSON.parse(localStorage.getItem("flag"));
    if (flag != null) {
        let productName = document.getElementById("product-name").value;
        let genre = document.getElementById("genre").value;
        let madeIn = document.getElementById("made-in").value;
        let price = document.getElementById("price").value;
        let quantity = 1;
        let image = localStorage.getItem("myImage");
        let productID = flag[1];

        newProduct = {
            productID: productID,
            productName: productName,
            productGenre: genre,
            madeIn: madeIn,
            price: price,
            quantity: quantity,
            productImage: image,
        }

        listProduct.splice(flag[0], 1, newProduct);
        localStorage.removeItem("flag");
        localStorage.setItem("listProduct", JSON.stringify(listProduct));
        let hidenButton = document.getElementById("create");
        hidenButton.style.display = "block";
        let showButton = document.getElementById("update");
        showButton.style.display = "none";
        searchProduct();
        return;
    }
}