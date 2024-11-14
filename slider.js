// Variables
let currentQuestionIndex = 0;
const questionContainer = document.querySelector(".questions_container"); // Contenedor de las preguntas
const questions = document.querySelectorAll(".question"); // Todas las preguntas
const nextButton = document.getElementById("next-button");
const backButton = document.getElementById("back-button");

// Obtener el ancho de cada pregunta (suponiendo que todas las preguntas tienen el mismo tamaño)
const questionWidth = questions[0].offsetWidth;

// Función para actualizar la posición del slider (mover las preguntas)
function updateSliderPosition() {
  questions.forEach((question, index) => {
    question.style.transform = `translateX(-${
      currentQuestionIndex * questionWidth
    }px)`;
  });

  // Habilitar/Deshabilitar botones
  backButton.disabled = currentQuestionIndex === 0;
  nextButton.disabled = currentQuestionIndex === questions.length - 1;
  setBackgroundColor(currentQuestionIndex);
}

const main = document.getElementById("main");
// Select the SVG element or the specific path inside it
const path = document.querySelector("#back-art .cls-1");
const flowers = document.querySelectorAll("#flower-art .cls-2");

// Change the fill color to your desired color (e.g., '#00ff00' for green)

function setBackgroundColor(num) {
  const colors = [
    "#FF9665",
    "#FF65A8",
    "#AD73FF",
    "#81B1FF",
    "#DDFF86",
    "#FFD769",
    "#FF9665",
    "#FFD769",
  ];
  const backArtColors = [
    "#FFD769",
    "#FF9665",
    "#FF65A8",
    "#AD73FF",
    "#81B1FF",
    "#DDFF86",
    "#FFD769",
    "#FF9665",
  ];
  const flowerArtColors = [
    "#FF9665",
    "#FF65A8",
    "#AD73FF",
    "#81B1FF",
    "#DDFF86",
    "#FFD769",
    "#FF9665",
    "#FFD769",
  ];
  console.log(colors[num]);
  main.style.backgroundColor = colors[num];
  path.setAttribute("fill", backArtColors[num]);
  flowers.forEach((e) => e.setAttribute("fill", flowerArtColors[num]));
}

// Función para navegar entre las preguntas
function navigate(direction) {
  console.log("sd");
  // Cambiar el índice de la pregunta actual
  currentQuestionIndex += direction;

  // Asegurarse de que no se salga del rango de preguntas
  if (currentQuestionIndex < 0) currentQuestionIndex = 0;
  if (currentQuestionIndex >= questions.length)
    currentQuestionIndex = questions.length - 1;

  // Actualizar la posición del slider
  updateSliderPosition();
}

// Inicializa la posición al cargar
updateSliderPosition();

// Asignar eventos a los botones
nextButton.addEventListener("click", () => navigate(1));
backButton.addEventListener("click", () => navigate(-1));

let answerTimeout;
function handleAnswerSelection() {
  clearTimeout(answerTimeout);
  // Avanzar a la siguiente pregunta cuando se selecciona una respuesta

  answerTimeout = setTimeout(() => {
    // Avanzar a la siguiente pregunta después de 1 segundo
    navigate(1);
  }, 600);
}

document
  .querySelectorAll('input[type="radio"], input[type="checkbox"]')
  .forEach((input) => {
    input.addEventListener("change", handleAnswerSelection); // Cambiar a la siguiente pregunta cuando se seleccione una respuesta
  });

// Asignar evento para el slider (range) con retraso
document.querySelectorAll('input[type="range"]').forEach((input) => {
  input.addEventListener("mouseup", handleAnswerSelection); // Detectar cuando el slider cambia
});

// Si el usuario responde y desea pasar a la siguiente pregunta (usando radio buttons o checkboxes)
// Podemos llamar a navigate(1) para avanzar automáticamente a la siguiente pregunta
// O hacerlo manualmente al presionar "Siguiente"
