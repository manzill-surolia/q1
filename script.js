// Timer
let timer;
function startTimer(duration, display) {
    let remainingTime = duration;
    timer = setInterval(() => {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        display.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        if (--remainingTime < 0) {
            clearInterval(timer);
            alert("Time is up! Submitting your quiz...");
            submitQuiz();
        }
    }, 1000);
}

// Submit Quiz
function submitQuiz() {
    clearInterval(timer);
    const questions = document.querySelectorAll(".question");
    questions.forEach((q) => {
        const selectedOption = q.querySelector("input[type='radio']:checked");
        const correctAnswer = q.dataset.correct; // Correct answer from data attribute
        
        if (selectedOption) {
            const selectedValue = selectedOption.value;
            if (selectedValue === correctAnswer) {
                selectedOption.parentElement.classList.add("correct");
            } else {
                selectedOption.parentElement.classList.add("incorrect");
                showCorrectAnswer(q, correctAnswer);
            }
        } else {
            // Unattempted: Show correct answer
            showCorrectAnswer(q, correctAnswer);
        }
    });
    document.getElementById("submit-btn").disabled = true; // Disable submit button
}

// Show Correct Answer
function showCorrectAnswer(question, correctAnswer) {
    const options = question.querySelectorAll("input[type='radio']");
    options.forEach((opt) => {
        if (opt.value === correctAnswer) {
            opt.parentElement.classList.add("correct");
        }
    });
}

// Event Listener for Form Submit
document.addEventListener("DOMContentLoaded", () => {
    const quizForm = document.getElementById("quiz-form");
    const timerDisplay = document.getElementById("timer");
    const duration = 5 * 60; // 5 minutes in seconds
    startTimer(duration, timerDisplay);
    quizForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent page reload
        submitQuiz();
    });
});
