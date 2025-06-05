// Formulario HTML para nuevo producto con valores por defecto

  
export function validarCamposFormulario(contexto) {
    const campos = [
      { id: "nuevoTitulo", tipo: "texto", mensaje: "El título no puede estar vacío." },
      { id: "nuevaDescripcion", tipo: "texto", mensaje: "La descripción no puede estar vacía." },
      { id: "nuevoPrecio", tipo: "numero", mensaje: "El precio debe ser un número válido." },
      { id: "nuevoPortada", tipo: "numero", mensaje: "Portada debe ser entre 1 y 5." },
      { id: "nuevaImagen", tipo: "texto", mensaje: "La URL de la imagen no puede estar vacía." },
      { id: "nuevaFecha", tipo: "fecha", mensaje: "La fecha debe tener formato AAAA-MM-DD." },
      { id: "nuevaCategoria", tipo: "texto", mensaje: "La categoría no puede estar vacía." },
      { id: "nuevoValorMedido", tipo: "numero", mensaje: "Cantidad debe ser un número válido." },
      { id: "nuevaUnidadMedido", tipo: "texto", mensaje: "Unidad de medida obligatoria." },
      { id: "nuevoProveedor", tipo: "texto", mensaje: "Proveedor obligatorio." },
    ];

    campos.forEach(({ id, tipo, mensaje }) => {
      const input = contexto.querySelector(`#${id}`);
      const errorMsg = input.nextElementSibling;
      const icono = errorMsg.nextElementSibling;

      input.addEventListener("input", () => {
        const valor = input.value.trim();
        const valido = validar(valor, tipo, id);

        input.classList.toggle("valido", valido);
        input.classList.toggle("invalido", !valido);
        errorMsg.textContent = valido ? "" : mensaje;
      });
    });
  }

  function validar(valor, tipo, id) {
    if (tipo === "texto") return valor !== "";
    if (tipo === "numero") {
      if (id === "nuevoPortada") return !isNaN(valor) && valor >= 1 && valor <= 5;
      return !isNaN(valor) && valor !== "";
    }
    if (tipo === "fecha") return /^\d{4}-\d{2}-\d{2}$/.test(valor);
    return false;
  }


