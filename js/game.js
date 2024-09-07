const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 设置画布大小
canvas.width = 800;
canvas.height = 600;

// 定义卦象
const hexagrams = [
    "乾卦", "坤卦", "屯卦", "蒙卦", "需卦", "讼卦", "师卦", "比卦",
    // ... 其他卦象
];

// 游戏状态
let currentHexagram = "";
let isAnimating = false;
let showIntro = true;
let activePage = 'divination';

// 广告相关变量
let adInstance;
let adSDKLoaded = false;
let adSDKFailed = false;
let adLoadAttempts = 0;
const MAX_AD_LOAD_ATTEMPTS = 3;

// 加载 Adsgram SDK
function loadAdSDK() {
    if (adLoadAttempts >= MAX_AD_LOAD_ATTEMPTS) {
        adSDKFailed = true;
        console.error('Max attempts reached. Ad service is unavailable.');
        return;
    }

    const script = document.createElement('script');
    script.src = 'https://sad.adsgram.ai/js/sad.min.js';
    script.async = true;

    let timeoutId = setTimeout(() => {
        script.onerror(new Error('Timeout'));
    }, 10000);

    script.onload = () => {
        clearTimeout(timeoutId);
        console.log('Adsgram SDK script loaded successfully');
        adSDKLoaded = true;
        initAdsgram();
    };

    script.onerror = (error) => {
        clearTimeout(timeoutId);
        console.error('Failed to load Adsgram SDK:', error);
        adLoadAttempts++;
        if (adLoadAttempts < MAX_AD_LOAD_ATTEMPTS) {
            console.log(`Retrying to load SDK. Attempt ${adLoadAttempts + 1} of ${MAX_AD_LOAD_ATTEMPTS}`);
            setTimeout(loadAdSDK, 5000);
        } else {
            adSDKFailed = true;
            console.error('Max attempts reached. Ad service is unavailable.');
        }
    };

    document.head.appendChild(script);
}

// 获取 Telegram 用户 ID
function getTelegramUserId() {
    if (window.Telegram && window.Telegram.WebApp) {
        const user = window.Telegram.WebApp.initDataUnsafe.user;
        if (user && user.id) {
            console.log('Telegram user ID obtained:', user.id);
            return user.id.toString();
        }
    }
    console.warn('Telegram user ID not available. Using default test ID.');
    return 'test_user_123';
}

let userTelegramId = getTelegramUserId();

// 初始化 Adsgram SDK
function initAdsgram() {
    if (window.Adsgram) {
        try {
            adInstance = window.Adsgram.init({
                blockId: "2818",
                rewardUrl: `https://test.adsgram.ai/reward?userid=${userTelegramId}`
            });
            console.log('Adsgram initialized successfully');
        } catch (error) {
            console.error('Error initializing Adsgram:', error);
            adSDKFailed = true;
            showErrorMessage('Failed to initialize ad service. Please try again later.');
        }
    } else {
        console.error('Adsgram SDK not available');
        showErrorMessage('Ad service is not available. Please try again later.');
    }
}

// 显示广告
function showAd() {
    console.log('showAd function called');
    if (adInstance) {
        adInstance.show().then((result) => {
            console.log('Ad watched successfully');
            onReward();
        }).catch((result) => {
            console.error('Ad error:', result);
            onError(result);
        });
    } else {
        showErrorMessage('Ad service is not available. Please try again later.');
    }
}

function onReward() {
    console.log('Reward received');
    showRewardMessage();
}

function onError(result) {
    console.error('Ad error:', result);
    showErrorMessage(result.description || 'An error occurred with the ad');
}

// UI 绘制函数
function drawBackground() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawText(text, x, y, fontSize = 30, color = "#fff") {
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.fillText(text, x, y);
}

function drawButton(text, x, y, width, height) {
    ctx.fillStyle = "#4CAF50";
    ctx.fillRect(x, y, width, height);
    drawText(text, x + width / 2, y + height / 2 + 10, 20, "#fff");
}

function showRewardMessage() {
    drawText("Reward received!", canvas.width / 2, canvas.height / 2, 30, "#FFD700");
}

function showErrorMessage(message = 'An error occurred. Please try again.') {
    drawText(message, canvas.width / 2, canvas.height / 2, 30, "#FF0000");
}

// 动画效果
function animate() {
    if (!isAnimating) return;
    
    const randomIndex = Math.floor(Math.random() * hexagrams.length);
    currentHexagram = hexagrams[randomIndex];
    
    setTimeout(() => {
        requestAnimationFrame(animate);
    }, 100);
}

// 开始算卦
function startDivination() {
    isAnimating = true;
    animate();
    setTimeout(() => {
        isAnimating = false;
    }, 2000);
}

// 页面绘制函数
function drawTasksPage() {
    drawText("任务页面", canvas.width / 2, canvas.height / 2, 40);
    // TODO: 添加任务页面的具体内容
}

function drawDivinationPage() {
    if (showIntro) {
        drawText("Taiji Divination", canvas.width / 2, 50, 40);
        introText.forEach((line, i) => {
            drawText(line, canvas.width / 2, 100 + i * 30, 16);
        });
        drawButton("Start Divination", 300, 500, 200, 50);
    } else {
        drawText("Taiji Divination", canvas.width / 2, 100, 40);
        drawText(currentHexagram, canvas.width / 2, 250, 60);
        drawButton("Start Divination", 300, 400, 200, 50);
        drawButton("Watch Ad", 300, 470, 200, 50);
    }
}

function drawStorePage() {
    drawText("商店页面", canvas.width / 2, canvas.height / 2, 40);
    // TODO: 添加商店页面的具体内容
}

function drawInvitePage() {
    drawText("邀请页面", canvas.width / 2, canvas.height / 2, 40);
    // TODO: 添加邀请页面的具体内容
}

function drawBottomNav() {
    const buttonWidth = canvas.width / 4;
    const buttonHeight = 50;
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
        drawText(button.text, x + buttonWidth / 2, y + buttonHeight / 2, 20, "#fff");
    });
}

// 游戏主循环
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();

    switch (activePage) {
        case 'tasks': drawTasksPage(); break;
        case 'divination': drawDivinationPage(); break;
        case 'store': drawStorePage(); break;
        case 'invite': drawInvitePage(); break;
    }

    drawBottomNav();

    if (adSDKFailed) {
        drawText("广告服务暂时不可用", canvas.width / 2, 550, 20, "#FF0000");
    } else if (!adSDKLoaded) {
        drawText("正在加载广告服务...", canvas.width / 2, 550, 20, "#FFFF00");
    }

    if (!adInstance) {
        drawText("Ad service not initialized", canvas.width / 2, 570, 20, "#FFFF00");
    }

    requestAnimationFrame(gameLoop);
}

// 事件监听
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    if (y >= canvas.height - 50) {
        const buttonWidth = canvas.width / 4;
        const clickedButton = Math.floor(x / buttonWidth);
        const pages = ["tasks", "divination", "store", "invite"];
        activePage = pages[clickedButton];
        return;
    }

    if (activePage === 'divination') {
        if (showIntro) {
            if (x >= 300 && x <= 500 && y >= 500 && y <= 550) {
                showIntro = false;
            }
        } else {
            if (x >= 300 && x <= 500 && y >= 400 && y <= 450) {
                startDivination();
            } else if (x >= 300 && x <= 500 && y >= 470 && y <= 520) {
                console.log('Watch Ad button clicked');
                showAd();
            }
        }
    }
});

// 介绍文本
const introText = [
    "Unlock Ancient Wisdom, Glimpse Your Future!",
    "Welcome to 'Taiji Divination,' a unique mini-game",
    "that blends traditional I Ching wisdom with modern technology.",
    "",
    "🔮 Experience mystical hexagram drawing",
    "🌟 Receive cosmic guidance",
    "🎭 Uncover life's joys and sorrows",
    "",
    "Every click is a dialogue with destiny.",
    "Let the power of Taiji guide you and reveal hidden truths in your life.",
    "",
    "Are you ready? Click 'Start Divination' to begin!",
    "",
    "Note: This game is for entertainment purposes only.",
    "Please approach divination results rationally."
];

// 初始化
window.addEventListener('load', () => {
    console.log('Window loaded, initializing game');
    loadAdSDK();
    gameLoop();
});