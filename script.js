document.addEventListener("DOMContentLoaded", () => {
    // Add timer display dynamically if it doesn't exist
    let timerDisplay = document.getElementById("timer");
    if (!timerDisplay) {
        timerDisplay = document.createElement("div");
        timerDisplay.id = "timer";
        document.body.prepend(timerDisplay);
    }

    // Ensure a valid form exists
    const quizForm = document.getElementById("quiz-form");
    if (!quizForm) {
        console.error("Quiz form not found. Ensure your HTML has <form id='quiz-form'>.");
        return;
    }

    const submitButton = document.getElementById("submit-btn");
    if (!submitButton) {
        console.error("Submit button not found. Ensure your HTML has <button id='submit-btn'>.");
        return;
    }

    // Timer logic
    let timer;
    const duration = 5 * 60; // 5 minutes in seconds
    startTimer(duration, timerDisplay);

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

    // Submit Quiz Logic
    submitButton.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent page reload
        submitQuiz();
    });

    function submitQuiz() {
        clearInterval(timer);
        const questions = document.querySelectorAll(".question");
        if (questions.length === 0) {
            console.error("No questions found. Ensure your HTML contains questions with the 'question' class.");
            return;
        }

        questions.forEach((q) => {
            const correctAnswer = q.dataset.correct;
            const selectedOption = q.querySelector("input[type='radio']:checked");

            if (selectedOption) {
                if (selectedOption.value === correctAnswer) {
                    selectedOption.parentElement.classList.add("correct");
                } else {
                    selectedOption.parentElement.classList.add("incorrect");
                    showCorrectAnswer(q, correctAnswer);
                }
            } else {
                // Highlight unattempted questions
                showCorrectAnswer(q, correctAnswer);
            }
        });

        submitButton.disabled = true; // Disable the submit button after submission
    }

    function showCorrectAnswer(question, correctAnswer) {
        const options = question.querySelectorAll("input[type='radio']");
        options.forEach((opt) => {
            if (opt.value === correctAnswer) {
                opt.parentElement.classList.add("correct");
            }
        });
    }
});
