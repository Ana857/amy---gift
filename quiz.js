document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("startBtn");
    const questions = 8;
    let currentQuestion = 1;
    let intervalMove, timerCount;

    startBtn.addEventListener("click", () => {
        // ascunde butonul de start
        startBtn.style.display = "none";

        // ascunde Good luck și textul cu timpul
        document.querySelector(".goodluck").style.display = "none";
        document.querySelector(".text_game").style.display = "none";

        showQuestion(currentQuestion);
    });

    function showQuestion(num) {
        const currentQ = document.getElementById(`question${num}`);
        const answersContainer = document.querySelector(`.answers[data-question="${num}"]`);

        if (!currentQ || !answersContainer) return;

        // ascunde toate întrebările și răspunsurile
        document.querySelectorAll(".question").forEach(q => q.style.display = "none");
        document.querySelectorAll(".answers").forEach(a => a.style.display = "none");

        currentQ.style.display = "block";
        answersContainer.style.display = "block";

        // timer vizibil în div_card
        let timerDisplay = document.getElementById("timer");
        if(!timerDisplay){
            timerDisplay = document.createElement("div");
            timerDisplay.id = "timer";
            timerDisplay.style.textAlign = "center";
            timerDisplay.style.fontSize = "20px";
            timerDisplay.style.color = "#ff1493";
            currentQ.parentElement.appendChild(timerDisplay);
        }

        let timeLeft = 20;
        timerDisplay.textContent = `Timp: ${timeLeft}s`;

        clearInterval(timerCount);
        timerCount = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `Timp: ${timeLeft}s`;
            if(timeLeft <= 0){
                clearInterval(timerCount);
                showFullscreenMessage("Try again! ԅ(≖‿≖ԅ)");
            }
        }, 1000);

        // mișcare răspunsuri
        const answers = answersContainer.querySelectorAll(".answer");
        answers.forEach(ans => ans.style.position = "absolute");

        clearInterval(intervalMove);
        intervalMove = setInterval(() => {
            answers.forEach(ans => {
                const maxX = window.innerWidth - ans.offsetWidth;
                const maxY = window.innerHeight - ans.offsetHeight;
                const randomX = Math.random() * maxX;
                const randomY = Math.random() * maxY;
                ans.style.transform = `translate(${randomX}px, ${randomY}px)`;
            });
        }, 1000);

        // click pe răspunsuri
        answers.forEach(ans => {
            ans.onclick = () => {
                clearInterval(timerCount);
                if(ans.classList.contains("correct")){
                    clearInterval(intervalMove);
                    currentQ.style.display = "none";
                    answersContainer.style.display = "none";
                    timerDisplay.textContent = "";

                    currentQuestion++;
                    if(currentQuestion > questions){
                        // mesaj final full-screen
                        showFullscreenMessage("Ai terminat quiz-ul!\nYou can have your present now 🎁");
                    } else {
                        showQuestion(currentQuestion);
                    }
                } else {
                    showFullscreenMessage("Greșit 😢");
                }
            };
        });
    }

    function showFullscreenMessage(text){
        const msg = document.getElementById("fullscreenMessage");
        if(!msg) return;
        msg.textContent = text;
        msg.classList.add("show");

        setTimeout(() => {
            msg.classList.remove("show");
        }, 1500); // mesajul dispare după 1.5 secunde
    }
});
