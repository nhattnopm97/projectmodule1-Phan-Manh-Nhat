function renderListReview() {
    let flagLogin = JSON.parse(localStorage.getItem("flagLogin"));
    let dsSP = JSON.parse(localStorage.getItem("dsSP"));
    // let listReview = JSON.parse(localStorage.getItem("listReview"));
    let result = "";
    for (i = 0; i < dsSP.length; i++) {
        if (dsSP[i].ma == flagLogin.reviewid) {
            result =
                `
            <div class="element">
                <img class="imgelm" onclick=bamvaoanh("${dsSP[i].ma}") style="width:200px;" src="${dsSP[i].image}" alt="">
                <div class="infSP">
                    <div class="bg-info text-white">${dsSP[i].ten}</div>
                    <div class="bg-primary text-white">${dsSP[i].gia}$</div>
                </div>
            </div>
            <div>${flagLogin.user}</div><span></span>
            <input id="inputReview" type="text" placeholder="Thêm đánh giá">
            <button onclick=themreview("${dsSP[i].ma}")>Đánh giá</button>
            <div id="listDanhGia"></div>
            `;
        }
    }
    document.getElementById("trangchinh").innerHTML = result;
}
renderListReview();

function themreview(idsp) {
    // let listReview = [];
    // let result = "";
    // let review= document.getElementById("inputReview").value;
    let dsSP = JSON.parse(localStorage.getItem("dsSP"));
    for(i=0;i<dsSP.length;i++){
        if(dsSP[i].ma==idsp){
            console.log("111111111",dsSP[i].istReview);
        }
    }
}

function renderReview(){

}

function searchName() {
    let dsSP = JSON.parse(localStorage.getItem("dsSP"));
    let result = "";
    let inputSearch = document.getElementById("inputSearch").value;
    for (i = 0; i < dsSP.length; i++) {
        if (dsSP[i].ten.toLowerCase().includes(inputSearch.toLowerCase())) {
            result +=
                `
                <div class="element">
                    <img class="imgelm" onclick=bamvaoanh("${dsSP[i].ma}") style="width:50px;" src="${dsSP[i].image}" alt="">
                    <div class="infSP">
                        <div class="bg-info text-white">${dsSP[i].ten}</div>
                        <div class="bg-primary text-white">${dsSP[i].gia}$</div>
                        
                    </div>
                </div>
            `;
        }
    }
    document.getElementById("sanPham").innerHTML = result;
}