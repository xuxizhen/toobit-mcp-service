# Toobit MCP Service

本项目封装了 Toobit 现货 API 的核心行情接口，提供统一的 MCP（Multi-Channel Platform）服务接口。

## 主要功能
- 封装 Toobit 现货行情 API 主要接口
- 统一 RESTful API 服务，所有接口返回格式标准化
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
   npm run dev
   ```

## MCP 支持的接口

### 1. 交易所信息
- `GET /mcp/spot/exchangeInfo`
  - 获取交易所支持的币对、精度等基础信息
  - 示例：
    ```
    GET http://localhost:3000/mcp/spot/exchangeInfo
    ```

### 2. 深度（Order Book）
- `GET /mcp/spot/quote/depth`
  - 获取指定交易对的订单簿深度
  - 示例：
    ```
    GET http://localhost:3000/mcp/spot/quote/depth?symbol=BTCUSDT&limit=20
    ```

### 3. 最新成交
- `GET /mcp/spot/quote/trades`
  - 获取指定交易对的最新成交记录
  - 示例：
    ```
    GET http://localhost:3000/mcp/spot/quote/trades?symbol=BTCUSDT&limit=10
    ```

### 4. K线数据
- `GET /mcp/spot/quote/klines`
  - 获取指定交易对的K线/蜡烛图数据
  - 示例：
    ```
    GET http://localhost:3000/mcp/spot/quote/klines?symbol=BTCUSDT&interval=1h&limit=10
    ```

### 5. 24小时行情
- `GET /mcp/spot/quote/ticker/24hr`
  - 获取24小时价格变动统计
  - 示例：
    ```
    GET http://localhost:3000/mcp/spot/quote/ticker/24hr?symbol=BTCUSDT
    ```

### 6. 最新价格
- `GET /mcp/spot/quote/ticker/price`
  - 获取指定交易对的最新价格
  - 示例：
    ```
    GET http://localhost:3000/mcp/spot/quote/ticker/price?symbol=BTCUSDT
    ```

### 7. 最优挂单
- `GET /mcp/spot/quote/ticker/bookTicker`
  - 获取指定交易对的最优买一/卖一挂单
  - 示例：
    ```
    GET http://localhost:3000/mcp/spot/quote/ticker/bookTicker?symbol=BTCUSDT
    ```

### 8. 合并深度
- `GET /mcp/spot/quote/depth/merged`
  - 获取指定交易对的合并订单簿深度
  - 示例：
    ```
    GET http://localhost:3000/mcp/spot/quote/depth/merged?symbol=BTCUSDT&limit=20
    ```

## 返回格式
- 所有接口返回：
  ```json
  {
    "code": 0,
    "msg": "success",
    "data": { ... } // 对应Toobit原始数据
  }
  ```
  错误时：
  ```json
  {
    "code": -1,
    "msg": "错误信息",
    "data": null
  }
  ```

## 参考文档
- [Toobit API 官方文档](https://toobit-docs.github.io/apidocs/spot/v1/en/#introduction)
- [新版行情接口示例](https://api.toobit.com/quote/v1/ticker/price?symbol=ETHUSDT)

---

如需扩展更多接口，请在 `src/api/` 和 `src/controllers/` 目录下新增对应文件。 