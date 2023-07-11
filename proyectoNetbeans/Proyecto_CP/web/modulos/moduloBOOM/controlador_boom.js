
export function inicializar() {
    const inputBuscar = document.querySelector('#txtbusquedaProducto');
    inputBuscar.addEventListener('input', (event) => {
        buscarProducto(event.target.value);
        console.log(event.target.value);
    });
}



const materialForm = document.getElementById("material-form");
const materialsTable = document.getElementById("materials-table");
const totalCostElement = document.getElementById("total-cost");

let materials = [];

let producto = [];


export function buscarProducto() {

    let params = new URLSearchaParams({filtro: ""});
    fetch("api/producto/buscar",
            {
                method: "POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                body: params
            })
            .then(response => {
                return response.json()
            }).then(function (data)
            {
                console.log(data);
                if (data.exception != null) {
                    Swal.fire('',
                            'Error interno del servidor. Intente nuevamente más tarde',
                            'error'
                            );
                    return;
                }
                if (data.error != null) {
                    Swal.fire('', data.error, 'warning');
                    return;
                }
                if (data.errorsec != null) {
                    Swal.fire('', data.errorsec, 'error');
                    return;
                } else {
                    loadTablaC(data);
                }
            });
    
}




export function loadTablaC(data) {
    let cuerpo="";
    productos=datos;
    productos.forEach(function (producto) {
        let registro =
                '<tr id= ('+productos.indexOf(producto)+');">'+
                '<td>' + producto.nombre + '</td>'+
                '<td>' + producto.precioCompra + '</td>'+
                '<td>' + producto.precioCompra + '</td></tr>';
        cuerpo += registro;
    });
    document.getElementById("tblProductos").innerHTML = cuerpo;
}

// Cargar datos desde la base de datos al cargar la página



materialForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const id = document.getElementById("material-id").value;
    const name = document.getElementById("material-name").value;
    const quantity = parseInt(document.getElementById("material-quantity").value);
    const unit = document.getElementById("material-unit").value;
    const unitCost = parseFloat(document.getElementById("material-unit-cost").value);

    const cost = quantity * unitCost;

    const material = {id, name, quantity, unit, unitCost, cost};
    materials.push(material);

    addMaterialRow(material);
    updateTotalCost();

});

function addMaterialRow(material) {
    const row = document.createElement("tr");

    const idCell = document.createElement("td");
    idCell.textContent = material.id;
    row.appendChild(idCell);

    const nameCell = document.createElement("td");
    nameCell.textContent = material.name;
    row.appendChild(nameCell);

    const quantityCell = document.createElement("td");
    quantityCell.textContent = material.quantity;
    row.appendChild(quantityCell);

    const unitCell = document.createElement("td");
    unitCell.textContent = material.unit;
    row.appendChild(unitCell);

    const unitCostCell = document.createElement("td");
    unitCostCell.textContent = material.unitCost;
    row.appendChild(unitCostCell);

    const costCell = document.createElement("td");
    costCell.textContent = material.cost;
    row.appendChild(costCell);

    const deleteCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.addEventListener("click", function () {
        deleteMaterial(material);
    });
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    materialsTable.querySelector("tbody").appendChild(row);
}

function deleteMaterial(material) {
    materials = materials.filter(item => item !== material);
    updateTable();
    updateTotalCost();
    saveMaterialsToDatabase()
            .then(response => response.json())
            .then(data => {
                console.log("Material eliminado de la base de datos:", data);
            })
            .catch(error => {
                console.error("Error al eliminar el material de la base de datos:", error);
            });
}

function updateTable() {
    const tableBody = materialsTable.querySelector("tbody");
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }
    materials.forEach(material => addMaterialRow(material));
}

function updateTotalCost() {
    const totalCost = materials.reduce((total, material) => total + material.cost, 0);
    totalCostElement.textContent = totalCost;
}

function saveMaterialsToDatabase() {
    return fetch("api/boom/saveMaterials", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(materials)
    });
}

function printTable() {
    window.print();
}

function resetForm() {
    materialForm.reset();
}


