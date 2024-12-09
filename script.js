const questions = [
  { question: "What is the capital of France?", options: ["Paris", "Berlin", "Rome", "Madrid"], answer: 0 },
  { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Venus", "Jupiter"], answer: 1 },
  { question: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Leo Tolstoy"], answer: 1 },
  { question: "What is the largest ocean in the world?", options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], answer: 3 },
  { question: "What is the square root of 64?", options: ["6", "7", "8", "9"], answer: 2 },
  { question: "Which country is known as the Land of the Rising Sun?", options: ["India", "Japan", "Australia", "Thailand"], answer: 1 },
  { question: "What is the chemical symbol for water?", options: ["H2O", "CO2", "O2", "N2"], answer: 0 },
  { question: "Who painted the Mona Lisa?", options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"], answer: 1 },
  { question: "What is the smallest prime number?", options: ["1", "2", "3", "5"], answer: 1 },
  { question: "Which year did World War II end?", options: ["1942", "1945", "1948", "1950"], answer: 1 }
];

let currentScore = 0;
let currentQuestionIndex = 0;

const quizContainer = document.getElementById("quiz-container");
const scoreContainer = document.getElementById("score-container");
const finalScore = document.getElementById("final-score");

function loadQuestion() {
  const questionData = questions[currentQuestionIndex];
  quizContainer.innerHTML = `
    <h2 class="text-lg font-semibold">${currentQuestionIndex + 1}. ${questionData.question}</h2>
    <ul class="mt-4">
      ${questionData.options
        .map(
          (option, index) =>
            `<li onclick="checkAnswer(${index})" class="cursor-pointer p-2 border rounded hover:bg-gray-100">${option}</li>`
        )
        .join("")}
    </ul>
  `;
}

function checkAnswer(selectedIndex) {
  const questionData = questions[currentQuestionIndex];
  const allOptions = quizContainer.querySelectorAll("li");
  allOptions.forEach((option, index) => {
    if (index === questionData.answer) {
      option.classList.add("bg-green-500", "text-white");
    } else if (index === selectedIndex) {
      option.classList.add("bg-red-500", "text-white");
    }
    option.classList.add("pointer-events-none"); // Disable further clicks
  });

  if (selectedIndex === questionData.answer) {
    currentScore++;
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      showScore();
    }
  }, 1000);
}

function showScore() {
  quizContainer.classList.add("hidden");
  scoreContainer.classList.remove("hidden");
  finalScore.textContent = `Your Score: ${currentScore}/${questions.length}`;
}

function restartQuiz() {
  currentScore = 0;
  currentQuestionIndex = 0;
  quizContainer.classList.remove("hidden");
  scoreContainer.classList.add("hidden");
  loadQuestion();
}

// Initialize the quiz
loadQuestion();
