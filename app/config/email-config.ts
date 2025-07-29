// 邮件系统配置
export const EMAIL_CONFIG = {
  // 域名配置
  BASE_URL: 'https://family-jp.info',
  
  // 外部API地址
  UNSUBSCRIBE_API: 'https://email-test-gamma.vercel.app/api/unsubscribe',
  RESUBSCRIBE_API: 'https://email-test-gamma.vercel.app/api/resubscribe',
  
  // 邮件服务配置
  FROM_EMAIL: 'noreply@family-jp.info',
  FROM_NAME: 'Family JP',
  
  // 联系信息
  SUPPORT_EMAIL: 'support@family-jp.info',
  PRIVACY_EMAIL: 'privacy@family-jp.info',
  
  // 安全配置
  EMAIL_SECRET: process.env.EMAIL_SECRET || 'your-secret-key',
  
  // 邮件服务提供商配置
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
  AWS_SES_ACCESS_KEY: process.env.AWS_SES_ACCESS_KEY,
  AWS_SES_SECRET_KEY: process.env.AWS_SES_SECRET_KEY,
} as const;

// 生成退订链接的函数
export function generateUnsubscribeLink(email: string): string {
  const token = generateUnsubscribeToken(email, EMAIL_CONFIG.EMAIL_SECRET);
  return `${EMAIL_CONFIG.UNSUBSCRIBE_API}?email=${encodeURIComponent(email)}&token=${token}`;
}

// 生成隐私政策链接
export function generatePrivacyPolicyLink(): string {
  return `${EMAIL_CONFIG.BASE_URL}/privacy-policy`;
}

// 生成安全token的函数（从email-links.ts复制）
function generateUnsubscribeToken(email: string, secret: string): string {
  const crypto = require('crypto');
  const data = `${email}:${Date.now()}`;
  return crypto.createHmac('sha256', secret).update(data).digest('hex');
} 