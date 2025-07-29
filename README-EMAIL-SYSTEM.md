# Email System with Unsubscribe and Privacy Policy Links

这个邮件系统为Family JP的Next.js应用提供了完整的邮件发送功能，包括安全的退订链接和隐私政策链接。

## 功能特性

### ✅ 已实现的功能

1. **安全的退订系统**
   - 自动生成安全的退订token
   - 用户友好的退订页面
   - 支持重新订阅功能
   - 退订活动记录

2. **隐私政策页面**
   - 完整的隐私政策内容
   - 符合GDPR和CAN-SPAM法规
   - 响应式设计

3. **邮件模板系统**
   - HTML和纯文本邮件支持
   - 自动添加退订和隐私政策链接
   - 可自定义的邮件模板

4. **API端点**
   - `/api/unsubscribe` - 处理退订请求
   - `/api/resubscribe` - 处理重新订阅请求

## 文件结构

```
app/
├── unsubscribe/
│   └── page.tsx              # 退订页面
├── privacy-policy/
│   └── page.tsx              # 隐私政策页面
├── api/
│   ├── unsubscribe/
│   │   └── route.ts          # 退订API
│   └── resubscribe/
│       └── route.ts          # 重新订阅API
├── utils/
│   └── email-links.ts        # 邮件链接生成工具
├── services/
│   └── email-service.ts      # 邮件发送服务
└── examples/
    └── email-usage.ts        # 使用示例
```

## 快速开始

### 1. 环境变量配置

创建 `.env.local` 文件：

```env
# 邮件系统配置
EMAIL_SECRET=your-super-secret-key-here
BASE_URL=https://family-jp.info

# 邮件服务提供商配置（选择一个）
SENDGRID_API_KEY=your-sendgrid-api-key
# 或者
MAILGUN_API_KEY=your-mailgun-api-key
# 或者
AWS_SES_ACCESS_KEY=your-aws-access-key
AWS_SES_SECRET_KEY=your-aws-secret-key
```

### 2. 安装依赖

```bash
npm install @sendgrid/mail
# 或者
npm install mailgun.js
# 或者
npm install @aws-sdk/client-ses
```

### 3. 使用邮件服务

```typescript
import { EmailService } from './app/services/email-service';

const emailService = new EmailService(
  'https://family-jp.info',
  process.env.EMAIL_SECRET!
);

// 发送欢迎邮件
await emailService.sendWelcomeEmail('user@example.com', 'John Doe');

// 发送新闻通讯
await emailService.sendNewsletter('user@example.com', {
  title: 'Monthly Newsletter',
  content: '<p>This month\'s updates...</p>'
});
```

## 邮件链接格式

### 退订链接
```
https://family-jp.info/unsubscribe?email=user@example.com&token=abc123...
```

### 隐私政策链接
```
https://family-jp.info/privacy-policy
```

## 邮件模板示例

### HTML邮件模板
```html
<!DOCTYPE html>
<html>
<head>
  <title>Your Email Subject</title>
</head>
<body>
  <div style="max-width: 600px; margin: 0 auto;">
    <!-- 邮件内容 -->
    <h2>Welcome to Our Newsletter!</h2>
    <p>Thank you for subscribing...</p>
    
    <!-- 自动添加的页脚 -->
    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
      <p>You received this email because you subscribed to our newsletter.</p>
      <p>
        <a href="https://family-jp.info/unsubscribe?email=user@example.com&token=abc123">Unsubscribe</a> | 
        <a href="https://family-jp.info/privacy-policy">Privacy Policy</a>
      </p>
    </div>
  </div>
</body>
</html>
```

### 纯文本邮件模板
```
Welcome to Our Newsletter!

Thank you for subscribing to our newsletter. We're excited to have you on board!

You'll receive regular updates about:
- Latest product announcements
- Industry insights and tips
- Special offers and promotions
- Company news and updates

If you have any questions, feel free to reply to this email.

Best regards,
The Team

---
You received this email because you subscribed to our newsletter.

Unsubscribe: https://family-jp.info/unsubscribe?email=user@example.com&token=abc123
Privacy Policy: https://family-jp.info/privacy-policy

© 2024 Family JP. All rights reserved.
```

## 安全特性

### Token生成
- 使用HMAC-SHA256算法生成安全token
- 包含时间戳防止重放攻击
- 每个用户和邮件都有唯一的token

### 退订验证
- 验证token的有效性
- 检查token是否过期
- 防止恶意退订请求

## 合规性

### CAN-SPAM合规
- ✅ 包含清晰的退订链接
- ✅ 显示发件人信息
- ✅ 准确的邮件主题
- ✅ 包含物理地址（在隐私政策中）

### GDPR合规
- ✅ 明确的同意机制
- ✅ 简单的退订流程
- ✅ 数据访问和删除权利
- ✅ 透明的数据处理说明

## 自定义配置

### 修改邮件模板
编辑 `app/utils/email-links.ts` 中的 `generateEmailTemplate` 函数：

```typescript
export function generateEmailTemplate(
  subject: string,
  content: string,
  email: string,
  baseUrl: string,
  secret: string
): string {
  // 自定义您的邮件模板样式
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${subject}</title>
    </head>
    <body>
      <!-- 您的自定义模板 -->
      ${content}
      <!-- 自动添加的页脚 -->
    </body>
    </html>
  `;
}
```

### 集成邮件服务提供商

#### SendGrid集成
```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

await sgMail.send({
  to: emailData.to,
  from: 'noreply@family-jp.info',
  subject: emailData.subject,
  html: emailData.html,
  text: emailData.text
});
```

#### Mailgun集成
```typescript
import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData);
const client = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY! });

await client.messages.create('family-jp.info', {
  from: 'noreply@family-jp.info',
  to: emailData.to,
  subject: emailData.subject,
  html: emailData.html,
  text: emailData.text
});
```

## 测试

### 本地测试
1. 启动开发服务器：`npm run dev`
2. 访问退订页面：`http://localhost:3000/unsubscribe?email=test@example.com&token=test123`
3. 访问隐私政策页面：`http://localhost:3000/privacy-policy`

### 邮件发送测试
```typescript
import { emailUsageExample } from './app/examples/email-usage';

// 运行示例
await emailUsageExample();
```

## 部署注意事项

1. **环境变量**：确保在生产环境中设置正确的环境变量
2. **域名配置**：更新 `BASE_URL` 为您的生产域名
3. **邮件服务**：配置生产环境的邮件服务提供商
4. **数据库集成**：实现实际的数据库操作来存储用户订阅状态
5. **监控**：添加邮件发送监控和错误处理

## 故障排除

### 常见问题

1. **退订链接无效**
   - 检查 `EMAIL_SECRET` 环境变量是否正确设置
   - 验证token生成和验证逻辑

2. **邮件发送失败**
   - 检查邮件服务提供商的API密钥
   - 验证发件人邮箱地址已通过验证

3. **页面样式问题**
   - 确保Tailwind CSS正确配置
   - 检查响应式设计在不同设备上的表现

## 支持

如果您在使用过程中遇到问题，请：

1. 检查环境变量配置
2. 查看浏览器控制台错误信息
3. 检查服务器日志
4. 联系技术支持：support@family-jp.info

---

**注意**：这个系统已经为Family JP进行了定制，包含了正确的域名和联系信息。您可以根据具体需求进一步调整样式和内容。 