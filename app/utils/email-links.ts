import crypto from 'crypto';
import { EMAIL_CONFIG } from '../config/email-config';

// 生成安全的退订token
export function generateUnsubscribeToken(email: string, secret: string): string {
  const data = `${email}:${Date.now()}`;
  return crypto.createHmac('sha256', secret).update(data).digest('hex');
}

// 生成退订链接
export function generateUnsubscribeLink(email: string, baseUrl: string, secret: string): string {
  const token = generateUnsubscribeToken(email, secret);
  return `${EMAIL_CONFIG.UNSUBSCRIBE_API}?email=${encodeURIComponent(email)}&token=${token}`;
}

// 生成隐私政策链接
export function generatePrivacyPolicyLink(baseUrl: string): string {
  return EMAIL_CONFIG.BASE_URL + '/privacy-policy';
}

// 生成邮件页脚HTML
export function generateEmailFooter(email: string, baseUrl: string, secret: string): string {
  const unsubscribeLink = generateUnsubscribeLink(email, baseUrl, secret);
  const privacyPolicyLink = generatePrivacyPolicyLink(baseUrl);
  
  return `
    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; text-align: center;">
      <p style="margin: 0 0 10px 0;">
        You received this email because you subscribed to our newsletter.
      </p>
      <p style="margin: 0 0 10px 0;">
        <a href="${unsubscribeLink}" style="color: #3b82f6; text-decoration: none;">Unsubscribe</a> | 
        <a href="${privacyPolicyLink}" style="color: #3b82f6; text-decoration: none;">Privacy Policy</a>
      </p>
      <p style="margin: 0; font-size: 11px;">
        © ${new Date().getFullYear()} Family JP. All rights reserved.
      </p>
    </div>
  `;
}

// 生成纯文本邮件页脚
export function generateEmailFooterText(email: string, baseUrl: string, secret: string): string {
  const unsubscribeLink = generateUnsubscribeLink(email, baseUrl, secret);
  const privacyPolicyLink = generatePrivacyPolicyLink(baseUrl);
  
  return `
    
    ---
    You received this email because you subscribed to our newsletter.
    
    Unsubscribe: ${unsubscribeLink}
    Privacy Policy: ${privacyPolicyLink}
    
    © ${new Date().getFullYear()} Family JP. All rights reserved.
  `;
}

// 验证退订token（在API中使用）
export function validateUnsubscribeToken(email: string, token: string, secret: string): boolean {
  try {
    // 这里应该实现更复杂的token验证逻辑
    // 例如：检查token是否在数据库中，是否过期等
    const expectedToken = generateUnsubscribeToken(email, secret);
    return token === expectedToken;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
}

// 生成邮件模板的完整HTML
export function generateEmailTemplate(
  subject: string,
  content: string,
  email: string,
  baseUrl: string,
  secret: string
): string {
  const footer = generateEmailFooter(email, baseUrl, secret);
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden;">
          <!-- Header -->
          <div style="background-color: #3b82f6; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Family JP</h1>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px 20px;">
            ${content}
          </div>
          
          <!-- Footer -->
          ${footer}
        </div>
      </div>
    </body>
    </html>
  `;
} 