function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const questions = [
    { question: "The book is placed ___ the table and ___ the vase for easy access.", options: ["on, beside", "under, between", "beside, under", "on, between"], answer: "on, beside" },
    // Add more questions here...
];

// Shuffle options for each question
questions.forEach(q => shuffleArray(q.options));

const questionsContainer = document.getElementById("questions-container");

// Generate the questions dynamically
questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");

    const questionText = document.createElement("p");
    questionText.textContent = `${index + 1}. ${q.question}`;

    questionDiv.appendChild(questionText);

    q.options.forEach(option => {
        const label = document.createElement("label");
        label.innerHTML = `
            <input type="radio" name="question${index}" value="${option}"> ${option}
        `;
        questionDiv.appendChild(label);
    });

    const rightAnswerText = document.createElement("p");
    rightAnswerText.textContent = `Correct Answer: ${q.answer}`;
    rightAnswerText.classList.add("right-answer");
    rightAnswerText.style.display = "none";
    questionDiv.appendChild(rightAnswerText);

    questionsContainer.appendChild(questionDiv);
});

function calculateScore() {
    let score = 0;

    questions.forEach((q, index) => {
        const questionDiv = document.querySelectorAll(".question")[index];
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        const rightAnswer = questionDiv.querySelector(".right-answer");
        rightAnswer.style.display = "block";

        if (selectedOption) {
            if (selectedOption.value === q.answer) {
                score++;
                questionDiv.classList.add("correct");
            } else {
                questionDiv.classList.add("incorrect");
            }
        } else {
            questionDiv.classList.add("incorrect");
        }
    });

    const resultDiv = document.getElementById("result");
    resultDiv.textContent = `Your score is ${score} out of ${questions.length}.`;

    clearInterval(timerInterval); // Stop the timer
}

// Timer functionality
let timeLeft = 600; // 10 minutes in seconds
const timerDiv = document.getElementById("timer");

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDiv.textContent = `Time left: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    timeLeft--;

    if (timeLeft < 0) {
        clearInterval(timerInterval);
        alert("Time's up! Submitting your test now.");
        calculateScore();
    }
}

const timerInterval = setInterval(updateTimer, 1000);
