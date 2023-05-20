function limpiarModalAgregar(){
    $("#nombre").val("");
    $("#proveedor").val("");
    $("#valor").val("");
}

function limpiarModalEditar(){
    $("#nombreEdit").val("");
    $("#proveedorEdit").val("");
    $("#valorEdit").val("");
}

async function getProveedor(proveedorId) {
    proveedorId = parseInt(proveedorId);
    var proveedores = await supplierGetAll();
    for (const key in proveedores) {
        if (proveedorId === proveedores[key].id) {
            return proveedores[key].name;
        }
    }
}

async function listaProducto() {
    var response = await productGetAll();
    for (const key in response) {
        var newRowContent =
            '<tr><td scope="row">' +
            response[key].idproduct +
            "</td><td>" +
            response[key].name +
            "</td><td>" +
            await getProveedor(response[key].supplier) +
            "</td><td>" +
            response[key].price +
            '</td><td class="text-center"><a class="text-warning" onclick="cargaEditarProducto('+response[key].idproduct +
            ')" data-bs-toggle="modal" data-bs-target="#modalEditar"><i class="fa-regular fa-pen-to-square"></i></a></td><td class="text-center"><a class="text-danger" onclick="eliminarProducto('+response[key].idproduct +
            ')"><i class="fa-regular fa-trash"></i></a></td></tr>';
        $("#productTableBody").append(newRowContent);
    }
}

async function listaProveedores() {
    var response = await supplierGetAll();
    for (const key in response) {
        var newOptionRol =
            '<option value="' +
            response[key].id +
            '">' +
            response[key].name +
            "</option>";
        $("#proveedor").append(newOptionRol);
        $("#proveedorEdit").append(newOptionRol);
    }
}

async function agregarProducto(nombre,proveedor,valor){
    try {
        var response = await insertProduct(nombre,proveedor,valor);
    } catch (e) {
        $("#spinnerAgregar").hide();
        $("#cancelarAgregar").click();
        swalResponse.fire({
            text: "Error al agregar el producto, por favor reintenta más tarde",
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
        //$("#productTableBody tr").remove();
        //listaProducto();
        $("#contenido").load("pages/producto.html");
    } else {
        $("#spinnerAgregar").hide();
        $("#cancelarAgregar").click();
        swalResponse.fire({
            text: "Error al agregar el producto, por favor reintenta más tarde",
            icon: "error",
        });
    }
}

function eliminarProducto(productId) {
    swal.fire({
        text: "¿Estas seguro de eliminar el producto " + productId + "?",
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: "Confirmar",
        denyButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            eliminarProduct(productId)
        } else if (result.isDenied) {
            swalResponse.fire({
                text: "Cancelado",
                icon: "error",
            });
        }
    });
}

async function eliminarProduct(productId){
    try {
        var response = await deleteProduct(productId);
    } catch (e) {
        swalResponse.fire({
            text: "Error al eliminar el producto, por favor reintenta más tarde",
            icon: "error",
        });
        return;
    }
	if (response.success) {
		swalResponse.fire({
			text: "Eliminado!",
			icon: "success",
		});
		//$("#productTableBody tr").remove();
		//listaProducto();
        $("#contenido").load("pages/producto.html");
	} else {
		swalResponse.fire({
			text: "Error al eliminar el producto, por favor reintenta más tarde",
			icon: "error",
		});
	}
}

function cargaEditarProducto(productId){
    $("#editar").click(function(){
        editarProducto(productId);
        $("#spinnerEditar").show();
        limpiarModalEditar();
    });
}

async function editarProducto(productId){
    var nombre = $("#nombreEdit").val();
    var proveedor = $("#proveedorEdit").val();
    var valor = $("#valorEdit").val();
    try {
        var response = await editProduct(productId, nombre, proveedor, valor);
    } catch (e) {
        $("#spinnerEditar").hide();
        $("#cancelarEditar").click();
        swalResponse.fire({
            text: "Error al editar el producto, por favor reintenta más tarde",
            icon: "error",
        });
        return;
    }
	if (response.success) {
        $("#spinnerEditar").hide();
        $("#cancelarEditar").click();
		swalResponse.fire({
			text: "Usuario editado!",
			icon: "success",
		});
		//$("#productTableBody tr").remove();
		//listaProducto();
        $("#contenido").load("pages/producto.html");
	} else {
        $("#spinnerEditar").hide();
        $("#cancelarEditar").click();
		swalResponse.fire({
			text: "Error al editar el producto, por favor reintenta más tarde",
			icon: "error",
		});
	}
}