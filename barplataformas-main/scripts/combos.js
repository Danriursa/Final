function limpiarModalAgregar(){
    $("#nombre").val("");
    $("#productos").val("");
}

function limpiarModalEditar(){
    $("#nombreEdit").val("");
    $("#productosEdit").val("");
}

async function getProducto(productId) {
    var productos = await productGetAll();
    for (const key in productos){
        if (productId === productos[key].idproduct){
            return productos[key].name;
        }
    }
}

async function getProduct(products) {
    var responseProd = "";
    for (const key in products){
        responseProd = responseProd + ", " + await getProducto(products[key].idproduct);
    }
    responseProd = responseProd.slice(1);
    return responseProd;
}

async function listaCombos() {
    var response = await combosGetAll();
    for (const key in response) {
        var newRowContent =
            '<tr><td scope="row">' +
            response[key].idcombo +
            "</td><td>" +
            response[key].nameCombo +
            "</td><td>" +
            (await getProduct(response[key].products)) +
            '</td><td class="text-center"><a class="text-warning" onclick="cargaEditarCombo('+response[key].idcombo +
            ')" data-bs-toggle="modal" data-bs-target="#modalEditar"><i class="fa-regular fa-pen-to-square"></i></a></td><td class="text-center"><a class="text-danger" onclick="eliminarCombo('+response[key].idcombo +
            ')"><i class="fa-regular fa-trash"></i></a></td></tr>';
        $("#comboTableBody").append(newRowContent);
    }
}

async function listaProductos() {
    var response = await productGetAll();
    for (const key in response) {
        var newOptionRol =
            '<option value="' +
            response[key].idproduct +
            '">' +
            response[key].name +
            "</option>";
        $("#productos").append(newOptionRol);
        $("#productosEdit").append(newOptionRol);
    }
}

async function agregarCombo(nombre,productos){
    var bodyProductos = [];
    for (const key in productos) {
        bodyProductos.push({
            "idproduct": productos[key]
          })
    }
    
    try {
        var response = await insertCombos(nombre, bodyProductos);
    } catch (e) {
        $("#spinnerAgregar").hide();
        $("#cancelarAgregar").click();
        swalResponse.fire({
            text: "Error al agregar el combo, por favor reintenta más tarde",
            icon: "error",
        });
        return;
    }
    if (response.success) {
        $("#spinnerAgregar").hide();
        $("#cancelarAgregar").click();
        swalResponse.fire({
            text: "Agregado!",
            icon: "success",
        });
        //$("#comboTableBody tr").remove();
        //listaCombos();
        $("#contenido").load("pages/combo.html");
    } else {
        $("#spinnerAgregar").hide();
        $("#cancelarAgregar").click();
        swalResponse.fire({
            text: "Error al agregar el combo, por favor reintenta más tarde",
            icon: "error",
        });
    }
}

async function eliminarCombo(comboId){
    swal.fire({
        text: "¿Estas seguro de eliminar el combo " + comboId + "?",
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: "Confirmar",
        denyButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            deleteCombo(comboId)
        } else if (result.isDenied) {
            swalResponse.fire({
                text: "Cancelado",
                icon: "error",
            });
        }
    });
}

async function deleteCombo(comboId){
    try {
        var response = await deleteCombos(comboId);
    } catch (e) {
        swalResponse.fire({
            text: "Error al eliminar el combo, por favor reintenta más tarde",
            icon: "error",
        });
        return;
    }
	if (response.success) {
		swalResponse.fire({
			text: "Eliminado!",
			icon: "success",
		});
		//$("#comboTableBody tr").remove();
		//listacombos();
        $("#contenido").load("pages/combo.html");
	} else {
		swalResponse.fire({
			text: "Error al eliminar el combo, por favor reintenta más tarde",
			icon: "error",
		});
	}
}

function cargaEditarCombo(comboId){
    $("#editar").click(function(){
        editarCombo(comboId);
        $("#spinnerEditar").show();
        limpiarModalEditar();
    });
}

async function editarCombo(comboId){
    var nombre = $("#nombreEdit").val();
    var productos = $("#productosEdit").val();
    var bodyProductos = [];
    for (const key in productos) {
        bodyProductos.push({
            "idproduct": productos[key]
          })
    }
    
    try {
        var response = await editCombos(comboId, nombre, bodyProductos);
    } catch (e) {
        $("#spinnerEditar").hide();
        $("#cancelarEditar").click();
        swalResponse.fire({
            text: "Error al editar el combo, por favor reintenta más tarde",
            icon: "error",
        });
        return;
    }
	if (response.success) {
        $("#spinnerEditar").hide();
        $("#cancelarEditar").click();
		swalResponse.fire({
			text: "Combo editado!",
			icon: "success",
		});
		//$("#comboTableBody tr").remove();
		//listaCombos();
        $("#contenido").load("pages/combo.html");
	} else {
        $("#spinnerEditar").hide();
        $("#cancelarEditar").click();
		swalResponse.fire({
			text: "Error al editar el combo, por favor reintenta más tarde",
			icon: "error",
		});
	}
}