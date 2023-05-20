function limpiarModalAgregar(){
    $("#identificacion").val("");
    $("#nombre").val("");
}

function limpiarModalEditar(){
    $("#nombreEdit").val("");
    $("#identificacionEdit").val("");
}

async function listaProveedor() {
    var response = await supplierGetAll();
    for (const key in response) {
        var newRowContent =
            '<tr><td scope="row">' +
            response[key].id +
            "</td><td>" +
            response[key].identification +
            "</td><td>" +
            response[key].name +
            '</td><td class="text-center"><a class="text-warning" onclick="cargaEditarProveedor('+response[key].id +
            ')" data-bs-toggle="modal" data-bs-target="#modalEditar"><i class="fa-regular fa-pen-to-square"></i></a></td><td class="text-center"><a class="text-danger" onclick="eliminarProveedor('+response[key].id +
            ')"><i class="fa-regular fa-trash"></i></a></td></tr>';
        $("#proveedorTableBody").append(newRowContent);
    }
}

async function agregarProveedor(identification,nombre){
    try {
        var response = await insertSupplier(identification, nombre);
    } catch (e) {
        $("#spinnerAgregar").hide();
        $("#cancelarAgregar").click();
        swalResponse.fire({
            text: "Error al agregar el proveedor, por favor reintenta más tarde",
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
        //$("#proveedorTableBody tr").remove();
        //listaProveedor();
        $("#contenido").load("pages/proveedor.html");
    } else {
        $("#spinnerAgregar").hide();
        $("#cancelarAgregar").click();
        swalResponse.fire({
            text: "Error al agregar el proveedor, por favor reintenta más tarde",
            icon: "error",
        });
    }
}

function cargaEditarProveedor(id){
    $("#editar").click(function(){
        editarSupplier(id);
        $("#spinnerEditar").show();
        limpiarModalEditar();
    });
}

async function editarSupplier(id){
    var nombre = $("#nombreEdit").val();
    var identification = $("#identificacionEdit").val();
    try {
        var response = await editSupplier(id,identification, nombre);
    } catch (e) {
        $("#spinnerEditar").hide();
        $("#cancelarEditar").click();
        swalResponse.fire({
            text: "Error al editar el proveedor, por favor reintenta más tarde",
            icon: "error",
        });
        return;
    }
	if (response.success) {
        $("#spinnerEditar").hide();
        $("#cancelarEditar").click();
		swalResponse.fire({
			text: "Proveedor editado!",
			icon: "success",
		});
        //$("#proveedorTableBody tr").remove();
        //listaProveedor();
        $("#contenido").load("pages/proveedor.html");
	} else {
        $("#spinnerEditar").hide();
        $("#cancelarEditar").click();
		swalResponse.fire({
			text: "Error al editar el proveedor, por favor reintenta más tarde",
			icon: "error",
		});
	}
}

function eliminarProveedor(supplierId) {
    swal.fire({
        text: "¿Estas seguro de eliminar al proveedor " + supplierId + "?",
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: "Confirmar",
        denyButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            eliminarSupplier(supplierId)
        } else if (result.isDenied) {
            swalResponse.fire({
                text: "Cancelado",
                icon: "error",
            });
        }
    });
}

async function eliminarSupplier(supplierId){
    try {
        var response = await deleteSupplier(supplierId);
    } catch (e) {
        swalResponse.fire({
            text: "Error al eliminar el proveedor, por favor reintenta más tarde",
            icon: "error",
        });
        return;
    }
	if (response.success) {
		swalResponse.fire({
			text: "Eliminado!",
			icon: "success",
		});
		//$("#proveedorTableBody tr").remove();
        //listaProveedor();
        $("#contenido").load("pages/proveedor.html");
	} else {
		swalResponse.fire({
			text: "Error al eliminar el proveedor, por favor reintenta más tarde",
			icon: "error",
		});
	}
}