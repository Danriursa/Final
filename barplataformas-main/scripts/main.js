const swal = Swal.mixin({
  width: 400,
});

const swalResponse = Swal.mixin({
  width: 400,
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

function cargar(name) {
  $("#contenido").load("pages/" + name + ".html");
}

async function load(url) {
  let consumos = loadJs(url + "/consumos.js");
  let users = loadJs(url + "/users.js");
  let ventas = loadJs(url + "/ventas.js");
  let login = loadJs(url + "/login.js");
  let products = loadJs(url + "/products.js");
  let combos = loadJs(url + "/combos.js");
  let proveedores = loadJs(url + "/supplier.js");
  let rols = loadJs(url + "/rols.js");
  let sedes = loadJs(url + "/sedes.js");
  let mesas = loadJs(url + "/mesas.js");

  await consumos;
  await users;
  await ventas;
  await login;
  await products;
  await combos;
  await proveedores;
  await rols;
  await sedes;
  await mesas;
}

function loadJs(url) {
  let promise = new Promise(function (resolve, reject) {
    let script = document.createElement("script");
    script.onload = function () {
      console.log("Success loading", url);
      resolve(true);
    };
    script.onerror = function () {
      console.log("Error loading", url);
      reject(true);
    };
    script.src = url;
    document.head.appendChild(script);
  });
  return promise;
}

