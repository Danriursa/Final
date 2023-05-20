async function listaVentas() {
    var response = await ventasGetAll();
    for (const key in response) {
        var newRowContent =
            '<tr><td scope="row">' +
            response[key].id +
            "</td><td>" +
            response[key].date +
            "</td><td>" +
            response[key].cliente +
            "</td><td>" +
            response[key].total +
            '</td><td class="text-center"><a class="text-warning" data-bs-toggle="modal" data-bs-target="#modalEditar"><i class="fa-regular fa-eye"></i></a></td><td class="text-center"><a class="text-danger"><i class="fa-regular fa-trash"></i></a></td></tr>';
        $("#userTableBody").append(newRowContent);
    }
}
