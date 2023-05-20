/*const swal = Swal.mixin({
    width: 400,
});

const swalResponse = Swal.mixin({
    width: 400,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
});*/

function limpiarModalAgregar(){
    $("#identificacion").val("");
    $("#nombre").val("");
    $("#apellido").val("");
    $("#correo").val("");
    $("#telefono").val("");
    $("#password").val("");
    $("#rol").val("");
    $("#sede").val("");
}

function limpiarModalEditar(){
    $("#nombreEdit").val("");
    $("#apellidoEdit").val("");
    $("#correoEdit").val("");
    $("#telefonoEdit").val("");
    $("#passwordEdit").val("");
    $("#rolEdit").val("");
    $("#sedeEdit").val("");
}

async function getRol(rolId) {
    var roles = await rolsGetAll();
    for (const key in roles) {
        if (rolId === roles[key].rolId) {
            //console.log(roles[key].rolName)
            return roles[key].rolName;
        }
    }
}

async function getSede(sedeId) {
    var sedes = await sedeGetAll();
    for (const key in sedes) {
        if (sedeId === sedes[key].id) {
            //console.log(roles[key].rolName)
            return sedes[key].nombre;
        }
    }
}

async function listaUsuarios() {
    var response = await userGetAll();
    for (const key in response) {
        var newRowContent =
            '<tr><td scope="row">' +
            response[key].id +
            '<td>' +
            response[key].identification +
            "</td><td>" +
            response[key].name +
            "</td><td>" +
            response[key].lastname +
            "</td><td>" +
            response[key].mail +
            "</td><td>" +
            response[key].telefono +
            "</td><td>" +
            (await getRol(response[key].rolId)) +
            "</td><td>" +
            (await getSede(response[key].sedeId)) +
            '</td><td class="text-center"><a class="text-warning" onclick="cargaEditarUsuario('+response[key].id +
            ')" data-bs-toggle="modal" data-bs-target="#modalEditar"><i class="fa-regular fa-pen-to-square"></i></a></td><td class="text-center"><a class="text-danger" onclick="eliminarUsuario('+response[key].id +
            ')"><i class="fa-regular fa-trash"></i></a></td></tr>';
        $("#userTableBody").append(newRowContent);
    }
}

async function listaRoles() {
    var response = await rolsGetAll();
    for (const key in response) {
        var newOptionRol =
            '<option value="' +
            response[key].rolId +
            '">' +
            response[key].rolName +
            "</option>";
        $("#rol").append(newOptionRol);
        $("#rolEdit").append(newOptionRol);
    }
}

async function listaSedes() {
    var response = await sedeGetAll();
    for (const key in response) {
        var newOptionRol =
            '<option value="' +
            response[key].id +
            '">' +
            response[key].nombre +
            "</option>";
        $("#sede").append(newOptionRol);
        $("#sedeEdit").append(newOptionRol);
    }
}

function eliminarUsuario(userId) {
    swal.fire({
        text: "¿Estas seguro de eliminar al usuario " + userId + "?",
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: "Confirmar",
        denyButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            eliminarUser(userId)
        } else if (result.isDenied) {
            swalResponse.fire({
                text: "Cancelado",
                icon: "error",
            });
        }
    });
}

async function eliminarUser(userId){
    try {
        var response = await deleteUser(userId);
    } catch (e) {
        swalResponse.fire({
            text: "Error al eliminar el usuario, por favor reintenta más tarde",
            icon: "error",
        });
        return;
    }
	if (response.success) {
		swalResponse.fire({
			text: "Eliminado!",
			icon: "success",
		});
		$("#userTableBody tr").remove();
		//listaUsuarios();
        $("#contenido").load("pages/usuario.html");
	} else {
		swalResponse.fire({
			text: "Error al eliminar el usuario, por favor reintenta más tarde",
			icon: "error",
		});
	}
}

function cargaEditarUsuario(identification){
    $("#editar").click(function(){
        editarUser(identification);
        $("#spinnerEditar").show();
        limpiarModalEditar();
    });
}

async function editarUser(id){
    var nombre = $("#nombreEdit").val();
    var apellido = $("#apelldioEdit").val();
    var correo = $("#correoEdit").val();
    var telefono = $("#telefonoEdit").val();
    var password = $("#passwordEdit").val();
    var rolId = $("#rolEdit").val();
    var sede = $("#sedeEdit").val();
    rolId = rolId == null || rolId == undefined || rolId == "" ? 0 : rolId;
    try {
        var response = await editUser(identification, nombre,apellido,correo,telefono, password, rolId,sede);
    } catch (e) {
        $("#spinnerEditar").hide();
        $("#cancelarEditar").click();
        swalResponse.fire({
            text: "Error al editar el usuario, por favor reintenta más tarde",
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
		$("#userTableBody tr").remove();
		//listaUsuarios();
        $("#contenido").load("pages/usuario.html");
	} else {
        $("#spinnerEditar").hide();
        $("#cancelarEditar").click();
		swalResponse.fire({
			text: "Error al editar el usuario, por favor reintenta más tarde",
			icon: "error",
		});
	}
}

async function agregarUsuario(identification,nombre,apellido,correo,telefono,password,rol,sede){
    try {
        var response = await insertUser(identification,nombre,apellido,correo,telefono,password,rol,sede);
    } catch (e) {
        $("#spinnerAgregar").hide();
        $("#cancelarAgregar").click();
        swalResponse.fire({
            text: "Error al agregar el usuario, por favor reintenta más tarde",
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
        //$("#userTableBody tr").remove();
        //listaUsuarios();
        $("#contenido").load("pages/usuario.html");
    } else {
        $("#spinnerAgregar").hide();
        $("#cancelarAgregar").click();
        swalResponse.fire({
            text: "Error al agregar el usuario, por favor reintenta más tarde",
            icon: "error",
        });
    }
}