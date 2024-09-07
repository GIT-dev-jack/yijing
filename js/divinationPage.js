function drawDivinationPage(ctx, DESIGN_WIDTH, DESIGN_HEIGHT) {
    const titleY = DESIGN_HEIGHT * 0.1;
    const hexagramY = DESIGN_HEIGHT * 0.4;
    const startButtonY = DESIGN_HEIGHT * 0.7;
    const adButtonY = DESIGN_HEIGHT * 0.8;
    const buttonWidth = DESIGN_WIDTH * 0.6;
    const buttonHeight = DESIGN_HEIGHT * 0.08;

    // 绘制标题
    ctx.fillStyle = "#fff";
    ctx.font = `${DESIGN_HEIGHT * 0.05}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("太极算卦", DESIGN_WIDTH / 2, titleY);

    // 绘制卦象
    ctx.font = `${DESIGN_HEIGHT * 0.1}px Arial`;
    if (currentHexagram) {
        ctx.fillText(currentHexagram, DESIGN_WIDTH / 2, hexagramY);
    }

    // 绘制按钮
    drawButton(ctx, "开始算卦", DESIGN_WIDTH / 2 - buttonWidth / 2, startButtonY, buttonWidth, buttonHeight);
    drawButton(ctx, "观看广告", DESIGN_WIDTH / 2 - buttonWidth / 2, adButtonY, buttonWidth, buttonHeight);

    // 添加说明文字
    ctx.fillStyle = "#ccc";
    ctx.font = `${DESIGN_HEIGHT * 0.025}px Arial`;
    ctx.fillText('点击"开始算卦"来获取你的卦象', DESIGN_WIDTH / 2, DESIGN_HEIGHT * 0.55);
    ctx.fillText("观看广告可以获得额外奖励", DESIGN_WIDTH / 2, DESIGN_HEIGHT * 0.6);
}

function drawButton(ctx, text, x, y, width, height) {
    ctx.fillStyle = "#4CAF50";
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = "#fff";
    ctx.font = `${height * 0.5}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, x + width / 2, y + height / 2);
}

function handleDivinationPageClick(x, y, DESIGN_WIDTH, DESIGN_HEIGHT) {
    console.log("算卦页面被点击", x, y);

    const startButtonY = DESIGN_HEIGHT * 0.7;
    const adButtonY = DESIGN_HEIGHT * 0.8;
    const buttonWidth = DESIGN_WIDTH * 0.6;
    const buttonHeight = DESIGN_HEIGHT * 0.08;

    if (x >= DESIGN_WIDTH / 2 - buttonWidth / 2 && x <= DESIGN_WIDTH / 2 + buttonWidth / 2) {
        if (y >= startButtonY && y <= startButtonY + buttonHeight) {
            console.log("开始算卦按钮被点击");
            startDivination();
        } else if (y >= adButtonY && y <= adButtonY + buttonHeight) {
            console.log('观看广告按钮被点击');
            showAd();
        } else {
            console.log("点击未在任何按钮上");
        }
    } else {
        console.log("点击未在任何按钮上");
    }
}

// 移除 startDivination 和 animate 函数，因为它们现在在 game.js 中