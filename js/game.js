const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let scale;
const DESIGN_WIDTH = 450;
const DESIGN_HEIGHT = 800;

let activePage = 'divination';
let isAnimating = false;
let currentHexagram = "";

const hexagrams = [
    "乾卦", "坤卦", "屯卦", "蒙卦", "需卦", "讼卦", "师卦", "比卦",
    // ... 其他卦象
];

function resizeCanvas() {
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    const containerRatio = containerWidth / containerHeight;
    const gameRatio = DESIGN_WIDTH / DESIGN_HEIGHT;

    if (containerRatio > gameRatio) {
        canvas.height = containerHeight;
        canvas.width = containerHeight * gameRatio;
    } else {
        canvas.width = containerWidth;
        canvas.height = containerWidth / gameRatio;
    }

    scale = Math.min(canvas.width / DESIGN_WIDTH, canvas.height / DESIGN_HEIGHT);
    console.log(`Canvas resized. Width: ${canvas.width}, Height: ${canvas.height}, Scale: ${scale}`);
}

function drawBackground() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawBottomNav() {
    const buttonWidth = canvas.width / 4;
    const buttonHeight = 50 * scale;
    const y = canvas.height - buttonHeight;

    const buttons = [
        { text: "任务", page: "tasks" },
        { text: "算卦", page: "divination" },
        { text: "商店", page: "store" },
        { text: "邀请", page: "invite" }
    ];

    buttons.forEach((button, index) => {
        const x = index * buttonWidth;
        ctx.fillStyle = activePage === button.page ? "#4CAF50" : "#333";
        ctx.fillRect(x, y, buttonWidth, buttonHeight);
        ctx.fillStyle = "#fff";
        ctx.font = `${16 * scale}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(button.text, x + buttonWidth / 2, y + buttonHeight / 2);
    });
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();

    ctx.save();
    ctx.scale(scale, scale);
    const offsetX = (canvas.width / scale - DESIGN_WIDTH) / 2;
    const offsetY = (canvas.height / scale - DESIGN_HEIGHT) / 2;
    ctx.translate(offsetX, offsetY);

    switch (activePage) {
        case 'tasks': drawTasksPage(ctx, DESIGN_WIDTH, DESIGN_HEIGHT); break;
        case 'divination': drawDivinationPage(ctx, DESIGN_WIDTH, DESIGN_HEIGHT); break;
        case 'store': StorePage.drawStorePage(ctx, DESIGN_WIDTH, DESIGN_HEIGHT); break;
        case 'invite': InvitePage.drawInvitePage(ctx, DESIGN_WIDTH, DESIGN_HEIGHT); break;
    }

    ctx.restore();

    drawBottomNav();

    requestAnimationFrame(gameLoop);
}

function startDivination() {
    console.log("Starting divination");
    isAnimating = true;
    currentHexagram = "";
    animate();
    setTimeout(() => {
        isAnimating = false;
        console.log("Divination ended, final hexagram:", currentHexagram);
    }, 5000);
}

function animate() {
    if (!isAnimating) return;
    const randomIndex = Math.floor(Math.random() * hexagrams.length);
    currentHexagram = hexagrams[randomIndex];
    console.log("Current hexagram:", currentHexagram);
    setTimeout(() => requestAnimationFrame(animate), 200);
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) * (DESIGN_WIDTH / rect.width);
    const y = (event.clientY - rect.top) * (DESIGN_HEIGHT / rect.height);
    
    console.log(`Click detected at x: ${x}, y: ${y}`);

    if (y >= DESIGN_HEIGHT - 50) {
        const buttonWidth = DESIGN_WIDTH / 4;
        const clickedButton = Math.floor(x / buttonWidth);
        const pages = ["tasks", "divination", "store", "invite"];
        activePage = pages[clickedButton];
        console.log(`Switched to page: ${activePage}`);
    } else {
        console.log(`Handling click for page: ${activePage}`);
        switch (activePage) {
            case 'tasks': handleTasksPageClick(x, y, DESIGN_WIDTH, DESIGN_HEIGHT); break;
            case 'divination': handleDivinationPageClick(x, y, DESIGN_WIDTH, DESIGN_HEIGHT); break;
            case 'store': StorePage.handleStorePageClick(x, y, DESIGN_WIDTH, DESIGN_HEIGHT); break;
            case 'invite': InvitePage.handleInvitePageClick(x, y, DESIGN_WIDTH, DESIGN_HEIGHT); break;
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    if (!document.getElementById('gameCanvas')) {
        console.error('gameCanvas element not found in the DOM');
        return;
    }
    resizeCanvas();
    loadAdSDK();
    gameLoop();
});

window.addEventListener('load', () => {
    console.log('Window loaded, initializing game');
    resizeCanvas();
});

window.addEventListener('resize', () => {
    console.log('Window resized. Adjusting canvas.');
    resizeCanvas();
});