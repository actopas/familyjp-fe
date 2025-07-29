import { generateEmailTemplate, generateEmailFooterText } from '../utils/email-links';

interface EmailOptions {
  to: string;
  subject: string;
  content: string;
  baseUrl: string;
  secret: string;
}

export class EmailService {
  private baseUrl: string;
  private secret: string;

  constructor(baseUrl: string, secret: string) {
    this.baseUrl = baseUrl;
    this.secret = secret;
  }

  // 发送HTML邮件
  async sendHtmlEmail(options: EmailOptions): Promise<void> {
    const { to, subject, content } = options;
    
    const htmlContent = generateEmailTemplate(
      subject,
      content,
      to,
      this.baseUrl,
      this.secret
    );

    // 这里应该集成您的邮件发送服务
    // 例如：SendGrid, Mailgun, AWS SES等
    await this.sendEmail({
      to,
      subject,
      html: htmlContent,
      text: this.generateTextContent(content, to)
    });
  }

  // 发送纯文本邮件
  async sendTextEmail(options: EmailOptions): Promise<void> {
    const { to, subject, content } = options;
    
    const textContent = this.generateTextContent(content, to);

    await this.sendEmail({
      to,
      subject,
      text: textContent
    });
  }

  // 生成纯文本内容
  private generateTextContent(content: string, email: string): string {
    const footer = generateEmailFooterText(email, this.baseUrl, this.secret);
    return `${content}\n\n${footer}`;
  }

  // 实际的邮件发送逻辑（需要根据您的邮件服务提供商来实现）
  private async sendEmail(emailData: {
    to: string;
    subject: string;
    html?: string;
    text?: string;
  }): Promise<void> {
    // 这里应该实现您的邮件发送逻辑
    // 示例使用console.log来模拟发送
    console.log('Sending email:', {
      to: emailData.to,
      subject: emailData.subject,
      hasHtml: !!emailData.html,
      hasText: !!emailData.text
    });

    // 实际实现示例（使用SendGrid）：
    /*
    import sgMail from '@sendgrid/mail';
    
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
    
    await sgMail.send({
      to: emailData.to,
      from: 'noreply@yourcompany.com',
      subject: emailData.subject,
      html: emailData.html,
      text: emailData.text
    });
    */
  }

  // 发送欢迎邮件
  async sendWelcomeEmail(email: string, name?: string): Promise<void> {
    const subject = 'Welcome to Our Newsletter!';
    const content = `
      <h2>Welcome to Our Newsletter!</h2>
      <p>Hi ${name || 'there'},</p>
      <p>Thank you for subscribing to our newsletter. We're excited to have you on board!</p>
      <p>You'll receive regular updates about:</p>
      <ul>
        <li>Latest product announcements</li>
        <li>Industry insights and tips</li>
        <li>Special offers and promotions</li>
        <li>Company news and updates</li>
      </ul>
      <p>If you have any questions, feel free to reply to this email.</p>
      <p>Best regards,<br>The Team</p>
    `;

    await this.sendHtmlEmail({
      to: email,
      subject,
      content,
      baseUrl: this.baseUrl,
      secret: this.secret
    });
  }

  // 发送新闻通讯
  async sendNewsletter(email: string, newsletterData: {
    title: string;
    content: string;
    featuredImage?: string;
  }): Promise<void> {
    const subject = newsletterData.title;
    const content = `
      ${newsletterData.featuredImage ? `<img src="${newsletterData.featuredImage}" alt="Featured" style="max-width: 100%; height: auto; margin-bottom: 20px;">` : ''}
      ${newsletterData.content}
    `;

    await this.sendHtmlEmail({
      to: email,
      subject,
      content,
      baseUrl: this.baseUrl,
      secret: this.secret
    });
  }

  // 发送产品公告
  async sendProductAnnouncement(email: string, productData: {
    name: string;
    description: string;
    link: string;
    image?: string;
  }): Promise<void> {
    const subject = `New Product: ${productData.name}`;
    const content = `
      <h2>Introducing ${productData.name}</h2>
      ${productData.image ? `<img src="${productData.image}" alt="${productData.name}" style="max-width: 100%; height: auto; margin-bottom: 20px;">` : ''}
      <p>${productData.description}</p>
      <p style="margin-top: 20px;">
        <a href="${productData.link}" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          Learn More
        </a>
      </p>
    `;

    await this.sendHtmlEmail({
      to: email,
      subject,
      content,
      baseUrl: this.baseUrl,
      secret: this.secret
    });
  }

  // 发送促销邮件
  async sendPromotionalEmail(email: string, promotionData: {
    title: string;
    description: string;
    discountCode: string;
    expiryDate: string;
    link: string;
  }): Promise<void> {
    const subject = promotionData.title;
    const content = `
      <h2>${promotionData.title}</h2>
      <p>${promotionData.description}</p>
      <div style="background-color: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 6px; margin: 20px 0;">
        <p style="margin: 0; font-weight: bold;">Use code: <span style="color: #d97706;">${promotionData.discountCode}</span></p>
        <p style="margin: 5px 0 0 0; font-size: 14px;">Expires: ${promotionData.expiryDate}</p>
      </div>
      <p style="margin-top: 20px;">
        <a href="${promotionData.link}" style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          Shop Now
        </a>
      </p>
    `;

    await this.sendHtmlEmail({
      to: email,
      subject,
      content,
      baseUrl: this.baseUrl,
      secret: this.secret
    });
  }
} 