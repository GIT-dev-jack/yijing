// 通用绘图函数
function drawText(ctx, text, x, y, fontSize = 30, color = "#fff") {
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.fillText(text, x, y);
}

function drawButton(ctx, text, x, y, width, height) {
    ctx.fillStyle = "#4CAF50";
    ctx.fillRect(x, y, width, height);
    drawText(ctx, text, x + width / 2, y + height / 2 + 10, 20, "#fff");
}