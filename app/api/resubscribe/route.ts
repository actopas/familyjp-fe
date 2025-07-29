import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, token } = await request.json();

    if (!email || !token) {
      return NextResponse.json(
        { error: 'Email and token are required' },
        { status: 400 }
      );
    }

    // 验证token的有效性
    const isValidToken = await validateResubscribeToken(email, token);
    
    if (!isValidToken) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 400 }
      );
    }

    // 更新数据库中的用户订阅状态
    await updateUserSubscriptionStatus(email, true);

    // 记录重新订阅活动（可选）
    await logResubscribeActivity(email);

    return NextResponse.json(
      { message: 'Successfully resubscribed' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Resubscribe error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// 验证重新订阅token的函数
async function validateResubscribeToken(email: string, token: string): Promise<boolean> {
  // 这里应该实现您的token验证逻辑
  try {
    // 示例：验证token格式和有效性
    if (!token || token.length < 10) {
      return false;
    }
    
    // 这里应该调用您的数据库或服务来验证token
    // const isValid = await yourTokenValidationService.validate(email, token);
    // return isValid;
    
    // 临时返回true用于演示
    return true;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
}

// 更新用户订阅状态的函数
async function updateUserSubscriptionStatus(email: string, isSubscribed: boolean): Promise<void> {
  // 这里应该实现您的数据库更新逻辑
  try {
    // 示例：更新数据库中的用户订阅状态
    // await yourDatabaseService.updateUserSubscription(email, isSubscribed);
    console.log(`Updated subscription status for ${email}: ${isSubscribed}`);
  } catch (error) {
    console.error('Database update error:', error);
    throw error;
  }
}

// 记录重新订阅活动的函数（可选）
async function logResubscribeActivity(email: string): Promise<void> {
  try {
    // 这里可以记录重新订阅活动到日志或数据库
    console.log(`User ${email} resubscribed at ${new Date().toISOString()}`);
  } catch (error) {
    console.error('Logging error:', error);
    // 不抛出错误，因为这不是关键功能
  }
} 