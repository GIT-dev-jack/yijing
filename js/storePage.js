const StorePage = (function() {
    // 私有变量
    const storeItems = [
        { category: "道具", items: [
            { name: "幸运符", description: "提高算卦准确度", price: 100, icon: "🍀" },
            { name: "时间沙漏", description: "减少算卦冷却时间", price: 150, icon: "⏳" },
        ]},
        { category: "装饰", items: [
            { name: "金色背景", description: "更换背景为金色", price: 200, icon: "🌟" },
            { name: "神秘边框", description: "为卦象添加神秘边框", price: 180, icon: "🖼️" },
        ]},
        { category: "特殊物品", items: [
            { name: "预言之书", description: "解锁高级算卦功能", price: 500, icon: "📕" },
            { name: "占卜水晶", description: "增加稀有卦象出现概率", price: 300, icon: "🔮" },
        ]},
    ];

    let currentCategory = 0;
    let scrollOffset = 0;
    const itemsPerPage = 3;

    // 私有函数
    function drawCategorySelector(ctx, DESIGN_WIDTH, DESIGN_HEIGHT) {
        const categoryY = DESIGN_HEIGHT * 0.2;
        const categoryHeight = DESIGN_HEIGHT * 0.06;
        const categoryWidth = DESIGN_WIDTH / storeItems.length;

        storeItems.forEach((category, index) => {
            ctx.fillStyle = index === currentCategory ? "#4CAF50" : "#333";
            ctx.fillRect(index * categoryWidth, categoryY, categoryWidth, categoryHeight);
            ctx.fillStyle = "#fff";
            ctx.font = `${DESIGN_HEIGHT * 0.025}px Arial`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(category.category, (index + 0.5) * categoryWidth, categoryY + categoryHeight / 2);
        });
    }

    function drawItemList(ctx, DESIGN_WIDTH, DESIGN_HEIGHT) {
        const startY = DESIGN_HEIGHT * 0.3;
        const itemHeight = DESIGN_HEIGHT * 0.2;
        const padding = DESIGN_WIDTH * 0.05;
        const iconSize = DESIGN_HEIGHT * 0.06;

        const items = storeItems[currentCategory].items;
        const visibleItems = items.slice(scrollOffset, scrollOffset + itemsPerPage);

        visibleItems.forEach((item, index) => {
            const y = startY + index * itemHeight;

            // 绘制商品背景
            ctx.fillStyle = "#333";
            ctx.fillRect(padding, y, DESIGN_WIDTH - 2 * padding, itemHeight - 10);

            // 绘制商品图标
            ctx.font = `${iconSize}px Arial`;
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.fillText(item.icon, padding * 2, y + itemHeight / 2);

            // 绘制商品名称
            ctx.fillStyle = "#fff";
            ctx.font = `bold ${DESIGN_HEIGHT * 0.03}px Arial`;
            ctx.fillText(item.name, padding * 2 + iconSize * 1.5, y + itemHeight * 0.3);

            // 绘制商品描述
            ctx.font = `${DESIGN_HEIGHT * 0.025}px Arial`;
            ctx.fillText(item.description, padding * 2 + iconSize * 1.5, y + itemHeight * 0.6);

            // 绘制商品价格
            ctx.fillStyle = "#FFD700";
            ctx.textAlign = "right";
            ctx.fillText(`${item.price} 金币`, DESIGN_WIDTH - padding * 2, y + itemHeight * 0.3);

            // 绘制购买按钮
            drawButton(ctx, "购买", DESIGN_WIDTH - padding * 2 - DESIGN_WIDTH * 0.15, y + itemHeight * 0.6, DESIGN_WIDTH * 0.15, DESIGN_HEIGHT * 0.05);
        });
    }

    function drawButton(ctx, text, x, y, width, height) {
        ctx.fillStyle = "#4CAF50";
        ctx.fillRect(x, y, width, height);
        ctx.fillStyle = "#fff";
        ctx.font = `${height * 0.6}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, x + width / 2, y + height / 2);
    }

    // 公共函数
    return {
        drawStorePage: function(ctx, DESIGN_WIDTH, DESIGN_HEIGHT) {
            ctx.fillStyle = "#fff";
            ctx.font = `${DESIGN_HEIGHT * 0.05}px Arial`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("商店", DESIGN_WIDTH / 2, DESIGN_HEIGHT * 0.08);

            ctx.font = `${DESIGN_HEIGHT * 0.03}px Arial`;
            ctx.fillText("金币: 1000", DESIGN_WIDTH / 2, DESIGN_HEIGHT * 0.15);

            drawCategorySelector(ctx, DESIGN_WIDTH, DESIGN_HEIGHT);
            drawItemList(ctx, DESIGN_WIDTH, DESIGN_HEIGHT);
        },

        handleStorePageClick: function(x, y, DESIGN_WIDTH, DESIGN_HEIGHT) {
            const categoryY = DESIGN_HEIGHT * 0.2;
            const categoryHeight = DESIGN_HEIGHT * 0.06;
            const categoryWidth = DESIGN_WIDTH / storeItems.length;

            if (y >= categoryY && y <= categoryY + categoryHeight) {
                const clickedCategory = Math.floor(x / categoryWidth);
                if (clickedCategory !== currentCategory) {
                    currentCategory = clickedCategory;
                    scrollOffset = 0;
                }
                return;
            }

            const startY = DESIGN_HEIGHT * 0.3;
            const itemHeight = DESIGN_HEIGHT * 0.2;
            const padding = DESIGN_WIDTH * 0.05;

            const items = storeItems[currentCategory].items;
            const visibleItems = items.slice(scrollOffset, scrollOffset + itemsPerPage);

            visibleItems.forEach((item, index) => {
                const itemY = startY + index * itemHeight;
                if (y >= itemY && y <= itemY + itemHeight && x >= padding && x <= DESIGN_WIDTH - padding) {
                    const buttonX = DESIGN_WIDTH - padding * 2 - DESIGN_WIDTH * 0.15;
                    const buttonY = itemY + itemHeight * 0.6;
                    const buttonWidth = DESIGN_WIDTH * 0.15;
                    const buttonHeight = DESIGN_HEIGHT * 0.05;

                    if (x >= buttonX && x <= buttonX + buttonWidth && y >= buttonY && y <= buttonY + buttonHeight) {
                        console.log(`购买商品: ${item.name}`);
                        // TODO: 实现购买逻辑
                    } else {
                        console.log(`显示商品详情: ${item.name}`);
                        // TODO: 实现显示商品详情的逻辑
                    }
                }
            });
        }
    };
})();