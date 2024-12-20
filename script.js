const nombres = ["Lourdes", "Eugenio", "Fernando", "Ivan", "Lucia", "Malena", "Nicolas", "Paula", "Tomas", "Luli Rosemberg"];
let asignacionesRealizadas = JSON.parse(localStorage.getItem('asignacionesRealizadas')) || [];

// Normaliza los nombres para ignorar mayúsculas/minúsculas
const normalizarNombre = nombre => nombre.trim().toLowerCase();

function habilitarBotonAsignar() {
    const input = document.getElementById('inputName').value.trim();
    document.getElementById('assignButton').disabled = input === "";
}

function asignarNombre() {
    const nombreUsuario = normalizarNombre(document.getElementById('inputName').value);

    if (nombreUsuario === "adminlourdes") {
        alert("No puedes asignar nombres como AdminLourdes. Usa el botón de reinicio.");
        return;
    }

    // Verificar si el nombre está en la lista
    const nombreEncontrado = nombres.find(nombre => normalizarNombre(nombre) === nombreUsuario);
    if (!nombreEncontrado) {
        alert("El nombre ingresado no está en la lista.");
        return;
    }

    // Verificar si ya está asignado
    if (asignacionesRealizadas.some(asignacion => normalizarNombre(asignacion.usuario) === nombreUsuario)) {
        alert("Este nombre ya ha recibido una asignación.");
        return;
    }

    // Opciones disponibles (excluyendo usuario y asignados)
    const opcionesDisponibles = nombres.filter(nombre =>
        normalizarNombre(nombre) !== nombreUsuario &&
        !asignacionesRealizadas.some(asignacion => normalizarNombre(asignacion.asignado) === normalizarNombre(nombre))
    );

    if (opcionesDisponibles.length === 0) {
        alert("No hay nombres disponibles para asignar.");
        return;
    }

    const nombreAsignado = opcionesDisponibles[Math.floor(Math.random() * opcionesDisponibles.length)];
    asignacionesRealizadas.push({ usuario: nombreUsuario, asignado: nombreAsignado });
    localStorage.setItem('asignacionesRealizadas', JSON.stringify(asignacionesRealizadas));

    document.getElementById('nombreAsignado').innerText = nombreAsignado;
    document.getElementById('assignButton').disabled = true;
}

function resetearAsignaciones() {
    localStorage.removeItem('asignacionesRealizadas');
    asignacionesRealizadas = [];
    document.getElementById('nombreAsignado').innerText = "Ninguno";
    document.getElementById('inputName').value = "";
    document.getElementById('assignButton').disabled = true;
}

function mostrarBotonReiniciar() {
    const nombreUsuario = normalizarNombre(document.getElementById('inputName').value);
    const resetButton = document.getElementById('resetButton');
    resetButton.style.display = nombreUsuario === "adminlourdes" ? "inline-block" : "none";
}

// Inicializar evento para mostrar/ocultar botón
document.getElementById('inputName').addEventListener('input', mostrarBotonReiniciar);
