# DeepGeek 平台

DeepGeek 是一个代码分析平台，提供代码质量报告、安全漏洞检测和性能优化建议。

## 功能特点

- 代码分析和报告生成
- 多级别订阅模式（免费版、专业版、企业版）
- 团队协作功能
- 报告导出和分享
- 与 DeepSeek API 集成

## 开发环境配置

### 系统要求

- Node.js 18.x - 21.x
- npm 或 yarn

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 环境变量配置

复制 `.env.example` 文件并重命名为 `.env.local`，然后根据需要修改环境变量：

```bash
cp .env.example .env.local
```

### 开发服务器

```bash
npm run dev
# 或
yarn dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 构建和部署

### 生产环境构建

```bash
npm run build
# 或
yarn build
```

### 启动生产服务器

```bash
npm run start
# 或
yarn start
```

### 分析构建包

```bash
npm run analyze
# 或
yarn analyze
```

## 测试

```bash
# 运行所有测试
npm run test
# 或
yarn test

# 监视模式
npm run test:watch
# 或
yarn test:watch
```

## 项目结构

```
deepgeek-new/
├── public/            # 静态资源
├── src/               # 源代码
│   ├── app/           # Next.js App Router
│   ├── components/    # 共享组件
│   ├── hooks/         # 自定义钩子
│   ├── lib/           # 工具函数和库
│   ├── models/        # 数据模型
│   ├── services/      # 服务层
│   ├── styles/        # 全局样式
│   └── types/         # TypeScript 类型定义
├── .env.example       # 环境变量示例
├── next.config.js     # Next.js 配置
└── package.json       # 项目依赖和脚本
```

## 许可证

[MIT](LICENSE)
