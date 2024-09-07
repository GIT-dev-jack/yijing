// 定义任务数据
const tasks = [
    { name: "每日登录", content: "连续登录7天", reward: "50金币" },
    { name: "完成算卦", content: "进行一次算卦", reward: "20金币" },
    { name: "邀请好友", content: "邀请一位新用户", reward: "100金币" },
    { name: "观看广告", content: "观看一个广告", reward: "10金币" },
];

function drawTasksPage(ctx, DESIGN_WIDTH, DESIGN_HEIGHT) {
    // 绘制标题
    ctx.fillStyle = "#fff";
    ctx.font = `${DESIGN_HEIGHT * 0.05}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("每日任务", DESIGN_WIDTH / 2, DESIGN_HEIGHT * 0.1);

    // 绘制任务列表
    const startY = DESIGN_HEIGHT * 0.2;
    const taskHeight = DESIGN_HEIGHT * 0.15;
    const padding = DESIGN_WIDTH * 0.05;

    tasks.forEach((task, index) => {
        const y = startY + index * taskHeight;

        // 绘制任务背景
        ctx.fillStyle = "#333";
        ctx.fillRect(padding, y, DESIGN_WIDTH - 2 * padding, taskHeight - 10);

        // 绘制任务名
        ctx.fillStyle = "#fff";
        ctx.font = `bold ${DESIGN_HEIGHT * 0.03}px Arial`;
        ctx.textAlign = "left";
        ctx.fillText(task.name, padding * 2, y + taskHeight * 0.25);

        // 绘制任务内容
        ctx.font = `${DESIGN_HEIGHT * 0.025}px Arial`;
        ctx.fillText(task.content, padding * 2, y + taskHeight * 0.5);

        // 绘制任务奖励
        ctx.fillStyle = "#FFD700";
        ctx.textAlign = "right";
        ctx.fillText(`奖励: ${task.reward}`, DESIGN_WIDTH - padding * 2, y + taskHeight * 0.75);
    });
}

function handleTasksPageClick(x, y, DESIGN_WIDTH, DESIGN_HEIGHT) {
    console.log("Tasks page clicked", x, y);

    const startY = DESIGN_HEIGHT * 0.2;
    const taskHeight = DESIGN_HEIGHT * 0.15;
    const padding = DESIGN_WIDTH * 0.05;

    tasks.forEach((task, index) => {
        const taskY = startY + index * taskHeight;
        if (y >= taskY && y <= taskY + taskHeight &&
            x >= padding && x <= DESIGN_WIDTH - padding) {
            console.log(`Task clicked: ${task.name}`);
            // 这里可以添加任务完成的逻辑
        }
    });
}