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
    
    if (x >= 300 && x <= 500 && y >= 400 && y <= 450) {
        startDivination();
    }
});

// 游戏循环
function gameLoop() {
    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制背景
    drawBackground();

    // 绘制标题
    drawText("算卦小游戏", canvas.width / 2, 100, 40);

    // 绘制当前卦象
    drawText(currentHexagram, canvas.width / 2, 250, 60);

    // 绘制按钮
    drawButton("开始算卦", 300, 400, 200, 50);

    // 继续循环
    requestAnimationFrame(gameLoop);
}

// 开始游戏循环
gameLoop();