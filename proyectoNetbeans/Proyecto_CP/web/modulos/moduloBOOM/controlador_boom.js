const materialForm = document.getElementById("material-form");
const materialsTable = document.getElementById("materials-table");
const totalCostElement = document.getElementById("total-cost");
const printTableBtn = document.getElementById("print-table-btn");

let materials = [];

materialForm.addEventListener("submit", function (event) {
    event.preventDefault();


    const name = document.getElementById("material-name").value;
    const quantity = parseInt(document.getElementById("material-quantity").value);
    const unit = document.getElementById("material-unit").value;
    const unitCost = parseFloat(document.getElementById("material-unit-cost").value);

    const cost = quantity * unitCost;

    const material = {name, quantity, unit, unitCost, cost};
    materials.push(material);

    addMaterialRow(material);
    updateTotalCost();
    resetForm();
});

function addMaterialRow(material) {
    const row = document.createElement("tr");


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

function resetForm() {
    materialForm.reset();
}
printTableBtn.addEventListener("click", function () {
    printTable();
});



printTableBtn.addEventListener("click", function () {
    printTable();
});

// Función para imprimir solo la tabla
function printTable() {
    const originalDisplayStyle = materialsTable.style.display; 

    materialsTable.style.display = 'table';

    window.print(); 

    materialsTable.style.display = originalDisplayStyle;
}
