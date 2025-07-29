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

    // 验证token的有效性（这里应该实现您的token验证逻辑）
    const isValidToken = await validateUnsubscribeToken(email, token);
    
    if (!isValidToken) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 400 }
      );
    }

    // 更新数据库中的用户订阅状态
    await updateUserSubscriptionStatus(email, false);

    // 记录退订活动（可选）
    await logUnsubscribeActivity(email);

    return NextResponse.json(
      { message: 'Successfully unsubscribed' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// 验证退订token的函数（需要根据您的实现来修改）
async function validateUnsubscribeToken(email: string, token: string): Promise<boolean> {
  // 这里应该实现您的token验证逻辑
  // 例如：检查token是否有效、是否过期等
  // 这只是一个示例实现
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

// 更新用户订阅状态的函数（需要根据您的实现来修改）
async function updateUserSubscriptionStatus(email: string, isSubscribed: boolean): Promise<void> {
  // 这里应该实现您的数据库更新逻辑
  // 例如：更新用户表中的订阅状态
  try {
    // 示例：更新数据库中的用户订阅状态
    // await yourDatabaseService.updateUserSubscription(email, isSubscribed);
    console.log(`Updated subscription status for ${email}: ${isSubscribed}`);
  } catch (error) {
    console.error('Database update error:', error);
    throw error;
  }
}

// 记录退订活动的函数（可选）
async function logUnsubscribeActivity(email: string): Promise<void> {
  try {
    // 这里可以记录退订活动到日志或数据库
    console.log(`User ${email} unsubscribed at ${new Date().toISOString()}`);
  } catch (error) {
    console.error('Logging error:', error);
    // 不抛出错误，因为这不是关键功能
  }
} 