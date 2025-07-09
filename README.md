# Toobit MCP Service

本项目封装了 Toobit 现货 API，提供统一的 MCP（Multi-Channel Platform）服务接口，支持 Toobit API 文档上的全部功能。

## 主要功能
- 封装 Toobit 现货 API 全部接口
- 统一 RESTful API 服务
- 易于扩展和二次开发

## 目录结构
```
toobit-mcp-service/
├── src/
│   ├── api/           # Toobit API 封装
│   ├── controllers/   # MCP 业务接口
│   ├── utils/         # 工具函数，如签名、请求封装
│   └── index.ts       # 入口
├── test/              # 单元测试
├── package.json
├── README.md
└── .env               # API KEY 等敏感信息
```

## 快速开始
1. 安装依赖：
   ```bash
   npm install
   ```
2. 配置 .env 文件，填写 Toobit API KEY/SECRET：
   ```env
   TOOBIT_API_KEY=你的APIKEY
   TOOBIT_API_SECRET=你的APISECRET
   ```
3. 启动服务：
   ```bash
   npx ts-node src/index.ts
   ```

## 参考文档
- [Toobit API 官方文档](https://toobit-docs.github.io/apidocs/spot/v1/en/#introduction)

---

如需扩展合约等其他模块，请在 `src/api/` 和 `src/controllers/` 目录下新增对应文件。 