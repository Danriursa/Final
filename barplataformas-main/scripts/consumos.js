var xhr = new XMLHttpRequest();
xhr.open("GET", "config/jsonconfig.json", false);
xhr.send();

if (xhr.readyState === 4 && xhr.status == 200) {
    var myArr = JSON.parse(xhr.responseText);
    console.log(myArr);
    urls(myArr);
}

function urls(arr) {
    urlBase = arr.Config[0].url;
    console.log(urlBase);
}
//---------------------------------------------------------------------------------------
function ajaxlogin(userName, password) {
    url = urlBase + "User/Login";
    body = {
        "user": userName,
        "password": password
    }
    return consumoAjax("POST", url, JSON.stringify(body), "application/json;charset=UTF-8");
}
//---------------------------------------------------------------------------------------
function insertUser(identification, name, lastname, mail, phone, password, rolId, sedeId) {
    url = urlBase + "User/Insert";
    body = {
        "identification": identification,
        "name": name,
        "lastname" : lastname,
        "mail" : mail,
        "phone" : phone,
        "password": password,
        "rolId": rolId,
        "sedeId": sedeId
    }
    return consumoAjax("POST", url, JSON.stringify(body), "application/json;charset=UTF-8");
}
//---------------------------------------------------------------------------------------
function deleteUser(userId) {
    return consumoAjax("DELETE", urlBase + "User/Delete/" + userId, "", "");
}
//---------------------------------------------------------------------------------------
function editUser(identification, name, lastname, mail, phone, password, rolId, sedeId) {
    url = urlBase + "User/Edit/" + identification;
    body = {
        "name": name,
        "lastname": lastname,
        "mail": mail,
        "phone": phone,
        "password": password,
        "rolId": rolId,
        "sedeId": sedeId
    }
    return consumoAjax("PUT", url, JSON.stringify(body), "application/json;charset=UTF-8");
}
//---------------------------------------------------------------------------------------
function rolsGetAll() {
    //return consumoAjax("GET", urlBase + "Roles/GetAll", "", "");
    return consumoAjax("GET", "consumos/listroles.json", "", "");
}
//---------------------------------------------------------------------------------------
function userGetAll() {
    //return consumoAjax("GET", urlBase + "User/GetAll", "", "");
    return consumoAjax("GET", "consumos/listuser.json", "", "");
}
//---------------------------------------------------------------------------------------
function supplierGetAll() {
    //return consumoAjax("GET", urlBase + "Purchases/GetAll", "", "");
    return consumoAjax("GET", "consumos/listproveedores.json", "", "");
}
//---------------------------------------------------------------------------------------
function insertSupplier(identification, name) {
    url = urlBase + "Purchases/Insert";
    body = {
        "identification": identification,
        "name": name
      }
    return consumoAjax("POST", url, JSON.stringify(body), "application/json;charset=UTF-8");
}
//---------------------------------------------------------------------------------------
function editSupplier(supplierId, identification, name) {
    url = urlBase + "Purchases/Edit/" + supplierId;
    body = {
        "identification": identification,
        "name": name
      }
    return consumoAjax("PUT", url, JSON.stringify(body), "application/json;charset=UTF-8");
}
//---------------------------------------------------------------------------------------
function deleteSupplier(supplierId) {
    return consumoAjax("DELETE", urlBase + "Purchases/Delete/" + supplierId, "", "");
}
//---------------------------------------------------------------------------------------
function sedeGetAll() {
    //return consumoAjax("GET", urlBase + "Products/GetAll", "", "");
    return consumoAjax("GET", "consumos/listsede.json", "", "");
}
//---------------------------------------------------------------------------------------
function insertSede(nombre, direccion, telefono) {
    url = urlBase + "Sedes/Insert";
    body = {
        "nombre": nombre,
        "direccion": direccion,
        "telefono": telefono
    }
    return consumoAjax("POST", url, JSON.stringify(body), "application/json;charset=UTF-8");
}
//---------------------------------------------------------------------------------------
function deleteSede(sedeId) {
    return consumoAjax("DELETE", urlBase + "Sedes/Delete/" + sedeId, "", "");
}
//---------------------------------------------------------------------------------------
function editSede(sedeId, nombre, direccion, telefono) {
    url = urlBase + "Sedes/Edit/" + sedeId;
    body = {
        "nombre": nombre,
        "direccion": direccion,
        "telefono": telefono
    }
    return consumoAjax("PUT", url, JSON.stringify(body), "application/json;charset=UTF-8");
}
//---------------------------------------------------------------------------------------
function productGetAll() {
    //return consumoAjax("GET", urlBase + "Products/GetAll", "", "");
    return consumoAjax("GET", "consumos/listproductos.json", "", "");
}
//---------------------------------------------------------------------------------------
function insertProduct(name, supplier, price) {
    url = urlBase + "Products/Insert";
    body = {
        "name": name,
        "supplier": supplier,
        "price": price
    }
    return consumoAjax("POST", url, JSON.stringify(body), "application/json;charset=UTF-8");
}
//---------------------------------------------------------------------------------------
function deleteProduct(productId) {
    return consumoAjax("DELETE", urlBase + "Products/Delete/" + productId, "", "");
}
//---------------------------------------------------------------------------------------
function editProduct(productId, name, supplier, price) {
    url = urlBase + "Products/Edit/" + productId;
    body = {
        "name": name,
        "supplier": supplier,
        "price": price,
        "invoiceIdinvoice": 0
    }
    return consumoAjax("PUT", url, JSON.stringify(body), "application/json;charset=UTF-8");
}
//---------------------------------------------------------------------------------------
function combosGetAll() {
    return consumoAjax("GET", urlBase + "Combos/GetAll", "", "");
    //return consumoAjax("GET", "consumos/listcombos.json", "", "");
}
//---------------------------------------------------------------------------------------
function insertCombos(name, products) {
    url = urlBase + "Combos/Insert";
    body = {
        "nameCombo": name,
        "products": products
    }
    return consumoAjax("POST", url, JSON.stringify(body), "application/json;charset=UTF-8");
}
//---------------------------------------------------------------------------------------
function deleteCombos(comboId) {
    return consumoAjax("DELETE", urlBase + "Combos/Delete/" + comboId, "", "");
}
//---------------------------------------------------------------------------------------
function editCombos(comboId, nombre, bodyProductos) {
    url = urlBase + "Combos/Edit/" + comboId;
    body = {
        "nameCombo": nombre,
        "products": bodyProductos
    }
    return consumoAjax("PUT", url, JSON.stringify(body), "application/json;charset=UTF-8");
}
//---------------------------------------------------------------------------------------
function ventasGetAll() {
    //return consumoAjax("GET", urlBase + "User/GetAll", "", "");
    return consumoAjax("GET", "consumos/listventas.json", "", "");
}
//---------------------------------------------------------------------------------------
function mesasGetAll() {
    return consumoAjax("GET", "consumos/listmesas.json", "", "");
}
//---------------------------------------------------------------------------------------
function deleteMesa(mesaId) {
    return consumoAjax("DELETE", urlBase + "Mesas/Delete/" + MesaId, "", "");
}
//---------------------------------------------------------------------------------------
function insertMesa(nombre,estado,sedeId) {
    url = urlBase + "Mesas/Insert";
    body = {
        "nombre": nombre,
        "estado": estado,
        "sedeId":sedeId
    }
    return consumoAjax("POST", url, JSON.stringify(body), "application/json;charset=UTF-8");
}
//---------------------------------------------------------------------------------------
function editMesa(id, nombre, estado, sede) {
    url = urlBase + "Mesas/Edit/" + id;
    body = {
        "nombre": nombre,
        "estado": estado,
        "sede": sede
      }
    return consumoAjax("PUT", url, JSON.stringify(body), "application/json;charset=UTF-8");
}

//---------------------------------------------------------------------------------------
function consumoAjax(method, url, body, contentType) {
    let promise = new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var resp = xhr.responseText;
                    try {
                        var respJson = JSON.parse(resp);
                        resolve(respJson);
                    } catch (e) {
                        reject(resp);
                    }
                }
                else {
                    var resp = xhr.responseText;
                    try {
                        var respJson = JSON.parse(resp);
                        reject(respJson);
                    } catch (e) {
                        reject(resp);
                    }
                }
            }
        };
        xhr.open(method, url, true);
        if (contentType != null && contentType != "") {
            xhr.setRequestHeader("Content-type", contentType);
        }
        const encoder = new TextEncoder();
        const data = encoder.encode(body);
        xhr.send(body);
    });
    return promise;
}
