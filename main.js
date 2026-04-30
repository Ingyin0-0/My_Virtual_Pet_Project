document.addEventListener("DOMContentLoaded", function () {

    let bgMusic;

    if (window.location.pathname.includes("index.html")) {

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

    // Start Button
    const startBtn = document.getElementById("startBtn");

    if (startBtn) {

        startBtn.addEventListener("click", function (e) {

            e.stopPropagation();

            playMeow();

            setTimeout(() => {

                const savedGame = localStorage.getItem("noirGame");

                if (savedGame) {

                    showConfirmModal(

                        "Do you want to start over and lose your saved progress?",

                        "This will delete your save.",

                        () => {

                            localStorage.removeItem("noirGame");

                            window.location.href = "story.html";

                        }

                    );

                } else {

                    window.location.href = "story.html";

                }

            }, 800);

        });

    }

    // Continue Button 
    const continueBtn = document.getElementById("continueBtn");

    if (continueBtn) {

        const savedGame = localStorage.getItem("noirGame");

        if (!localStorage.getItem("noirGame")) {

            continueBtn.disabled = true;

            continueBtn.title = "No saved game found.";

        } else {

            continueBtn.disabled = false;

            continueBtn.title = "";

        }

        continueBtn.addEventListener("click", function (e) {

            e.stopPropagation();

            playMeow();

            const lastestSave = localStorage.getItem("noirGame");

            if (!lastestSave) {

                showModal("No saved game found.");

                return;

            }

            setTimeout(() => {

                window.location.href = "play.html";

            }, 800);

        });

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

    // Modal Overlay 
    const modalOverlay = document.getElementById("modalOverlay");

    const modalTitle = document.getElementById("modalTitle");

    const modalText = document.getElementById("modalText");

    const modalOk = document.getElementById("modalOk");

    const modalCancel = document.getElementById("modalCancel");

    const modalConfirm = document.getElementById("modalConfirm");

    let confirmAction = null;

    function showModal(title, text) {

        modalTitle.textContent = title;

        modalText.textContent = text || "";

        modalOk.classList.remove("hidden");

        modalCancel.classList.add("hidden");

        modalConfirm.classList.add("hidden");

        modalOverlay.classList.add("show");

        modalOverlay.classList.remove("hidden");

    }

    function showConfirmModal(title, text, onConfirm) {

        modalTitle.textContent = title;

        modalText.textContent = text;

        confirmAction = onConfirm;

        modalOk.classList.add("hidden");

        modalCancel.classList.remove("hidden");

        modalConfirm.classList.remove("hidden");

        modalOverlay.classList.add("show");

        modalOverlay.classList.remove("hidden");

    }

    function closeModal() {

        modalOverlay.classList.remove("show");

        setTimeout(() => modalOverlay.classList.add("hidden"), 200);

    }

    if (modalOk) modalOk.addEventListener("click", closeModal);

    if (modalCancel) modalCancel.addEventListener("click", closeModal);

    if (modalConfirm) {

        modalConfirm.addEventListener("click", () => {

            closeModal();

            if (confirmAction) confirmAction();

        });

    }

    if (modalOverlay) {

        modalOverlay.addEventListener("click", (e) => {

            if (e.target === modalOverlay) closeModal();

        });

    }

    // About
    const aboutBtn = document.getElementById("aboutBtn");

    if (aboutBtn) {

        aboutBtn.addEventListener("click", () => {

            showModal(`About Noir 🐈‍⬛  

                Noir is a cozy virtual pet game where you take care of a mysterious little cat.  

                Feed Noir when hungry, pet to keep happiness high, and play when energy allows.  

                As time passes, Noir’s needs slowly change, so check in often to keep your cat healthy and happy.  

                The game features background music, sound effects, animations, and a save system so players can continue anytime.  

                This project was made as a creative interactive game to practice web development and design. Hope you guys enjoy!`);

        });

    }

});

document.addEventListener("DOMContentLoaded", function () {

    let bgMusic;

    if (window.location.pathname.includes("index.html")) {

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

    // Enable Continue if save exists
    saveBtn.addEventListener("click", function () {

        showConfirmModal("Do you want to save the progress?",

            function () {

                closeModal();

                setTimeout(() => {

                    const gameData = {

                        hunger: hunger,

                        happiness: happiness,

                        energy: energy

                    };

                    localStorage.setItem("noirGame", JSON.stringify(gameData));

                    showModal("Game saved successfully!");

                }, 250);

            });

    });

    // Exit Button
    exitBtn.addEventListener("click", function () {

        showConfirmModal(

            "Are you sure you want to exit?",

            function () {

                window.location.href = "index.html";

            }

        );

    });

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

    const startBtn = document.getElementById("startBtn");

    if (startBtn) {

        startBtn.addEventListener("click", function () {

            setTimeout(() => {

                window.location.href = "story.html";

            }, 800);

        });

    }

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

    // Game - Area
    let hunger = 1;

    let happiness = 1;

    let energy = 2;

    let hungerWarning = false;

    let happinessWarning = false;

    let energyWarning = false;

    // Saved Game
    const savedGame = localStorage.getItem("noirGame");

    if (savedGame) {

        const gameData = JSON.parse(savedGame);

        hunger = gameData.hunger;

        happiness = gameData.happiness;

        energy = gameData.energy;

    }

    const MAX_LEVEL = 5;

    const MIN_LEVEL = 0;

    const hungerBar = document.getElementById("hungerBar");

    const happyBar = document.getElementById("happyBar");

    const playBar = document.getElementById("playBar");

    const feedBtn = document.getElementById("feedBtn");

    const petBtn = document.getElementById("petBtn");

    const playBtn = document.getElementById("playBtn");

    function updateBars() {

        hungerBar.innerHTML = "";

        happyBar.innerHTML = "";

        playBar.innerHTML = "";

        for (let i = 0; i < MAX_LEVEL; i++) {

            hungerBar.innerHTML +=

                `<i class="fa-solid fa-fish" style="opacity:${i < hunger ? 1 : 0.2}"></i>`;

            happyBar.innerHTML +=

                `<i class="fa-solid fa-heart" style="opacity:${i < happiness ? 1 : 0.2}"></i>`;

            playBar.innerHTML +=

                `<i class="fa-solid fa-bolt" style="opacity:${i < energy ? 1 : 0.2}"></i>`;

        }

    }

    updateBars();

    setInterval(function () {

        // Hunger
        if (hunger > MIN_LEVEL) {

            hunger--;

            if (hunger === MIN_LEVEL && !hungerWarning) {

                showModal("Noir is starving...");

                hungerWarning = true;

            }

        }

        // Happiness
        if (happiness > MIN_LEVEL) {

            happiness--;

            if (happiness === MIN_LEVEL && !happinessWarning) {

                showModal("Noir looks sad...");

                happinessWarning = true;

            }

        }

        // Energy
        if (energy < MAX_LEVEL) {

            energy++;

            if (energy === MAX_LEVEL && !energyWarning) {

                showModal("Noir is full of energy!");

                energyWarning = true;

            }

        }

        updateBars();

    }, 60000);

    feedBtn.addEventListener("click", function () {

        playMeow();

        if (hunger >= MAX_LEVEL) {

            showModal("Noir is full.");

            sleepCat(5000);

            return;

        }

        hunger++;

        hungerWarning = false;

        updateBars();

        playTempAnim(feedFrames, 3000);

    });

    petBtn.addEventListener("click", function () {

        playMeow();

        if (happiness >= MAX_LEVEL) {

            showModal("Noir is very happy");

            playTempAnim(["assets/cat8.png"], 3000);

            return;

        }

        happiness++;

        happinessWarning = false;

        updateBars();

        playTempAnim(petFrames, 2000);

    });

    playBtn.addEventListener("click", function () {

        playMeow();

        if (energy <= MIN_LEVEL) {

            showModal("Noir is too tired to play.");

            sleepCat(5000);

            return;

        }

        energy--;

        energyWarning = false;

        updateBars();

        playTempAnim(playFrames, 3000);

    });

    // Modal Overlay 
    const modalOverlay = document.getElementById("modalOverlay");

    const modalTitle = document.getElementById("modalTitle");

    const modalText = document.getElementById("modalText");

    const modalOk = document.getElementById("modalOk");

    const modalCancel = document.getElementById("modalCancel");

    const modalConfirm = document.getElementById("modalConfirm");

    let confirmAction = null;

    function showModal(text) {

        modalTitle.textContent = "";

        modalText.textContent = text;

        modalOk.classList.remove("hidden");

        modalCancel.classList.add("hidden");

        modalConfirm.classList.add("hidden");

        modalOverlay.classList.add("show");

        modalOverlay.classList.remove("hidden");

    }

    function showConfirmModal(text, onConfirm) {

        confirmAction = onConfirm;

        modalTitle.textContent = "";

        modalText.textContent = text;

        modalOk.classList.add("hidden");

        modalCancel.classList.remove("hidden");

        modalConfirm.classList.remove("hidden");

        modalOverlay.classList.add("show");

        modalOverlay.classList.remove("hidden");

    }

    function closeModal() {

        modalOverlay.classList.remove("show");

        setTimeout(() => modalOverlay.classList.add("hidden"), 200);

    }

    modalOk.addEventListener("click", closeModal);

    modalCancel.addEventListener("click", closeModal);

    modalConfirm.addEventListener("click", () => {

        if (confirmAction) confirmAction();

    });

    modalOverlay.addEventListener("click", (e) => {

        if (e.target === modalOverlay) closeModal();

    });

    // About
    const aboutBtn = document.getElementById("aboutBtn");

    if (aboutBtn) {

        aboutBtn.addEventListener("click", () => {

            showModal(`About Noir 🐈‍⬛  

                Noir is a cozy virtual pet game where you take care of a mysterious little cat.  
                
                Feed Noir when hungry, pet to keep happiness high, and play when energy allows.  

                As time passes, Noir’s needs slowly change, so check in often to keep your cat healthy and happy.  

                The game features background music, sound effects, animations, and a save system so players can continue anytime.  

                This project was made as a creative interactive game to practice web development and design. Hope you guys enjoy!`);

        });

    }

    const cat = document.getElementById("cat");

    // CSS Animation Frames
    const catFrames = document.getElementById("cat-fram");

    const walkFrames = ["assets/1cat.png", "assets/3cat.png"];

    const feedFrames = ["assets/cat7.png", "assets/eat.png"];

    const petFrames = ["assets/heart1.png", "assets/heart.png"];

    const playFrames = ["assets/cat11.png", "assets/cat10.png"];

    const sleepFrame = "assets/cat3.png";

    let walkIndex = 0;

    let direction = 1;

    let posX = 10;

    let walkInterval;

    let animTimeout;

    let isAnimating = false;

    // Cat Walking Animation
    function startWalking() {

        clearInterval(walkInterval);

        const catFrame = document.getElementById("cat-frame");

        walkInterval = setInterval(() => {

            cat.src = walkFrames[walkIndex];

            walkIndex = (walkIndex + 1) % walkFrames.length;

            posX += direction * 2;

            catFrame.style.left = posX + "%";

            if (posX > 75) direction = -1;

            if (posX < 5) direction = 1;

            cat.style.transform = direction === 1 ? "scaleX(1)" : "scaleX(-1)";

        }, 500);

    }

    // Temporary Animation
    function playTempAnim(frames, duration) {

        if (isAnimating) return;

        isAnimating = true;

        feedBtn.disabled = true;

        petBtn.disabled = true;

        playBtn.disabled = true;

        clearInterval(walkInterval);

        clearTimeout(animTimeout);

        let i = 0;

        const tempInterval = setInterval(() => {

            cat.src = frames[i % frames.length];

            i++;

        }, 400);

        animTimeout = setTimeout(() => {

            clearInterval(tempInterval);

            isAnimating = false;

            feedBtn.disabled = false;

            petBtn.disabled = false;

            playBtn.disabled = false;

            startWalking();

        }, duration);

    }

    // Sleep Animation
    function sleepCat(duration = 5000) {

        if (isAnimating) return;

        isAnimating = true;

        feedBtn.disabled = true;

        petBtn.disabled = true;

        playBtn.disabled = true;

        clearInterval(walkInterval);

        cat.src = sleepFrame;

        animTimeout = setTimeout(() => {

            isAnimating = false;

            feedBtn.disabled = false;

            petBtn.disabled = false;

            playBtn.disabled = false;

            startWalking();

        }, duration);

    }

    // Start Walking when page loads
    startWalking();

});

document.addEventListener("DOMContentLoaded", function () {

    let bgMusic;

    if (window.location.pathname.includes("index.html")) {

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