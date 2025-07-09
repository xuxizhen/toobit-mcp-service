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
    res.json(result.data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 行情类
router.get('/depth', async (req, res) => {
  try {
    const result = await toobit.getDepth(req.query);
    res.json({ code: 0, msg: 'success', data: result.data });
  } catch (err: any) {
    res.status(500).json({ code: -1, msg: err.message, data: null });
  }
});

router.get('/klines', async (req, res) => {
  try {
    const result = await toobit.getKlines(req.query);
    res.json({ code: 0, msg: 'success', data: result.data });
  } catch (err: any) {
    res.status(500).json({ code: -1, msg: err.message, data: null });
  }
});

router.get('/trades', async (req, res) => {
  try {
    const result = await toobit.getTrades(req.query);
    res.json({ code: 0, msg: 'success', data: result.data });
  } catch (err: any) {
    res.status(500).json({ code: -1, msg: err.message, data: null });
  }
});

router.get('/ticker/24hr', async (req, res) => {
  try {
    const result = await toobit.getTicker24hr(req.query);
    res.json({ code: 0, msg: 'success', data: result.data });
  } catch (err: any) {
    res.status(500).json({ code: -1, msg: err.message, data: null });
  }
});

router.get('/ticker/price', async (req, res) => {
  try {
    const result = await toobit.getTickerPrice(req.query);
    res.json({ code: 0, msg: 'success', data: result.data });
  } catch (err: any) {
    res.status(500).json({ code: -1, msg: err.message, data: null });
  }
});

router.get('/ticker/bookTicker', async (req, res) => {
  try {
    const result = await toobit.getBookTicker(req.query);
    res.json({ code: 0, msg: 'success', data: result.data });
  } catch (err: any) {
    res.status(500).json({ code: -1, msg: err.message, data: null });
  }
});

// 交易类
router.post('/order', async (req, res) => {
  try {
    const result = await toobit.placeOrder(req.body);
    res.json({ code: 0, msg: 'success', data: result.data });
  } catch (err: any) {
    res.status(500).json({ code: -1, msg: err.message, data: null });
  }
});

router.post('/batchOrders', async (req, res) => {
  try {
    const result = await toobit.batchOrders(req.body);
    res.json({ code: 0, msg: 'success', data: result.data });
  } catch (err: any) {
    res.status(500).json({ code: -1, msg: err.message, data: null });
  }
});

router.get('/order', async (req, res) => {
  try {
    const result = await toobit.getOrder(req.query);
    res.json({ code: 0, msg: 'success', data: result.data });
  } catch (err: any) {
    res.status(500).json({ code: -1, msg: err.message, data: null });
  }
});

router.get('/openOrders', async (req, res) => {
  try {
    const result = await toobit.getOpenOrders(req.query);
    res.json({ code: 0, msg: 'success', data: result.data });
  } catch (err: any) {
    res.status(500).json({ code: -1, msg: err.message, data: null });
  }
});

router.delete('/order', async (req, res) => {
  try {
    const result = await toobit.cancelOrder(req.query);
    res.json({ code: 0, msg: 'success', data: result.data });
  } catch (err: any) {
    res.status(500).json({ code: -1, msg: err.message, data: null });
  }
});

router.delete('/batchOrders', async (req, res) => {
  try {
    const result = await toobit.cancelBatchOrders(req.query);
    res.json({ code: 0, msg: 'success', data: result.data });
  } catch (err: any) {
    res.status(500).json({ code: -1, msg: err.message, data: null });
  }
});

// 账户类
router.get('/account', async (req, res) => {
  try {
    const result = await toobit.getAccount(req.query);
    res.json({ code: 0, msg: 'success', data: result.data });
  } catch (err: any) {
    res.status(500).json({ code: -1, msg: err.message, data: null });
  }
});

router.get('/asset', async (req, res) => {
  try {
    const result = await toobit.getAsset(req.query);
    res.json({ code: 0, msg: 'success', data: result.data });
  } catch (err: any) {
    res.status(500).json({ code: -1, msg: err.message, data: null });
  }
});

router.get('/myTrades', async (req, res) => {
  try {
    const result = await toobit.getMyTrades(req.query);
    res.json({ code: 0, msg: 'success', data: result.data });
  } catch (err: any) {
    res.status(500).json({ code: -1, msg: err.message, data: null });
  }
});

export default router; 