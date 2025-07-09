import crypto from 'crypto';

/**
 * Toobit API 签名算法
 * 1. 参数按字典序排序
 * 2. 拼接为 query string
 * 3. 用 secret 进行 HMAC SHA256 签名，返回 hex 字符串
 */
export function signRequest(params: Record<string, any>, secret: string): string {
  const sortedKeys = Object.keys(params).sort();
  const queryString = sortedKeys
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join('&');
  return crypto.createHmac('sha256', secret).update(queryString).digest('hex');
} 