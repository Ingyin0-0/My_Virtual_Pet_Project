document.addEventListener("DOMContentLoaded", function () {

    let bgMusic;

    if (window.location.pathname.includes("home.html")) {

        bgMusic = new Audio("assets/music.mp3");

    } else if (window.location.pathname.includes("story.html")) {

        bgMusic = new Audio("assets/rainy.mp3");

    } else if (window.location.pathname.includes("play.html")) {

        bgMusic = new Audio("assets/home.mp3");

    }

    if (!bgMusic) return;

    bgMusic.volume = 0.15;

    bgMusic.loop = true;

    bgMusic.preload = "auto";

    let musicOn = false;

    function startMusicOnce() {

        if (!musicOn) {

            bgMusic.play().catch(() => { });

            musicOn = true;

            const musicToggle = document.getElementById("musicToggle");

            if (musicToggle) {

                musicToggle.innerHTML = `<i class="fa-solid fa-music"></i> Music: ON`;

            }

        } document.removeEventListener("click", startMusicOnce);

    }

    document.addEventListener("click", startMusicOnce);

    // Music toggle
    const musicToggle = document.getElementById("musicToggle");

    if (musicToggle) {

        musicToggle.addEventListener("click", (e) => {

            e.stopPropagation();

            if (musicOn) {

                bgMusic.pause();

                musicOn = false;

            } else {

                bgMusic.play().catch(() => { });

                musicOn = true;

            }

            musicToggle.innerHTML =

                `<i class="fa-solid fa-music"></i> Music: ${musicOn ? "ON" : "OFF"}`;

        });

    }

    const meowSfx = new Audio("assets/meow.wav");

    meowSfx.volume = 0.2;

    meowSfx.preload = "auto";

    let sfxOn = true;

    function playMeow() {

        if (sfxOn) {

            meowSfx.currentTime = 0;

            meowSfx.play().catch(() => { });

        }

    }

    // SFX toggle
    const sfxToggle = document.getElementById("sfxToggle");

    if (sfxToggle) {

        sfxToggle.addEventListener("click", () => {

            sfxOn = !sfxOn;

            sfxToggle.innerHTML =

                `<i class="fa-solid fa-volume-high"></i> SFX: ${sfxOn ? "ON" : "OFF"}`;

        });

    }

    // Meow for buttons 
    document.addEventListener("click", function (e) {

        if (e.target.closest("#feedBtn, #petBtn, #playBtn, #choiceBtn")) {

            playMeow();

        }

    });

    // Dropdown
    const settingBtn = document.getElementById("settingBtn");

    const dropdown = document.querySelector(".dropdown-content");

    if (settingBtn && dropdown) {

        settingBtn.addEventListener("click", function (event) {

            event.stopPropagation();

            dropdown.classList.toggle("show");

        });

        document.addEventListener("click", function () {

            dropdown.classList.remove("show");

        });

    }

    // Story Lines
    const storyLines = [

        `“Why is the rain so heavy today…?”`,

        `The sky rumbles above you as cold droplets soak through your clothes.`,

        `The streets are nearly empty, the sound of rain echoing against stone and pavement.`,

        `You tighten your jacket and continue walking home.`,

        `Then—`,

        `Something catches your eye.`,

        `Near the side of the road, beside the old stone steps, sits a small cardboard box.`,

        `The rain pours over it mercilessly.`,

        `On the side of the box, written in fading ink, is a single name:

"Noir."`,

        `You pause.`,

        `Did it just move?`,

        `You step closer.`,

        `Two tiny black ears peek over the edge of the box.`,

        `And then—`,

        `A pair of round, golden eyes look up at you.`,

        `A small black cat, shivering quietly in the rain.`,

        `It doesn’t run.`,

        `It doesn’t hiss.`,

        `It just… looks at you and meows.`,

        `Waiting.`,

        `Your chest tightens.`,

        `You can’t just leave it here.`,

        `Not in this weather.`,

        `Not like this.`,

        `The rain grows heavier.`,

        `The little cat blinks slowly.`,

        `As if asking you something.`,

        `You hesitate…`,

        `But your heart has already decided.`

    ];

    let currentLine = 0;

    let isTyping = false;

    let gameStarted = false;

    const storyText = document.getElementById("storyText");

    if (storyText) {

        const nextBtn = document.getElementById("nextBtn");

        const choiceBtn = document.getElementById("choiceBtn");

        const container = document.querySelector(".container");

        // Typing Effect
        function typeWriter(text, speed = 30) {

            isTyping = true;

            storyText.innerHTML = "";

            let i = 0;

            function typing() {

                if (i < text.length) {

                    storyText.innerHTML += text.charAt(i);

                    i++;

                    setTimeout(typing, speed);

                } else {

                    isTyping = false;

                }

            }

            typing();

        }

        function showLine() {

            typeWriter(storyLines[currentLine]);

        }

        // Music plays when game started
        document.addEventListener("click", () => {

            if (!gameStarted) {

                container.classList.remove("hidden");

                gameStarted = true;

                bgMusic.play().catch(() => { });

                showLine();

            }

        });

        // Next Button
        nextBtn.addEventListener("click", (e) => {

            e.stopPropagation();

            if (isTyping) return;

            currentLine++;

            if (currentLine < storyLines.length) {

                showLine();

            } else {

                nextBtn.style.display = "none";

                choiceBtn.style.display = "block";

            }

        });

        // Choice
        choiceBtn.addEventListener("click", () => {

            setTimeout(() => {

                window.location.href = "play.html";

            }, 800);

        });

        // Modal Overlay 
        const modalOverlay = document.getElementById("modalOverlay");

        const modalTitle = document.getElementById("modalTitle");

        const modalText = document.getElementById("modalText");

        const modalOk = document.getElementById("modalOk");

        function showModal(title, text) {

            if (!modalOverlay) return;

            modalTitle.textContent = title;

            modalText.textContent = text;

            modalOverlay.classList.add("show");

            modalOverlay.classList.remove("hidden");

        }

        function closeModal() {

            modalOverlay.classList.remove("show");

            setTimeout(() => {

                modalOverlay.classList.add("hidden");

            }, 250);

        }

        modalOk.addEventListener("click", closeModal);

        // close when clicking outside the box 
        modalOverlay.addEventListener("click", (e) => {

            if (e.target === modalOverlay) closeModal();

        });

        // About
        const aboutBtn = document.getElementById("aboutBtn");

        if (aboutBtn) {

            aboutBtn.addEventListener("click", () => {

                showModal(`About Noir 🐈‍⬛,  

                Noir is a cozy virtual pet game where you take care of a mysterious little cat.  

                Feed Noir when hungry, pet to keep happiness high, and play when energy allows.  

                As time passes, Noir’s needs slowly change, so check in often to keep your cat healthy and happy.  

                The game features background music, sound effects, animations, and a save system so players can continue anytime.  

                This project was made as a creative interactive game to practice web development and design. Hope you guys enjoy!`);

            });

        }

    };

});