export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-tennis-900 mb-8">
        Terms of Service
      </h1>
      
      <div className="prose prose-lg text-tennis-600">
        <p className="text-sm text-tennis-500 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-tennis-800 mb-4">Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing and using Tennis Travel Assistant, you accept and agree to be bound by 
            these Terms of Service and our Privacy Policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-tennis-800 mb-4">Description of Service</h2>
          <p className="mb-4">
            Tennis Travel Assistant provides tournament information and travel planning tools 
            for tennis players, coaches, and families. Our service includes:
          </p>
          <ul className="list-disc pl-6">
            <li>Tournament calendars and information</li>
            <li>Travel search and booking recommendations</li>
            <li>Price tracking and alerts</li>
            <li>Personalized tournament suggestions</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-tennis-800 mb-4">User Responsibilities</h2>
          <ul className="list-disc pl-6">
            <li>Provide accurate information when creating accounts</li>
            <li>Use the service only for legitimate travel planning purposes</li>
            <li>Respect intellectual property rights of tournament data sources</li>
            <li>Not attempt to scrape or misuse tournament data</li>
            <li>Comply with all applicable laws and regulations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-tennis-800 mb-4">Tournament Data Usage</h2>
          <p className="mb-4">
            Tournament information is sourced from official tennis organizations and is provided 
            for informational and travel planning purposes only. Users agree to:
          </p>
          <ul className="list-disc pl-6">
            <li>Use tournament data only for personal travel planning</li>
            <li>Not redistribute or resell tournament information</li>
            <li>Respect the terms of use of original data sources</li>
            <li>Acknowledge that tournament details may change</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-tennis-800 mb-4">Travel Bookings</h2>
          <p className="mb-4">
            We provide travel recommendations and may facilitate bookings through third-party partners. 
            We are not responsible for:
          </p>
          <ul className="list-disc pl-6">
            <li>Travel service quality or availability</li>
            <li>Changes in prices or booking conditions</li>
            <li>Cancellations or delays</li>
            <li>Third-party booking policies</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-tennis-800 mb-4">Limitation of Liability</h2>
          <p className="mb-4">
            Tennis Travel Assistant provides information "as is" without warranties. We are not 
            liable for any damages resulting from use of our service, including but not limited to 
            travel disruptions, tournament changes, or booking issues.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-tennis-800 mb-4">Intellectual Property</h2>
          <p className="mb-4">
            We respect the intellectual property rights of tennis organizations and expect users 
            to do the same. Tournament data is used under appropriate licensing agreements and 
            fair use principles.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-tennis-800 mb-4">Modifications</h2>
          <p className="mb-4">
            We reserve the right to modify these terms at any time. Users will be notified of 
            significant changes via email or app notifications.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-tennis-800 mb-4">Contact</h2>
          <p>
            For questions about these Terms of Service, please contact us at{' '}
            <a href="mailto:legal@tennistravelassistant.com" className="text-primary-600 hover:text-primary-700">
              legal@tennistravelassistant.com
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
