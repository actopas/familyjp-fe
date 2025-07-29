import { EmailService } from '../services/email-service';

// 使用示例
export async function emailUsageExample() {
  // 初始化邮件服务
  const emailService = new EmailService(
    'https://family-jp.info', // 您的域名
    process.env.EMAIL_SECRET || 'your-secret-key' // 用于生成安全token的密钥
  );

  // 示例1: 发送欢迎邮件
  await emailService.sendWelcomeEmail('user@example.com', 'John Doe');

  // 示例2: 发送新闻通讯
  await emailService.sendNewsletter('user@example.com', {
    title: 'Monthly Newsletter - December 2024',
    content: `
      <h3>This Month's Highlights</h3>
      <p>Here's what's new this month...</p>
      <ul>
        <li>New product features</li>
        <li>Industry insights</li>
        <li>Upcoming events</li>
      </ul>
    `,
    featuredImage: 'https://family-jp.info/images/newsletter-header.jpg'
  });

  // 示例3: 发送产品公告
  await emailService.sendProductAnnouncement('user@example.com', {
    name: 'Premium Widget Pro',
    description: 'Our latest premium widget with advanced features and improved performance.',
    link: 'https://family-jp.info/products/premium-widget-pro',
    image: 'https://family-jp.info/images/premium-widget-pro.jpg'
  });

  // 示例4: 发送促销邮件
  await emailService.sendPromotionalEmail('user@example.com', {
    title: 'Holiday Sale - 50% Off Everything!',
    description: "Don't miss our biggest sale of the year. Get 50% off all products!",
    discountCode: 'HOLIDAY50',
    expiryDate: 'December 31, 2024',
    link: 'https://family-jp.info/sale'
  });
}

// 批量发送邮件示例
export async function sendBulkEmails() {
  const emailService = new EmailService(
    'https://family-jp.info',
    process.env.EMAIL_SECRET || 'your-secret-key'
  );

  const subscribers = [
    'user1@example.com',
    'user2@example.com',
    'user3@example.com'
  ];

  // 发送批量新闻通讯
  for (const email of subscribers) {
    try {
      await emailService.sendNewsletter(email, {
        title: 'Weekly Update',
        content: '<p>This week\'s updates...</p>'
      });
      console.log(`Newsletter sent to ${email}`);
    } catch (error) {
      console.error(`Failed to send newsletter to ${email}:`, error);
    }
  }
}

// 环境变量配置示例
export const emailConfig = {
  // 在 .env.local 文件中设置这些变量
  EMAIL_SECRET: process.env.EMAIL_SECRET || 'your-secret-key',
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
  AWS_SES_ACCESS_KEY: process.env.AWS_SES_ACCESS_KEY,
  AWS_SES_SECRET_KEY: process.env.AWS_SES_SECRET_KEY,
  BASE_URL: process.env.BASE_URL || 'https://family-jp.info'
}; 