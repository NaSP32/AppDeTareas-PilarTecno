let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let tareas = [];
let usuarioActual = null;

// Mostrar formularios
const mostrarRegister = () => {
  document.getElementById("login-form").classList.add("hidden");
  document.getElementById("register-form").classList.remove("hidden");
};

const mostrarLogin = () => {
  document.getElementById("register-form").classList.add("hidden");
  document.getElementById("login-form").classList.remove("hidden");
};

// Registro
const registrar = () => {
  const user = document.getElementById("register-user").value.trim();
  const pass = document.getElementById("register-pass").value;

  if (!user || !pass) {
    alert("Completá todos los campos");
    return;
  }

  if (usuarios.some((u) => u.user === user)) {
    alert("Ese usuario ya existe");
    return;
  }

  usuarios.push({ user, pass });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  alert("¡Cuenta creada! Ahora podés iniciar sesión");

  mostrarLogin();
};

// Login
const login = () => {
  const user = document.getElementById("login-user").value.trim();
  const pass = document.getElementById("login-pass").value;

  const encontrado = usuarios.find((u) => u.user === user && u.pass === pass);

  if (!encontrado) {
    alert("Usuario o contraseña incorrectos");
    return;
  }

  usuarioActual = user;
  document.getElementById("usuario-logueado").innerText = user;
  document.getElementById("login-form").classList.add("hidden");
  document.getElementById("app-tareas").classList.remove("hidden");
  tareas = []; // Reiniciamos las tareas por sesión
  renderTareas();
};

// Tareas
document.getElementById("form-tarea").addEventListener("submit", (e) => {
  e.preventDefault();
  //preventDefalut para no recargar la pagina cuando agregan las tareas

  const input = document.getElementById("input-tarea");
  const texto = input.value.trim();

  if (!texto) {
    alert("Escribí una tarea para continuar 😉");
    return;
  }

  tareas.push(texto);
  input.value = "";
  renderTareas();
});

const renderTareas = () => {
  const lista = document.getElementById("lista-tareas");
  lista.innerHTML = tareas.map((t) => `<li>${t}</li>`).join("");
};

// Cerrar sesión
const cerrarSesion = () => {
  usuarioActual = null;
  tareas = [];
  document.getElementById("app-tareas").classList.add("hidden");
  document.getElementById("login-form").classList.remove("hidden");
};