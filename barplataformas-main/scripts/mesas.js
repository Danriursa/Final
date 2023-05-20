async function listaMesas() {
    var response = await mesasGetAll();
    for (const key in response) {
        var newRowContent =
            '<tr><td scope="row">' +
            response[key].id +
            '<td>' +
            response[key].nombre +
            "</td><td id="+ response[key].estado+">" +
            (await estiloEstado(response[key].estado))+
            "</td><td>" +
            (await getSede(response[key].sedeId)) +
            '</td><td class="text-center"><a class="text-warning" onclick="cargaEditarMesa('+response[key].id +
            ')" data-bs-toggle="modal" data-bs-target="#modalEditar"><i class="fa-regular fa-pen-to-square"></i></a></td><td class="text-center"><a class="text-danger" onclick="eliminarMesa('+response[key].id +
            ')"><i class="fa-regular fa-trash"></i></a></td></tr>';
        $("#mesaTableBody").append(newRowContent);
    }
}

async function estiloEstado(estado) {
    switch (estado){
        case 'activa':
            return "Activa";
        case 'inactiva':
            return "Inactiva";
        default:
            return estado;
    }
}

function limpiarModalAgregar(){
    $("#estado").val("");
    $("#nombre").val("");
    $("#sede").val("");
}

function limpiarModalEditar(){
    $("#nombreEdit").val("");
    $("estadoEdit").val("");
    $("#sedeEdit").val("");
}

function eliminarMesa(mesaId) {
    swal.fire({
        text: "¿Estas seguro de eliminar la mesa " + mesaId + "?",
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: "Confirmar",
        denyButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            eliminaMesa(MesaId)
        } else if (result.isDenied) {
            swalResponse.fire({
                text: "Cancelado",
                icon: "error",
            });
        }
    });
}

async function eliminaMesa(mesaId){
    try {
        var response = await deleteMesa(mesaId);
    } catch (e) {
        swalResponse.fire({
            text: "Error al eliminar la mesa, por favor reintenta más tarde",
            icon: "error",
        });
        return;
    }
	if (response.success) {
		swalResponse.fire({
			text: "Eliminada!",
			icon: "success",
		});
		$("#mesaTableBody tr").remove();
		//listaUsuarios();
        $("#contenido").load("pages/mesa.html");
	} else {
		swalResponse.fire({
			text: "Error al eliminar la mesa, por favor reintenta más tarde",
			icon: "error",
		});
	}
}

function cargaEditarMesa(id){
    $("#editar").click(function(){
        editarMesa(id);
        $("#spinnerEditar").show();
        limpiarModalEditar();
    });
}

async function editarMesa(id){
    var nombre = $("#nombreEdit").val();
    var estado = $("#estadoEdit").val();
    var sede = $("#sedeEdit").val();
    sede = sede == null || sede == undefined || sede == "" ? 0 : sede;
    try {
        var response = await editUser(id,nombre,estado,sede);
    } catch (e) {
        $("#spinnerEditar").hide();
        $("#cancelarEditar").click();
        swalResponse.fire({
            text: "Error al editar la mesa, por favor reintenta más tarde",
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
		$("#mesaTableBody tr").remove();
		//listaUsuarios();
        $("#contenido").load("pages/mesa.html");
	} else {
        $("#spinnerEditar").hide();
        $("#cancelarEditar").click();
		swalResponse.fire({
			text: "Error al editar la mesa, por favor reintenta más tarde",
			icon: "error",
		});
	}
}

async function agregarMesa(nombre,estado,sede){
    try {
        var response = await insertMesa(nombre,estado,sede);
    } catch (e) {
        $("#spinnerAgregar").hide();
        $("#cancelarAgregar").click();
        swalResponse.fire({
            text: "Error al agregar la mesa, por favor reintenta más tarde",
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
        $("#contenido").load("pages/mesa.html");
    } else {
        $("#spinnerAgregar").hide();
        $("#cancelarAgregar").click();
        swalResponse.fire({
            text: "Error al agregar la mesa, por favor reintenta más tarde",
            icon: "error",
        });
    }
}