import { Router } from 'express';
import { ToobitAPI } from '../api/toobit';

const router = Router();

const apiKey = process.env.TOOBIT_API_KEY || '';
const apiSecret = process.env.TOOBIT_API_SECRET || '';
const toobit = new ToobitAPI(apiKey, apiSecret);

// 获取交易所信息
router.get('/exchangeInfo', async (req, res) => {
  try {
    const result = await toobit.getExchangeInfo();
    res.json({ code: 0, msg: 'success', data: result.data });
  } catch (err: any) {
    res.status(500).json({ code: -1, msg: err.message, data: null });
  }
});

// 获取深度（order book）
router.get('/quote/depth', async (req, res) => {
  try {
    const result = await toobit.getQuoteDepth(req.query);
    res.json({ code: 0, msg: 'success', data: result.data });
  } catch (err: any) {
    res.status(500).json({ code: -1, msg: err.message, data: null });
  }
});

// 获取最新成交
router.get('/quote/trades', async (req, res) => {
  try {
    const result = await toobit.getQuoteTrades(req.query);
    res.json({ code: 0, msg: 'success', data: result.data });
  } catch (err: any) {
    res.status(500).json({ code: -1, msg: err.message, data: null });
  }
});

// 获取K线数据
router.get('/quote/klines', async (req, res) => {
  try {
    const result = await toobit.getQuoteKlines(req.query);
    res.json({ code: 0, msg: 'success', data: result.data });
  } catch (err: any) {
    res.status(500).json({ code: -1, msg: err.message, data: null });
  }
});

// 获取24小时行情
router.get('/quote/ticker/24hr', async (req, res) => {
  try {
    const result = await toobit.getQuoteTicker24hr(req.query);
    res.json({ code: 0, msg: 'success', data: result.data });
  } catch (err: any) {
    res.status(500).json({ code: -1, msg: err.message, data: null });
  }
});

// 获取最新价格
router.get('/quote/ticker/price', async (req, res) => {
  try {
    const result = await toobit.getQuoteTickerPrice(req.query);
    res.json({ code: 0, msg: 'success', data: result.data });
  } catch (err: any) {
    res.status(500).json({ code: -1, msg: err.message, data: null });
  }
});

// 获取最优挂单
router.get('/quote/ticker/bookTicker', async (req, res) => {
  try {
    const result = await toobit.getQuoteBookTicker(req.query);
    res.json({ code: 0, msg: 'success', data: result.data });
  } catch (err: any) {
    res.status(500).json({ code: -1, msg: err.message, data: null });
  }
});

// 获取合并深度
router.get('/quote/depth/merged', async (req, res) => {
  try {
    const result = await toobit.getQuoteDepthMerged(req.query);
    res.json({ code: 0, msg: 'success', data: result.data });
  } catch (err: any) {
    res.status(500).json({ code: -1, msg: err.message, data: null });
  }
});

// ========== SSE行情接口 ========== //

function setSSEHeaders(res: any) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders && res.flushHeaders();
}

function ssePush(fn: (req: any) => Promise<any>, req: any, res: any, format?: (data: any) => any) {
  setSSEHeaders(res);
  let stopped = false;
  req.on('close', () => { stopped = true; });
  const send = async () => {
    try {
      const result = await fn(req);
      const data = format ? format(result) : result?.data;
      res.write(`data: ${JSON.stringify({ code: 0, msg: 'success', data })}\n\n`);
    } catch (err: any) {
      res.write(`data: ${JSON.stringify({ code: -1, msg: err.message, data: null })}\n\n`);
    }
  };
  (async function loop() {
    while (!stopped) {
      await send();
      await new Promise(r => setTimeout(r, 2000));
    }
    res.end();
  })();
}

// 交易所信息 SSE（一般不需要实时推送，仅做演示）
router.get('/exchangeInfo/stream', (req, res) => {
  ssePush(() => toobit.getExchangeInfo(), req, res);
});

// 深度（order book） SSE
router.get('/quote/depth/stream', (req, res) => {
  ssePush((req) => toobit.getQuoteDepth(req.query), req, res);
});

// 最新成交 SSE
router.get('/quote/trades/stream', (req, res) => {
  ssePush((req) => toobit.getQuoteTrades(req.query), req, res);
});

// K线数据 SSE
router.get('/quote/klines/stream', (req, res) => {
  ssePush((req) => toobit.getQuoteKlines(req.query), req, res);
});

// 24小时行情 SSE
router.get('/quote/ticker/24hr/stream', (req, res) => {
  ssePush((req) => toobit.getQuoteTicker24hr(req.query), req, res);
});

// 最新价格 SSE
router.get('/quote/ticker/price/stream', (req, res) => {
  ssePush((req) => toobit.getQuoteTickerPrice(req.query), req, res);
});

// 最优挂单 SSE
router.get('/quote/ticker/bookTicker/stream', (req, res) => {
  ssePush((req) => toobit.getQuoteBookTicker(req.query), req, res);
});

// 合并深度 SSE
router.get('/quote/depth/merged/stream', (req, res) => {
  ssePush((req) => toobit.getQuoteDepthMerged(req.query), req, res);
});

export default router; 