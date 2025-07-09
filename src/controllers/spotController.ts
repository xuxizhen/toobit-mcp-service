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

export default router; 