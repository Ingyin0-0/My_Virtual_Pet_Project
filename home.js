// document.addEventListener("DOMContentLoaded", function () {

//     let bgMusic;

//     if (window.location.pathname.includes("index.html")) {

//         bgMusic = new Audio("assets/music.mp3");

//     } else if (window.location.pathname.includes("story.html")) {

//         bgMusic = new Audio("assets/rainy.mp3");

//     } else if (window.location.pathname.includes("play.html")) {

//         bgMusic = new Audio("assets/home.mp3");

//     }

//     if (!bgMusic) return;

//     bgMusic.volume = 0.15;

//     bgMusic.loop = true;

//     bgMusic.preload = "auto";

//     let musicOn = false;

//     function startMusicOnce() {

//         if (!musicOn) {

//             bgMusic.play().catch(() => { });

//             musicOn = true;

//             const musicToggle = document.getElementById("musicToggle");

//             if (musicToggle) {

//                 musicToggle.innerHTML = `<i class="fa-solid fa-music"></i> Music: ON`;

//             }

//         } document.removeEventListener("click", startMusicOnce);

//     }

//     document.addEventListener("click", startMusicOnce);

//     // Music toggle
//     const musicToggle = document.getElementById("musicToggle");

//     if (musicToggle) {

//         musicToggle.addEventListener("click", (e) => {

//             e.stopPropagation();

//             if (musicOn) {

//                 bgMusic.pause();

//                 musicOn = false;

//             } else {

//                 bgMusic.play().catch(() => { });

//                 musicOn = true;

//             }

//             musicToggle.innerHTML =

//                 `<i class="fa-solid fa-music"></i> Music: ${musicOn ? "ON" : "OFF"}`;

//         });

//     }

//     const meowSfx = new Audio("assets/meow.wav");

//     meowSfx.volume = 0.2;

//     meowSfx.preload = "auto";

//     let sfxOn = true;

//     function playMeow() {

//         if (sfxOn) {

//             meowSfx.currentTime = 0;

//             meowSfx.play().catch(() => { });

//         }

//     }

//     // Start Button
//     const startBtn = document.getElementById("startBtn");

//     if (startBtn) {

//         startBtn.addEventListener("click", function (e) {

//             e.stopPropagation();

//             playMeow();

//             setTimeout(() => {

//                 const savedGame = localStorage.getItem("noirGame");

//                 if (savedGame) {

//                     showConfirmModal(

//                         "Do you want to start over and lose your saved progress?",

//                         "This will delete your save.",

//                         () => {

//                             localStorage.removeItem("noirGame");

//                             window.location.href = "story.html";

//                         }

//                     );

//                 } else {

//                     window.location.href = "story.html";

//                 }

//             }, 800);

//         });

//     }

//     // Continue Button 
//     const continueBtn = document.getElementById("continueBtn");

//     if (continueBtn) {

//         const savedGame = localStorage.getItem("noirGame");

//         if (!localStorage.getItem("noirGame")) {

//             continueBtn.disabled = true;

//             continueBtn.title = "No saved game found.";

//         } else {

//             continueBtn.disabled = false;

//             continueBtn.title = "";

//         }

//         continueBtn.addEventListener("click", function (e) {

//             e.stopPropagation();

//             playMeow();

//             const lastestSave = localStorage.getItem("noirGame");

//             if (!lastestSave) {

//                 showModal("No saved game found.");

//                 return;

//             }

//             setTimeout(() => {

//                 window.location.href = "play.html";

//             }, 800);

//         });

//     }

//     // SFX toggle
//     const sfxToggle = document.getElementById("sfxToggle");

//     if (sfxToggle) {

//         sfxToggle.addEventListener("click", () => {

//             sfxOn = !sfxOn;

//             sfxToggle.innerHTML =

//                 `<i class="fa-solid fa-volume-high"></i> SFX: ${sfxOn ? "ON" : "OFF"}`;

//         });

//     }

//     // Meow for buttons 
//     document.addEventListener("click", function (e) {

//         if (e.target.closest("#feedBtn, #petBtn, #playBtn, #choiceBtn")) {

//             playMeow();

//         }

//     });

//     // Dropdown
//     const settingBtn = document.getElementById("settingBtn");

//     const dropdown = document.querySelector(".dropdown-content");

//     if (settingBtn && dropdown) {

//         settingBtn.addEventListener("click", function (event) {

//             event.stopPropagation();

//             dropdown.classList.toggle("show");

//         });

//         document.addEventListener("click", function () {

//             dropdown.classList.remove("show");

//         });

//     }

//     // Modal Overlay 
//     const modalOverlay = document.getElementById("modalOverlay");

//     const modalTitle = document.getElementById("modalTitle");

//     const modalText = document.getElementById("modalText");

//     const modalOk = document.getElementById("modalOk");

//     const modalCancel = document.getElementById("modalCancel");

//     const modalConfirm = document.getElementById("modalConfirm");

//     let confirmAction = null;

//     function showModal(title, text) {

//         modalTitle.textContent = title;

//         modalText.textContent = text || "";

//         modalOk.classList.remove("hidden");

//         modalCancel.classList.add("hidden");

//         modalConfirm.classList.add("hidden");

//         modalOverlay.classList.add("show");

//         modalOverlay.classList.remove("hidden");

//     }

//     function showConfirmModal(title, text, onConfirm) {

//         modalTitle.textContent = title;

//         modalText.textContent = text;

//         confirmAction = onConfirm;

//         modalOk.classList.add("hidden");

//         modalCancel.classList.remove("hidden");

//         modalConfirm.classList.remove("hidden");

//         modalOverlay.classList.add("show");

//         modalOverlay.classList.remove("hidden");

//     }

//     function closeModal() {

//         modalOverlay.classList.remove("show");

//         setTimeout(() => modalOverlay.classList.add("hidden"), 200);

//     }

//     if (modalOk) modalOk.addEventListener("click", closeModal);

//     if (modalCancel) modalCancel.addEventListener("click", closeModal);

//     if (modalConfirm) {

//         modalConfirm.addEventListener("click", () => {

//             closeModal();

//             if (confirmAction) confirmAction();

//         });

//     }

//     if (modalOverlay) {

//         modalOverlay.addEventListener("click", (e) => {

//             if (e.target === modalOverlay) closeModal();

//         });

//     }

//     // About
//     const aboutBtn = document.getElementById("aboutBtn");

//     if (aboutBtn) {

//         aboutBtn.addEventListener("click", () => {

//             showModal(`About Noir 🐈‍⬛  

//                 Noir is a cozy virtual pet game where you take care of a mysterious little cat.  

//                 Feed Noir when hungry, pet to keep happiness high, and play when energy allows.  

//                 As time passes, Noir’s needs slowly change, so check in often to keep your cat healthy and happy.  

//                 The game features background music, sound effects, animations, and a save system so players can continue anytime.  

//                 This project was made as a creative interactive game to practice web development and design. Hope you guys enjoy!`);

//         });

//     }

// });