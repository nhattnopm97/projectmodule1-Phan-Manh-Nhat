function renderDonHang() {
    let listDonHang = JSON.parse(localStorage.getItem("listDonHang"));
    let flagLogin = JSON.parse(localStorage.getItem("flagLogin"));
    let result = "";
    let resultTenVaSL = "";
    if (flagLogin.user == "ad@gmail.com") {
        for (i = 0; i < listDonHang.length; i++) {
            for (j = 0; j < listDonHang[i].gia.length; j++) {
                resultTenVaSL += `${listDonHang[i].ten[j]}: ${listDonHang[i].sl[j]} cái;___<br>`;
            }
            result +=
                `
            <tr>
                <td>${i + 1}</td>
                <td>${listDonHang[i].hoVaTen} (${listDonHang[i].user})</td>
                <td>${listDonHang[i].maDonHang}</td>
                <td>${resultTenVaSL}</td>
                <td><select>
                <option>Chờ xác nhận</option>
                <option>Đã xác nhận</option>
                <option>Đang giao hàng</option>
                <option>Xóa đơn(xóa sau x ngày)</option>
                </select></td>
            </tr>
            `;
        }
        document.getElementById("renderDonHang").innerHTML = result;
    } else {
        for (k = 0; k < listDonHang.length; k++) {
            if (flagLogin.user == listDonHang[k].user) {
                for (l = 0; l < listDonHang[k].gia.length; l++) {
                    resultTenVaSL += `${listDonHang[k].ten[l]}: ${listDonHang[k].sl[l]} cái;___<br>`;
                }
                result +=
                    `
            <tr>
                <td>${k + 1}</td>
                <td>${listDonHang[k].hoVaTen} (${listDonHang[k].user})</td>
                <td>${listDonHang[k].maDonHang}</td>
                <td>${resultTenVaSL}</td>
                <td><select>
                <option>Chờ xác nhận</option>
                <option>Đã xác nhận</option>
                <option>Đang giao hàng</option>
                <option>Xóa đơn(xóa sau x ngày)</option>
                </select></td>
            </tr>
            `;
            }
        }
        document.getElementById("renderDonHang").innerHTML = result;
    }
}
renderDonHang();