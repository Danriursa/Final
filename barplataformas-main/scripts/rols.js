function validarRol() {
    rolActual = parseInt(sessionStorage.getItem("rol"));

    if ( rolActual == '' || rolActual.length < 1 || rolActual == null || isNaN(rolActual) == true ) {
        location.href = "index.html";
    }
    else {
        if (rolActual == 1) {
            $("#admon").show();
            $("#sales").show();
            $("#reports").show();
        }
        else if( rolActual == 2 ){
            $("#sales").show();
        }
        else {
            $("#admon").hide();
            $("#reports").hide();
            $("#sales").hide();
        }
        cargar("index");
    }
}