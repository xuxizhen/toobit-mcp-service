import axios from 'axios';

const BASE_URL = 'https://api.toobit.com';

export class ToobitAPI {
  apiKey: string;
  apiSecret: string;

  constructor(apiKey: string, apiSecret: string) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
  }

  // 基础请求方法
  async request(method: 'GET' | 'POST' | 'DELETE', path: string, params: any = {}, signed = false) {
    // TODO: 实现签名逻辑
    const headers: any = {
      'X-TOOBIT-APIKEY': this.apiKey,
    };
    // ...
    const url = `${BASE_URL}${path}`;
    return axios({
      method,
      url,
      headers,
      params: method === 'GET' ? params : undefined,
      data: method !== 'GET' ? params : undefined,
    });
  }

  /**
   * 获取交易所信息
   * GET /api/v1/exchangeInfo
   */
  async getExchangeInfo() {
    return this.request('GET', '/api/v1/exchangeInfo');
  }

  /**
   * 获取深度（order book）
   * GET /api/v1/depth
   */
  async getDepth(params: any) {
    return this.request('GET', '/api/v1/depth', params);
  }

  /**
   * 获取K线数据
   * GET /api/v1/klines
   */
  async getKlines(params: any) {
    return this.request('GET', '/api/v1/klines', params);
  }

  /**
   * 获取最新成交
   * GET /api/v1/trades
   */
  async getTrades(params: any) {
    return this.request('GET', '/api/v1/trades', params);
  }

  /**
   * 获取24小时行情
   * GET /api/v1/ticker/24hr
   */
  async getTicker24hr(params: any) {
    return this.request('GET', '/api/v1/ticker/24hr', params);
  }

  /**
   * 获取最新价格
   * GET /api/v1/ticker/price
   */
  async getTickerPrice(params: any) {
    return this.request('GET', '/api/v1/ticker/price', params);
  }

  /**
   * 获取最优挂单
   * GET /api/v1/ticker/bookTicker
   */
  async getBookTicker(params: any) {
    return this.request('GET', '/api/v1/ticker/bookTicker', params);
  }

  /**
   * 下单
   * POST /api/v1/order
   */
  async placeOrder(params: any) {
    return this.request('POST', '/api/v1/order', params, true);
  }

  /**
   * 批量下单
   * POST /api/v1/batchOrders
   */
  async batchOrders(params: any) {
    return this.request('POST', '/api/v1/batchOrders', params, true);
  }

  /**
   * 查询订单
   * GET /api/v1/order
   */
  async getOrder(params: any) {
    return this.request('GET', '/api/v1/order', params, true);
  }

  /**
   * 查询当前挂单
   * GET /api/v1/openOrders
   */
  async getOpenOrders(params: any) {
    return this.request('GET', '/api/v1/openOrders', params, true);
  }

  /**
   * 撤单
   * DELETE /api/v1/order
   */
  async cancelOrder(params: any) {
    return this.request('DELETE', '/api/v1/order', params, true);
  }

  /**
   * 批量撤单
   * DELETE /api/v1/batchOrders
   */
  async cancelBatchOrders(params: any) {
    return this.request('DELETE', '/api/v1/batchOrders', params, true);
  }

  /**
   * 查询账户信息
   * GET /api/v1/account
   */
  async getAccount(params: any) {
    return this.request('GET', '/api/v1/account', params, true);
  }

  /**
   * 查询资产
   * GET /api/v1/asset
   */
  async getAsset(params: any) {
    return this.request('GET', '/api/v1/asset', params, true);
  }

  /**
   * 查询成交历史
   * GET /api/v1/myTrades
   */
  async getMyTrades(params: any) {
    return this.request('GET', '/api/v1/myTrades', params, true);
  }
} 