'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { EMAIL_CONFIG } from '../config/email-config';

function UnsubscribeContent() {
  const [isUnsubscribed, setIsUnsubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const handleUnsubscribe = async () => {
    if (!email || !token) {
      alert('Invalid unsubscribe link. Please contact support.');
      return;
    }

    setIsLoading(true);
    
    try {
      // 调用外部退订API
      const response = await fetch(EMAIL_CONFIG.UNSUBSCRIBE_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          token,
        }),
      });

      if (response.ok) {
        setIsUnsubscribed(true);
      } else {
        alert('Failed to unsubscribe. Please try again or contact support.');
      }
    } catch (error) {
      console.error('Unsubscribe error:', error);
      alert('An error occurred. Please try again or contact support.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResubscribe = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch(EMAIL_CONFIG.RESUBSCRIBE_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          token,
        }),
      });

      if (response.ok) {
        setIsUnsubscribed(false);
      } else {
        alert('Failed to resubscribe. Please try again or contact support.');
      }
    } catch (error) {
      console.error('Resubscribe error:', error);
      alert('An error occurred. Please try again or contact support.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {isUnsubscribed ? 'Successfully Unsubscribed' : 'Unsubscribe from Emails'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isUnsubscribed 
              ? 'You have been successfully unsubscribed from our email list.'
              : 'We\'re sorry to see you go. You can resubscribe at any time.'
            }
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow rounded-lg">
          {email && (
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Email: <span className="font-medium">{email}</span>
              </p>
            </div>
          )}

          {!isUnsubscribed ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                By unsubscribing, you will no longer receive:
              </p>
              <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                <li>Newsletter updates</li>
                <li>Product announcements</li>
                <li>Special offers and promotions</li>
                <li>Company news and updates</li>
              </ul>
              
              <button
                onClick={handleUnsubscribe}
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Processing...' : 'Unsubscribe'}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  You have been successfully unsubscribed from our email list.
                </p>
              </div>
              
              <button
                onClick={handleResubscribe}
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Processing...' : 'Resubscribe'}
              </button>
            </div>
          )}
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            If you have any questions, please contact us at{' '}
            <a href={`mailto:${EMAIL_CONFIG.SUPPORT_EMAIL}`} className="text-blue-600 hover:text-blue-500">
              {EMAIL_CONFIG.SUPPORT_EMAIL}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <UnsubscribeContent />
    </Suspense>
  );
} 