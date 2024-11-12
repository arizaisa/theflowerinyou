const form = document.getElementById("quiz-form");
const loading = document.getElementById("loading");
const result = document.getElementById("result");

const flowerImage = document.getElementById("flower-image");

// Asignación de flores a las respuestas
const flowerPoints = {
  feelings: {
    A: "Lily of the Valley", // 1 punto para Lily of the Valley
    B: "Rose", // 1 punto para Rose
    C: "Orchid", // 1 punto para Orchid
    D: "Sunflower", // 1 punto para Sunflower
  },
  celebration: {
    A: "Lily of the Valley",
    B: "Sunflower",
    C: "Lavender",
    D: "Cherry Blossom",
  },
  happiness: {
    A: "Lavender",
    B: "Sunflower",
    C: "Orchid",
    D: "Daisy",
  },
  relationships: {
    A: "Lily of the Valley",
    B: "Sunflower",
    C: "Orchid",
    D: "Rose",
  },
  value: {
    0: "Orchid", // Creatividad
    50: "Lily of the Valley", // Estabilidad intermedia
    100: "Rose", // Estabilidad
  },
  friendship_qualities: {
    A: "Lily of the Valley", // Lealtad
    B: "Lavender", // Honestidad
    C: "Sunflower", // Diversión
    D: "Orchid", // Conversaciones profundas
    E: "Rose", // Dependencia
    F: "Daisy", // Positividad
  },
  personality_words: {
    A: "Orchid", // Creatividad
    B: "Sunflower", // Aventurero
    C: "Lily of the Valley", // Nurturante
    D: "Lavender", // Paz
    E: "Rose", // Determinado
    F: "Daisy", // Optimista
  },
};

// Función para obtener los puntos de las respuestas seleccionadas
function getFlowerPoints() {
  const points = {
    "Lily of the Valley": 0,
    Rose: 0,
    Orchid: 0,
    Sunflower: 0,
    Lavender: 0,
    "Cherry Blossom": 0,
    Daisy: 0,
    Lotus: 0,
  };

  // Recorremos todas las preguntas y sumamos los puntos
  const formData = new FormData(form);
  // Pregunta 1 - Expresión de sentimientos
  const feelingsAnswer = formData.get("feelings");
  if (feelingsAnswer) {
    points[flowerPoints.feelings[feelingsAnswer]]++;
  }
  // Pregunta 2 - Celebración
  const celebrationAnswer = formData.get("celebration");
  if (celebrationAnswer) {
    points[flowerPoints.celebration[celebrationAnswer]]++;
  }
  console.log(points);
  // Pregunta 3 - Felicidad
  const happinessAnswer = formData.get("happiness");
  if (happinessAnswer) {
    points[flowerPoints.happiness[happinessAnswer]]++;
  }
  // Pregunta 4 - Relaciones
  const relationshipsAnswer = formData.get("relationships");
  if (relationshipsAnswer) {
    points[flowerPoints.relationships[relationshipsAnswer]]++;
  }
  // Pregunta 5 - Creatividad vs Estabilidad
  const valueAnswer = formData.get("value");
  if (valueAnswer != null) {
    const value = parseInt(valueAnswer);
    if (value <= 33) {
      points[flowerPoints.value[0]]++;
    } else if (value <= 66) {
      points[flowerPoints.value[50]]++;
    } else {
      points[flowerPoints.value[100]]++;
    }
  }
  // Pregunta 6 - Cualidades de la amistad
  const friendshipQualitiesAnswers = formData.getAll("friendship_qualities");
  friendshipQualitiesAnswers.forEach((answer) => {
    if (flowerPoints.friendship_qualities[answer]) {
      points[flowerPoints.friendship_qualities[answer]]++;
    }
  });
  // Pregunta 7 - Palabras clave de la personalidad
  const personalityWordsAnswers = formData.getAll("personality_words");
  personalityWordsAnswers.forEach((answer) => {
    if (flowerPoints.personality_words[answer]) {
      points[flowerPoints.personality_words[answer]]++;
    }
  });
  console.log(points);
  return points;
}

// Función para determinar la flor ganadora
function getWinnerFlower(points) {
  let maxPoints = 0;
  let winnerFlower = "";

  for (const flower in points) {
    if (points[flower] > maxPoints) {
      maxPoints = points[flower];
      winnerFlower = flower;
    }
  }

  return winnerFlower;
}

console.log(form);
form.addEventListener("submit", function (event) {
  console.log("SUBMIT");
  event.preventDefault();

  // Ocultar el formulario y mostrar el área de carga
  form.style.display = "none";
  loading.style.display = "block";

  setTimeout(() => {
    const points = getFlowerPoints();
    const winnerFlower = getWinnerFlower(points);

    // Mostrar el resultado

    flowerImage.src = `./pictures/${winnerFlower
      .toLowerCase()
      .replace(/ /g, "_")}.png`; // Asumimos imágenes en minúsculas con guiones bajos
    flowerImage.alt = winnerFlower;

    // Ocultar el área de carga y mostrar el resultado
    loading.style.display = "none";
    result.style.display = "block";
  }, 2000); // 2 segundos de espera para simular carga
});
