import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Family JP</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/privacy-policy" className="text-gray-600 hover:text-gray-900">
                Privacy Policy
              </Link>
              <Link href="/unsubscribe" className="text-gray-600 hover:text-gray-900">
                Unsubscribe
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Welcome to Family JP
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Professional email management system with secure unsubscribe functionality and privacy compliance.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {/* Email System */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-3">Email System</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Professional email management with automated unsubscribe links and privacy compliance.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Secure unsubscribe functionality</li>
              <li>• Privacy policy compliance</li>
              <li>• GDPR and CAN-SPAM compliant</li>
            </ul>
          </div>

          {/* Unsubscribe Management */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-3">Unsubscribe Management</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Easy and secure unsubscribe process with user-friendly interface.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• One-click unsubscribe</li>
              <li>• Secure token verification</li>
              <li>• Resubscribe functionality</li>
            </ul>
          </div>

          {/* Privacy Compliance */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-3">Privacy Compliance</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Full compliance with international privacy regulations and standards.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• GDPR compliant</li>
              <li>• CAN-SPAM compliant</li>
              <li>• Transparent data handling</li>
            </ul>
          </div>
        </div>

        {/* API Information */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">API Endpoints</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Unsubscribe API</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <code className="text-sm text-gray-800">
                  POST https://email-test-gamma.vercel.app/api/unsubscribe
                </code>
                <p className="text-sm text-gray-600 mt-2">
                  Parameters: email, token
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Resubscribe API</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <code className="text-sm text-gray-800">
                  POST https://email-test-gamma.vercel.app/api/resubscribe
                </code>
                <p className="text-sm text-gray-600 mt-2">
                  Parameters: email, token
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Quick Access</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/unsubscribe?email=test@example.com&token=test123" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Test Unsubscribe Page
            </Link>
            <Link 
              href="/privacy-policy" 
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              View Privacy Policy
            </Link>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Support</h3>
              <p className="text-gray-600">
                For technical support and questions about our email system:
              </p>
              <a 
                href="mailto:support@family-jp.info" 
                className="text-blue-600 hover:text-blue-800"
              >
                support@family-jp.info
              </a>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Privacy</h3>
              <p className="text-gray-600">
                For privacy-related inquiries and data requests:
              </p>
              <a 
                href="mailto:privacy@family-jp.info" 
                className="text-blue-600 hover:text-blue-800"
              >
                privacy@family-jp.info
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-300">
              © 2024 Family JP. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Professional email management system with privacy compliance
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
