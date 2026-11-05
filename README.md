# Shuffle Seek · 盲盒寻星

面向手机横屏的盲盒记忆游戏：先记住星星所在的盒子，盖上并打乱位置后，点击找出星星。选对进入下一关，选错可重试。

## 技术与结构

使用 React、TypeScript、Vite、Tailwind CSS 和 shadcn/ui，搭配 Looseleaf 手绘纸张风格。页面与游戏组件位于 `src/components/`，关卡配置位于 `src/data/levels.json`，游戏规则与状态分别位于 `src/game/` 和 `src/hooks/`。

Looseleaf 授权见 `licenses/looseleaf-LICENSE`。

## 运行

建议使用 Node.js 22，执行：

```bash
npm ci
npm run dev
```

手机与电脑连接同一局域网，访问终端显示的 Network 地址并横屏游玩。
