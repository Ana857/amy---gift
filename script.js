const yesBtn = document.getElementById('yesBtn');
const laterBtn = document.getElementById('laterBtn');
const fullscreenMessage = document.getElementById('fullscreenMessage');

yesBtn.addEventListener('click', () => {
  window.location.href = 'pagina-urmatoare.html';
});

laterBtn.addEventListener('click', () => {
  // arată mesajul full-screen
  fullscreenMessage.classList.add('show');

  // după 2 secunde, dispare și se revine la prima pagină
  setTimeout(() => {
    fullscreenMessage.classList.remove('show');
    // opțional, resetezi card-ul sau revii la prima pagină
    location.reload(); // reîncarcă pagina
  }, 2000);
});


document.getElementById("yesBtn").addEventListener("click", () => {
  window.location.href = "quiz.html"; // redirecționează spre quiz
});