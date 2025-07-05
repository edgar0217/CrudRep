// Abrir modal para crear
function openModalCrear() {
  document.getElementById("vehiculoForm").action = "/admin/indisponibilidad";
  document.getElementById("modalTitle").textContent = "Nuevo Registro";
  limpiarFormulario();
  document.getElementById("modal-bg").classList.remove("hidden");
}
// Abrir modal para editar
function openModalEditar(data) {
  document.getElementById("vehiculoForm").action =
    "/admin/indisponibilidad/" + data.id + "/edit";
  document.getElementById("modalTitle").textContent = "Editar Registro";
  document.getElementById("input_id").value = data.id || "";
  document.getElementById("input_economico").value = data.economico || "";
  document.getElementById("input_marca").value = data.marca || "";
  document.getElementById("input_modelo").value = data.modelo || "";
  document.getElementById("input_kilometraje").value = data.kilometraje || "";
  document.getElementById("input_equipo_hidraulico").value =
    data.equipo_hidraulico || "NO";
  document.getElementById("input_venta").value = data.venta || "";
  document.getElementById("input_compra").value = data.compra || "";
  document.getElementById("input_fecha_consulta").value = data.fecha_consulta
    ? data.fecha_consulta.slice(0, 10)
    : "";
  document.getElementById("input_promedio_guia_ebc").value =
    data.promedio_guia_ebc || "";
  document.getElementById("input_valor_60_reparacion").value =
    data.valor_60_reparacion || "";
  document.getElementById("input_costo_reparacion").value =
    data.costo_reparacion || "";
  document.getElementById("input_porcentaje_reparacion").value =
    data.porcentaje_reparacion || "";
  document.getElementById("input_factible_reparacion").value =
    data.factible_reparacion || "NO";
  document.getElementById("modal-bg").classList.remove("hidden");
}
// Cerrar modal crear/editar
function closeModal() {
  document.getElementById("modal-bg").classList.add("hidden");
}
// Limpiar formulario
function limpiarFormulario() {
  document.getElementById("input_id").value = "";
  document.getElementById("input_economico").value = "";
  document.getElementById("input_marca").value = "";
  document.getElementById("input_modelo").value = "";
  document.getElementById("input_kilometraje").value = "";
  document.getElementById("input_equipo_hidraulico").value = "NO";
  document.getElementById("input_venta").value = "";
  document.getElementById("input_compra").value = "";
  document.getElementById("input_fecha_consulta").value = "";
  document.getElementById("input_promedio_guia_ebc").value = "";
  document.getElementById("input_valor_60_reparacion").value = "";
  document.getElementById("input_costo_reparacion").value = "";
  document.getElementById("input_porcentaje_reparacion").value = "";
  document.getElementById("input_factible_reparacion").value = "NO";
}

// MODAL DETALLE con índice seguro
function filaClick(event, idx) {
  const tagsIgnore = ["BUTTON", "A", "FORM", "INPUT", "SELECT", "LABEL"];
  if (tagsIgnore.includes(event.target.tagName)) return;
  const data = indisponibilidadesJS[idx];
  mostrarDetalle(data);
}

function mostrarDetalle(data) {
  // Elimina las filas anteriores
  const cuerpo = document.getElementById("detalleBody");
  cuerpo.innerHTML = "";

  // Campos a mostrar
  const campos = {
    Económico: data.economico,
    Marca: data.marca,
    Modelo: data.modelo,
    Kilometraje: data.kilometraje,
    "Equipo hidráulico": data.equipo_hidraulico,
    Venta: data.venta,
    Compra: data.compra,
    "Fecha de consulta": data.fecha_consulta
      ? data.fecha_consulta.slice(0, 10)
      : "",
    "Prom. Guía EBC": data.promedio_guia_ebc,
    "Valor 60% reparación": data.valor_60_reparacion,
    "Costo reparación": data.costo_reparacion,
    "% reparación": data.porcentaje_reparacion,
    "Factible reparación": data.factible_reparacion,
  };

  for (const campo in campos) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td class="py-2 px-4 font-semibold text-gray-600">${campo}</td>
                          <td class="py-2 px-4">${campos[campo]}</td>`;
    cuerpo.appendChild(tr);
  }

  document.getElementById("modalDetalle").classList.remove("hidden");
}

function closeModalDetalle() {
  document.getElementById("modalDetalle").classList.add("hidden");
}

// Cerrar modal detalle cuando haces clic fuera del cuadro
document.getElementById("modalDetalle").addEventListener("click", function (e) {
  if (e.target === this) {
    closeModalDetalle();
  }
});
