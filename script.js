const searchInput = document.getElementById("searchInput");
const termCards = document.querySelectorAll(".term-card");

searchInput.addEventListener("keyup", function () {
  const keyword = searchInput.value.toLowerCase();

  termCards.forEach(function (card) {
    const text = card.innerText.toLowerCase();

    if (text.includes(keyword)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

const questions = [
  {
    question:
      "Perhatikan pohon: A sebagai akar, B dan C anak dari A, D dan E anak dari B, serta F anak dari C. Simpul manakah yang termasuk daun?",
    answers: ["A, B, dan C", "B, C, dan F", "D, E, dan F", "A, D, dan E"],
    correct: "D, E, dan F",
    explanation:
      "Daun adalah simpul yang tidak memiliki anak. Pada pohon tersebut, D, E, dan F tidak memiliki anak."
  },
  {
    question:
      "Jika A adalah akar dan lintasan dari A ke E adalah A → B → E, maka simpul yang menjadi orang tua langsung dari E adalah...",
    answers: ["A", "B", "C", "D"],
    correct: "B",
    explanation:
      "Orang tua langsung adalah simpul yang tepat berada satu tingkat di atas simpul tersebut. Jadi orang tua dari E adalah B."
  },
  {
    question:
      "Pada pohon yang sama, pasangan simpul manakah yang merupakan saudara kandung?",
    answers: ["B dan D", "D dan E", "C dan F", "A dan B"],
    correct: "D dan E",
    explanation:
      "Saudara kandung adalah simpul yang memiliki orang tua yang sama. D dan E sama-sama memiliki orang tua B."
  },
  {
    question:
      "Jika akar A berada pada aras 0, maka simpul D, E, dan F berada pada aras...",
    answers: ["0", "1", "2", "3"],
    correct: "2",
    explanation:
      "A berada pada aras 0. B dan C berada pada aras 1. D, E, dan F berada pada aras 2."
  },
  {
    question:
      "Berapakah tinggi pohon jika tinggi dihitung dari lintasan terpanjang akar ke daun?",
    answers: ["1", "2", "3", "6"],
    correct: "2",
    explanation:
      "Lintasan terpanjang dari akar ke daun adalah A → B → D, A → B → E, atau A → C → F. Panjang lintasannya adalah 2 sisi."
  },
  {
    question:
      "Simpul manakah yang termasuk simpul dalam atau internal node?",
    answers: ["A, B, dan C", "D, E, dan F", "B, D, dan F", "A saja"],
    correct: "A, B, dan C",
    explanation:
      "Simpul dalam adalah simpul yang memiliki anak. A memiliki anak B dan C, B memiliki anak D dan E, C memiliki anak F."
  },
  {
    question:
      "Jika sebuah pohon memperhatikan urutan anak dari kiri ke kanan, maka pohon tersebut disebut...",
    answers: ["Pohon kosong", "Pohon terurut", "Pohon bebas", "Pohon tak berakar"],
    correct: "Pohon terurut",
    explanation:
      "Pohon terurut adalah pohon berakar yang urutan anak-anaknya diperhatikan."
  },
  {
    question:
      "Pernyataan mana yang paling tepat tentang pohon n-ary?",
    answers: [
      "Pohon yang tidak memiliki akar",
      "Pohon yang setiap simpulnya harus memiliki n anak",
      "Pohon berakar yang setiap simpul cabangnya memiliki paling banyak n anak",
      "Pohon yang hanya boleh memiliki satu daun"
    ],
    correct: "Pohon berakar yang setiap simpul cabangnya memiliki paling banyak n anak",
    explanation:
      "Pohon n-ary adalah pohon berakar yang setiap simpul cabangnya mempunyai paling banyak n anak."
  },
  {
    question:
      "Manakah pernyataan yang paling tepat berdasarkan pohon A sampai F?",
    answers: [
      "A adalah daun karena berada paling atas",
      "F adalah akar karena tidak memiliki anak",
      "B adalah orang tua dari D dan E",
      "D adalah orang tua dari B"
    ],
    correct: "B adalah orang tua dari D dan E",
    explanation:
      "B memiliki cabang langsung menuju D dan E, sehingga B adalah orang tua dari D dan E."
  },
  {
    question:
      "Pada pohon tersebut, lintasan dari A ke F adalah...",
    answers: ["A → B → F", "A → C → F", "A → F → C", "C → A → F"],
    correct: "A → C → F",
    explanation:
      "Untuk mencapai F dari akar A, jalurnya adalah A menuju C, lalu C menuju F."
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;
let quizFinished = false;

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answerButtons");
const result = document.getElementById("result");
const nextBtn = document.getElementById("nextBtn");

function showQuestion() {
  answered = false;
  quizFinished = false;
  result.textContent = "";
  answerButtons.innerHTML = "";

  const data = questions[currentQuestion];

  questionElement.textContent =
    "Soal " + (currentQuestion + 1) + " dari " + questions.length + ": " + data.question;

  data.answers.forEach(function (answer) {
    const button = document.createElement("button");
    button.textContent = answer;

    button.addEventListener("click", function () {
      checkAnswer(answer, button);
    });

    answerButtons.appendChild(button);
  });

  if (currentQuestion === questions.length - 1) {
    nextBtn.textContent = "Lihat Hasil";
  } else {
    nextBtn.textContent = "Pertanyaan Berikutnya";
  }
}

function checkAnswer(selectedAnswer, selectedButton) {
  if (answered) {
    return;
  }

  answered = true;

  const correctAnswer = questions[currentQuestion].correct;
  const explanation = questions[currentQuestion].explanation;
  const allButtons = answerButtons.querySelectorAll("button");

  allButtons.forEach(function (button) {
    button.disabled = true;

    if (button.textContent === correctAnswer) {
      button.style.background = "#12b76a";
      button.style.color = "white";
    }
  });

  if (selectedAnswer === correctAnswer) {
    score++;
    result.innerHTML = "<strong>Benar!</strong><br>" + explanation;
    result.style.color = "#12b76a";
  } else {
    selectedButton.style.background = "#d92d20";
    selectedButton.style.color = "white";

    result.innerHTML =
      "<strong>Kurang tepat.</strong><br>" +
      "Jawaban yang benar: <strong>" +
      correctAnswer +
      "</strong><br>" +
      explanation;

    result.style.color = "#d92d20";
  }
}

nextBtn.addEventListener("click", function () {
  if (quizFinished) {
    restartQuiz();
    return;
  }

  if (!answered) {
    result.textContent = "Pilih salah satu jawaban dulu sebelum lanjut.";
    result.style.color = "#d92d20";
    return;
  }

  if (currentQuestion === questions.length - 1) {
    showFinalScore();
  } else {
    currentQuestion++;
    showQuestion();
  }
});

function showFinalScore() {
  quizFinished = true;

  questionElement.textContent = "Kuis selesai!";
  answerButtons.innerHTML = "";

  result.innerHTML =
    "Skor kamu: <strong>" +
    score +
    " / " +
    questions.length +
    "</strong><br>" +
    getScoreMessage(score);

  result.style.color = "#182033";
  nextBtn.textContent = "Ulangi Kuis";
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  answered = false;
  quizFinished = false;
  showQuestion();
}

function getScoreMessage(score) {
  if (score >= 8) {
    return "Bagus, kamu sudah memahami konsep pohon berakar, pohon terurut, dan pengantar pohon n-ary.";
  } else if (score >= 5) {
    return "Lumayan, tapi masih perlu latihan pada bagian aras, tinggi, dan hubungan antar simpul.";
  } else {
    return "Masih perlu belajar lagi. Fokus dulu ke akar, anak, orang tua, daun, lintasan, dan tinggi pohon.";
  }
}

showQuestion();