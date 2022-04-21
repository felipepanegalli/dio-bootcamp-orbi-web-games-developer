const dino = document.querySelector(".dino");
const background = document.querySelector(".background");
let isJumping = false;
let position = 10;

const handleKeydown = (e) => {
    if (e.keyCode === 32) {
        if (!isJumping) jump();
    }
};

const jump = () => {
    isJumping = true;
    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                if (position <= 10) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + "px";
                }
            }, 50);
        } else {
            position += 20;
            dino.style.bottom = position + "px";
        }
    }, 50);
};

const createCactus = () => {
    const cactus = document.createElement("div");
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    cactus.classList.add("cactus");
    cactus.style.left = 1000 + "px";
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if (cactusPosition <= -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo!</h1>';
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + "px";
        }
    }, 20);

    setTimeout(createCactus, randomTime);
};

createCactus();
document.addEventListener("keydown", handleKeydown);
