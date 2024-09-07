const InvitePage = (function() {
    const inviteLink = "https://yourgame.com/invite?code=ABC123"; // 替换为实际的邀请链接
    const inviteRewards = [
        { friends: 1, reward: "50金币" },
        { friends: 5, reward: "200金币 + 幸运符" },
        { friends: 10, reward: "500金币 + 神秘边框" },
    ];

    function drawInvitePage(ctx, DESIGN_WIDTH, DESIGN_HEIGHT) {
        // 绘制标题
        ctx.fillStyle = "#fff";
        ctx.font = `${DESIGN_HEIGHT * 0.05}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("邀请好友", DESIGN_WIDTH / 2, DESIGN_HEIGHT * 0.1);

        // 绘制邀请链接
        ctx.font = `${DESIGN_HEIGHT * 0.025}px Arial`;
        ctx.fillText("你的邀请链接:", DESIGN_WIDTH / 2, DESIGN_HEIGHT * 0.2);
        ctx.font = `${DESIGN_HEIGHT * 0.02}px Arial`;
        ctx.fillText(inviteLink, DESIGN_WIDTH / 2, DESIGN_HEIGHT * 0.25);

        // 绘制复制按钮
        drawButton(ctx, "复制链接", DESIGN_WIDTH / 2 - DESIGN_WIDTH * 0.15, DESIGN_HEIGHT * 0.3, DESIGN_WIDTH * 0.3, DESIGN_HEIGHT * 0.06);

        // 绘制邀请奖励
        ctx.font = `${DESIGN_HEIGHT * 0.03}px Arial`;
        ctx.fillText("邀请奖励", DESIGN_WIDTH / 2, DESIGN_HEIGHT * 0.45);

        inviteRewards.forEach((reward, index) => {
            const y = DESIGN_HEIGHT * (0.55 + index * 0.1);
            ctx.fillStyle = "#FFD700";
            ctx.font = `${DESIGN_HEIGHT * 0.025}px Arial`;
            ctx.textAlign = "left";
            ctx.fillText(`邀请${reward.friends}位好友:`, DESIGN_WIDTH * 0.1, y);
            ctx.textAlign = "right";
            ctx.fillText(reward.reward, DESIGN_WIDTH * 0.9, y);
        });
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

    function handleInvitePageClick(x, y, DESIGN_WIDTH, DESIGN_HEIGHT) {
        // 检查是否点击了复制按钮
        const buttonX = DESIGN_WIDTH / 2 - DESIGN_WIDTH * 0.15;
        const buttonY = DESIGN_HEIGHT * 0.3;
        const buttonWidth = DESIGN_WIDTH * 0.3;
        const buttonHeight = DESIGN_HEIGHT * 0.06;

        if (x >= buttonX && x <= buttonX + buttonWidth && y >= buttonY && y <= buttonY + buttonHeight) {
            console.log("复制邀请链接");
            // TODO: 实现复制到剪贴板的功能
            navigator.clipboard.writeText(inviteLink).then(() => {
                console.log('邀请链接已复制到剪贴板');
                // 可以在这里添加一些视觉反馈，比如显示一个短暂的提示消息
            }).catch(err => {
                console.error('复制失败:', err);
            });
        }
    }

    return {
        drawInvitePage: drawInvitePage,
        handleInvitePageClick: handleInvitePageClick
    };
})();