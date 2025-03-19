let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");

// ✅ Recuperar el estado del sidebar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    let sidebarState = localStorage.getItem("sidebarOpen");

    if (sidebarState === "true") {
        sidebar.classList.add("open");
    } else {
        sidebar.classList.remove("open"); // Asegurar que no quede abierto accidentalmente
    }

    menuBtnChange(); // Asegurar que el ícono sea el correcto
});

// ✅ Evento para abrir/cerrar el sidebar y guardar el estado
closeBtn.addEventListener("click", () => {
    toggleSidebar();
});

searchBtn.addEventListener("click", () => {
    toggleSidebar();
});

// ✅ Función para abrir/cerrar y guardar el estado
function toggleSidebar() {
    sidebar.classList.toggle("open");
    localStorage.setItem("sidebarOpen", sidebar.classList.contains("open"));
    menuBtnChange(); // Cambia el ícono según el estado
}

// ✅ Cambiar el ícono del botón según el estado del sidebar
function menuBtnChange() {
    if (sidebar.classList.contains("open")) {
        closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
        closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
}
