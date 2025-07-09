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
    const headers: any = {
      'X-TOOBIT-APIKEY': this.apiKey,
    };
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
   * GET /quote/v1/depth
   */
  async getQuoteDepth(params: any) {
    return this.request('GET', '/quote/v1/depth', params);
  }

  /**
   * 获取最新成交
   * GET /quote/v1/trades
   */
  async getQuoteTrades(params: any) {
    return this.request('GET', '/quote/v1/trades', params);
  }

  /**
   * 获取K线数据
   * GET /quote/v1/klines
   */
  async getQuoteKlines(params: any) {
    return this.request('GET', '/quote/v1/klines', params);
  }

  /**
   * 获取24小时行情
   * GET /quote/v1/ticker/24hr
   */
  async getQuoteTicker24hr(params: any) {
    return this.request('GET', '/quote/v1/ticker/24hr', params);
  }

  /**
   * 获取最新价格
   * GET /quote/v1/ticker/price
   */
  async getQuoteTickerPrice(params: any) {
    return this.request('GET', '/quote/v1/ticker/price', params);
  }

  /**
   * 获取最优挂单
   * GET /quote/v1/ticker/bookTicker
   */
  async getQuoteBookTicker(params: any) {
    return this.request('GET', '/quote/v1/ticker/bookTicker', params);
  }

  /**
   * 获取合并深度
   * GET /quote/v1/depth/merged
   */
  async getQuoteDepthMerged(params: any) {
    return this.request('GET', '/quote/v1/depth/merged', params);
  }
} 