import { EmailService } from '../services/email-service';
import { EMAIL_CONFIG } from '../config/email-config';

// 发送包含退订链接的邮件示例
export async function sendEmailWithUnsubscribe() {
  // 初始化邮件服务
  const emailService = new EmailService(
    EMAIL_CONFIG.BASE_URL,
    EMAIL_CONFIG.EMAIL_SECRET
  );

  // 示例1: 发送欢迎邮件给新订阅者
  const newSubscriber = {
    email: 'john.doe@example.com',
    name: 'John Doe'
  };

  await emailService.sendWelcomeEmail(newSubscriber.email, newSubscriber.name);
  console.log(`Welcome email sent to ${newSubscriber.email}`);

  // 示例2: 发送新闻通讯
  const newsletterSubscribers = [
    'user1@example.com',
    'user2@example.com',
    'user3@example.com'
  ];

  for (const email of newsletterSubscribers) {
    try {
      await emailService.sendNewsletter(email, {
        title: 'Weekly Newsletter - December 2024',
        content: `
          <h3>This Week's Highlights</h3>
          <p>Here's what's new this week...</p>
          <ul>
            <li>New product features</li>
            <li>Industry insights</li>
            <li>Upcoming events</li>
          </ul>
          <p>Stay tuned for more updates!</p>
        `
      });
      console.log(`Newsletter sent to ${email}`);
    } catch (error) {
      console.error(`Failed to send newsletter to ${email}:`, error);
    }
  }

  // 示例3: 发送促销邮件
  const promotionalEmail = 'customer@example.com';
  await emailService.sendPromotionalEmail(promotionalEmail, {
    title: 'Holiday Sale - 50% Off Everything!',
    description: 'Don\'t miss our biggest sale of the year. Get 50% off all products!',
    discountCode: 'HOLIDAY50',
    expiryDate: 'December 31, 2024',
    link: 'https://family-jp.info/sale'
  });
  console.log(`Promotional email sent to ${promotionalEmail}`);
}

// 生成退订链接的示例
export async function generateUnsubscribeLinkExample() {
  const email = 'user@example.com';
  
  // 使用邮件服务生成退订链接
  const emailService = new EmailService(
    EMAIL_CONFIG.BASE_URL,
    EMAIL_CONFIG.EMAIL_SECRET
  );

  // 生成包含退订链接的邮件页脚
  const { generateEmailFooter } = await import('../utils/email-links');
  const footer = generateEmailFooter(email, EMAIL_CONFIG.BASE_URL, EMAIL_CONFIG.EMAIL_SECRET);
  console.log('Email footer with unsubscribe link:', footer);

  // 直接生成退订链接
  const unsubscribeLink = `${EMAIL_CONFIG.UNSUBSCRIBE_API}?email=${encodeURIComponent(email)}&token=example-token`;
  console.log('Unsubscribe link:', unsubscribeLink);
}

// 测试退订链接格式
export function testUnsubscribeLinkFormat() {
  const testEmails = [
    'user@example.com',
    'test+tag@example.com',
    'user.name@domain.co.jp'
  ];

  testEmails.forEach(email => {
    const unsubscribeLink = `${EMAIL_CONFIG.UNSUBSCRIBE_API}?email=${encodeURIComponent(email)}&token=test-token-123`;
    console.log(`Unsubscribe link for ${email}:`);
    console.log(unsubscribeLink);
    console.log('---');
  });
}

// 批量发送邮件的示例
export async function sendBulkEmailsWithUnsubscribe() {
  const emailService = new EmailService(
    EMAIL_CONFIG.BASE_URL,
    EMAIL_CONFIG.EMAIL_SECRET
  );

  const subscribers = [
    { email: 'user1@example.com', name: 'User One' },
    { email: 'user2@example.com', name: 'User Two' },
    { email: 'user3@example.com', name: 'User Three' }
  ];

  console.log('Starting bulk email send...');

  for (const subscriber of subscribers) {
    try {
      // 发送个性化邮件
      await emailService.sendWelcomeEmail(subscriber.email, subscriber.name);
      console.log(`✅ Email sent to ${subscriber.email}`);
      
      // 添加延迟避免被邮件服务商限制
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`❌ Failed to send email to ${subscriber.email}:`, error);
    }
  }

  console.log('Bulk email send completed!');
} 