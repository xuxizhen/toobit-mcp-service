import express from 'express';
import dotenv from 'dotenv';
import spotController from './controllers/spotController';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/mcp/spot', spotController);

// MCP /tools endpoint (JSON-RPC 2.0)
app.post('/tools', async (req, res) => {
  const { jsonrpc, id, method, params } = req.body;
  if (jsonrpc !== '2.0') {
    return res.status(400).json({ jsonrpc: '2.0', id, error: { code: -32600, message: 'Invalid JSON-RPC version' } });
  }

  if (method === 'tools/list') {
    // 返回一个示例工具，后续可扩展
    return res.json({
      jsonrpc: '2.0',
      id,
      result: {
        tools: [
          {
            name: 'get_price',
            description: '获取指定币种的最新价格',
            inputSchema: {
              type: 'object',
              properties: {
                symbol: { type: 'string', description: '币种对，如BTCUSDT' }
              },
              required: ['symbol']
            },
            annotations: {
              title: '获取币价',
              readOnlyHint: true,
              openWorldHint: false
            }
          }
        ]
      }
    });
  }

  // 预留tools/call等方法
  return res.status(404).json({ jsonrpc: '2.0', id, error: { code: -32601, message: 'Method not found' } });
});

app.get('/', (req, res) => {
  res.send('Toobit MCP Service is running.');
});

export default app;

// 仅本地开发时监听端口
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} 