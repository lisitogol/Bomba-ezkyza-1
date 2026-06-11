// ==========================================
// 🧠 CEREBRO GENERAL DE LA BOMBA EZKYZA
// ==========================================

const canvas = document.getElementById("lienzoJuego");
const ctx = canvas.getContext("2d");

// Configuración básica del juego
let teclas = {};
let jugador = { x: 100, y: 150, ancho: 30, alto: 30, color: "#3b82f6", velocidad: 4 };
let bomba = { x: 300, y: 200, radio: 15, color: "#ef4444" };

// Detectar teclas de la computadora (W, A, S, D y Flechas)
window.addEventListener("keydown", (e) => { teclas[e.key] = true; });
window.addEventListener("keyup", (e) => { teclas[e.key] = false; });

// 📱 CONFIGURAR CONTROLES TÁCTILES VIRTUALES PARA EL CELULAR
function configurarBotonCel(idBoton, teclaSimulada) {
  const boton = document.getElementById(idBoton);
  if (!boton) return; // Candado de seguridad para que no se congele 🔒
  
  // Soporte para pantallas táctiles (Celular/Tablet)
  boton.addEventListener("touchstart", (e) => { e.preventDefault(); teclas[teclaSimulada] = true; });
  boton.addEventListener("touchend", (e) => { e.preventDefault(); teclas[teclaSimulada] = false; });
  
  // Soporte para clics con el Mouse (Computadora)
  boton.addEventListener("mousedown", () => { teclas[teclaSimulada] = true; });
  boton.addEventListener("mouseup", () => { teclas[teclaSimulada] = false; });
}

// Conectamos los botones del diseño con el movimiento
configurarBotonCel("btn-arriba", "ArrowUp");
configurarBotonCel("btn-abajo", "ArrowDown");
configurarBotonCel("btn-izquierda", "ArrowLeft");
configurarBotonCel("btn-derecha", "ArrowRight");

// Bucle principal del juego (Se ejecuta a toda velocidad)
function actualizarJuego() {
  // Mover jugador con teclado o botones virtuales
  if (teclas["w"] || teclas["ArrowUp"]) jugador.y -= jugador.velocidad;
  if (teclas["s"] || teclas["ArrowDown"]) jugador.y += jugador.velocidad;
  if (teclas["a"] || teclas["ArrowLeft"]) jugador.x -= jugador.velocidad;
  if (teclas["d"] || teclas["ArrowRight"]) jugador.x += jugador.velocidad;

  // Límites de la pantalla para que no se escape el jugador
  if (jugador.x < 0) jugador.x = 0;
  if (jugador.x > canvas.width - jugador.ancho) jugador.x = canvas.width - jugador.ancho;
  if (jugador.y < 0) jugador.y = 0;
  if (jugador.y > canvas.height - jugador.alto) jugador.y = canvas.height - jugador.alto;

  // Limpiar el lienzo y dibujar todo de nuevo
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar la bomba 💣
  ctx.beginPath();
  ctx.arc(bomba.x, bomba.y, bomba.radio, 0, Math.PI * 2);
  ctx.fillStyle = bomba.color;
  ctx.fill();
  ctx.closePath();

  // Dibujar al jugador principal 🟦
  ctx.fillStyle = jugador.color;
  ctx.fillRect(jugador.x, jugador.y, jugador.ancho, jugador.alto);

  requestAnimationFrame(actualizarJuego);
}

// ¡Arrancamos el motor!
actualizarJuego();
console.log("¡El cerebro de los controles está corriendo perfectamente! 🎮🧠");
