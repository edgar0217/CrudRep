// Modal crear/editar
function openModalCrear() {
  document.getElementById("vehiculoForm").action =
    "/admin/inventario-vehiculos";
  document.getElementById("modalTitle").textContent = "Nuevo Vehículo";
  limpiarFormulario();
  document.getElementById("modal-bg").classList.remove("hidden");
}
function openModalEditar(data) {
  document.getElementById("vehiculoForm").action =
    "/admin/inventario-vehiculos/" + data.id + "/edit";
  document.getElementById("modalTitle").textContent = "Editar Vehículo";
  document.getElementById("input_id").value = data.id || "";
  document.getElementById("input_equipo").value = data.equipo || "";
  document.getElementById("input_denominacion").value = data.denominacion || "";
  document.getElementById("input_fabricante").value = data.fabricante || "";
  document.getElementById("input_ano").value = data.ano || "";
  document.getElementById("input_matricula").value = data.matricula || "";
  document.getElementById("input_vin").value = data.vin || "";
  document.getElementById("input_motor").value = data.motor || "";
  document.getElementById("input_departamento").value = data.departamento || "";
  document.getElementById("input_area").value = data.area || "";
  document.getElementById("input_clasificacion").value =
    data.clasificacion || "";
  document.getElementById("modal-bg").classList.remove("hidden");
}
function closeModal() {
  document.getElementById("modal-bg").classList.add("hidden");
}
function limpiarFormulario() {
  document.getElementById("input_id").value = "";
  document.getElementById("input_equipo").value = "";
  document.getElementById("input_denominacion").value = "";
  document.getElementById("input_fabricante").value = "";
  document.getElementById("input_ano").value = "";
  document.getElementById("input_matricula").value = "";
  document.getElementById("input_vin").value = "";
  document.getElementById("input_motor").value = "";
  document.getElementById("input_departamento").value = "";
  document.getElementById("input_area").value = "";
  document.getElementById("input_clasificacion").value = "";
}
// Cerrar modal con ESC o clic fuera
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
document.addEventListener("click", function (event) {
  let modalBg = document.getElementById("modal-bg");
  if (!modalBg.classList.contains("hidden") && event.target === modalBg)
    closeModal();
});
