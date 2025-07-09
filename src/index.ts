import express from 'express';
import dotenv from 'dotenv';
import spotController from './controllers/spotController';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/mcp/spot', spotController);

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