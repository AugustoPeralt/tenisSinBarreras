export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-tennis-900 mb-8">
        Privacy Policy
      </h1>
      
      <div className="prose prose-lg text-tennis-600">
        <p className="text-sm text-tennis-500 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-tennis-800 mb-4">Introduction</h2>
          <p className="mb-4">
            Tennis Travel Assistant ("we," "our," or "us") is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
            when you use our service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-tennis-800 mb-4">Information We Collect</h2>
          <h3 className="text-xl font-medium text-tennis-700 mb-3">Personal Information</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Name and email address (when you create an account)</li>
            <li>Travel preferences and tournament interests</li>
            <li>Search history and booking preferences</li>
          </ul>
          
          <h3 className="text-xl font-medium text-tennis-700 mb-3">Automatically Collected Information</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Device information and browser type</li>
            <li>IP address and location data</li>
            <li>Usage patterns and app interactions</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-tennis-800 mb-4">How We Use Your Information</h2>
          <ul className="list-disc pl-6">
            <li>Provide personalized tournament and travel recommendations</li>
            <li>Send notifications about tournaments and travel deals</li>
            <li>Improve our service and user experience</li>
            <li>Comply with legal obligations</li>
            <li>Protect against fraud and ensure security</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-tennis-800 mb-4">Data Sharing and Disclosure</h2>
          <p className="mb-4">We do not sell your personal information. We may share your information with:</p>
          <ul className="list-disc pl-6">
            <li>Travel booking partners (with your consent)</li>
            <li>Service providers who assist in app operations</li>
            <li>Legal authorities when required by law</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-tennis-800 mb-4">Tournament Data</h2>
          <p className="mb-4">
            We source tournament information from official tennis organizations (ATP, WTA, ITF) 
            and use this data solely for providing travel planning services. We respect all 
            intellectual property rights and API usage guidelines.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-tennis-800 mb-4">Data Security</h2>
          <p className="mb-4">
            We implement appropriate security measures to protect your information, including 
            encryption, secure servers, and regular security audits.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-tennis-800 mb-4">Your Rights</h2>
          <ul className="list-disc pl-6">
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Delete your account and data</li>
            <li>Opt out of marketing communications</li>
            <li>Export your data</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-tennis-800 mb-4">Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:privacy@tennistravelassistant.com" className="text-primary-600 hover:text-primary-700">
              privacy@tennistravelassistant.com
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
