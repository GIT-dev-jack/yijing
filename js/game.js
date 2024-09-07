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

// 添加Adsgram SDK
let adInstance;
let adSDKLoaded = false;
let adSDKFailed = false;
let adLoadAttempts = 0;
const MAX_AD_LOAD_ATTEMPTS = 3;

// 添加Adsgram SDK
function loadAdSDK() {
    if (adLoadAttempts >= MAX_AD_LOAD_ATTEMPTS) {
        adSDKFailed = true;
        console.error('Max attempts reached. Ad service is unavailable.');
        return;
    }

    const script = document.createElement('script');
    script.src = 'https://sad.adsgram.ai/js/sad.min.js'; // 使用您在 HTML 中提供的 URL
    script.async = true;

    let timeoutId;

    script.onload = () => {
        clearTimeout(timeoutId);
        console.log('Adsgram SDK script loaded successfully');
        adSDKLoaded = true;
        initAdsgram();
    };

    script.onerror = (error) => {
        clearTimeout(timeoutId);
        console.error('Failed to load Adsgram SDK:', error);
        console.log('Script src:', script.src);
        console.log('Network status:', navigator.onLine ? 'Online' : 'Offline');
        adLoadAttempts++;
        if (adLoadAttempts < MAX_AD_LOAD_ATTEMPTS) {
            console.log(`Retrying to load SDK. Attempt ${adLoadAttempts + 1} of ${MAX_AD_LOAD_ATTEMPTS}`);
            setTimeout(loadAdSDK, 5000); // 5秒后重试
        } else {
            adSDKFailed = true;
            console.error('Max attempts reached. Ad service is unavailable.');
        }
    };

    timeoutId = setTimeout(() => {
        script.onerror(new Error('Timeout'));
    }, 10000); // 10秒超时

    document.head.appendChild(script);
}

// 在页面加载完成后加载 SDK
window.addEventListener('load', () => {
    console.log('Window loaded, attempting to load Adsgram SDK');
    loadAdSDK();
});

// 在文件顶部添加这个函数
function getTelegramUserId() {
    if (window.Telegram && window.Telegram.WebApp) {
        const user = window.Telegram.WebApp.initDataUnsafe.user;
        if (user && user.id) {
            console.log('Telegram user ID obtained:', user.id);
            return user.id.toString();
        }
    }
    console.warn('Telegram user ID not available. Using default test ID.');
    return 'test_user_123'; // 默认测试 ID
}

// 替换现有的 userTelegramId 声明
let userTelegramId = getTelegramUserId();

// 在 initializeAdSDK 函数中使用这个 ID
function initializeAdSDK() {
    if (adSDKLoaded && typeof Adsgram !== 'undefined') {
        console.log('Initializing Adsgram SDK');
        try {
            adInstance = new Adsgram.Instance({
                blockId: '2818',
                rewardUrl: `https://test.adsgram.ai/reward?userid=${userTelegramId}`
            });
            console.log('Adsgram SDK initialized successfully');
        } catch (error) {
            console.error('Error initializing Adsgram SDK:', error);
            adSDKFailed = true;
            showErrorMessage('Failed to initialize ad service. Please try again later.');
        }
    } else if (!adSDKFailed) {
        console.log('Adsgram SDK not ready, retrying in 1 second');
        setTimeout(initializeAdSDK, 1000);
    }
}

// 显示广告的函数
function showAd() {
    console.log('showAd function called');
    showErrorMessage('广告功能暂时不可用。请稍后再试。');
    // ... 其余代码保持不变
}

function showRewardMessage() {
    // 实现显示奖励消息的逻辑
    drawText("Reward received!", canvas.width / 2, canvas.height / 2, 30, "#FFD700");
}

function showErrorMessage(message = 'An error occurred. Please try again.') {
    // 实现显示错误消息的逻辑
    drawText(message, canvas.width / 2, canvas.height / 2, 30, "#FF0000");
}

// 绘制背景
function drawBackground() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// 绘制文本
function drawText(text, x, y, fontSize = 30, color = "#fff") {
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.fillText(text, x, y);
}

// 绘制按钮
function drawButton(text, x, y, width, height) {
    ctx.fillStyle = "#4CAF50";
    ctx.fillRect(x, y, width, height);
    drawText(text, x + width / 2, y + height / 2 + 10, 20, "#fff");
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

// 检查鼠标点击
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    if (showIntro) {
        if (x >= 300 && x <= 500 && y >= 550 && y <= 600) {
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
});

// 添加 Adsgram 相关代码
let AdController;

// 初始化 Adsgram SDK
function initAdsgram() {
    if (window.Adsgram) {
        try {
            AdController = window.Adsgram.init({ blockId: "2818" }); // 使用您的实际 blockId
            console.log('Adsgram initialized successfully');
        } catch (error) {
            console.error('Error initializing Adsgram:', error);
            showErrorMessage('Failed to initialize ad service. Please try again later.');
        }
    } else {
        console.error('Adsgram SDK not available');
        showErrorMessage('Ad service is not available. Please try again later.');
    }
}

// 修改 showAd 函数
function showAd() {
    console.log('showAd function called');
    if (AdController) {
        AdController.show().then((result) => {
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

// 在页面加载完成后初始化 Adsgram
window.addEventListener('load', () => {
    console.log('Window loaded, initializing Adsgram');
    initAdsgram();
});

// 修改游戏循环
function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    drawBackground();

    if (showIntro) {
        // Draw intro text
        drawText("Taiji Divination", canvas.width / 2, 50, 40);
        for (let i = 0; i < introText.length; i++) {
            drawText(introText[i], canvas.width / 2, 100 + i * 30, 16);
        }
        drawButton("Start Divination", 300, 550, 200, 50);
    } else {
        // Draw title
        drawText("Taiji Divination", canvas.width / 2, 100, 40);

        // Draw current hexagram
        drawText(currentHexagram, canvas.width / 2, 250, 60);

        // Draw divination button
        drawButton("Start Divination", 300, 400, 200, 50);

        // Draw watch ad button
        drawButton("Watch Ad", 300, 470, 200, 50);
    }

    if (adSDKFailed) {
        drawText("广告服务暂时不可用", canvas.width / 2, 550, 20, "#FF0000");
    } else if (!adSDKLoaded) {
        drawText("正在加载广告服务...", canvas.width / 2, 550, 20, "#FFFF00");
    }

    if (!AdController) {
        drawText("Ad service not initialized", canvas.width / 2, 550, 20, "#FFFF00");
    }

    // Continue the loop
    requestAnimationFrame(gameLoop);
}

// Add new variables for the intro text
let showIntro = true;
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

// 开始游戏循环
gameLoop();

// 移除重复的 gameLoop 调用
// gameLoop();