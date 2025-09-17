export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-tennis-900 mb-8">
        About Tennis Travel Assistant
      </h1>
      
      <div className="prose prose-lg">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-tennis-800 mb-4">Our Mission</h2>
          <p className="text-tennis-600 mb-4">
            Tennis Travel Assistant is a comprehensive platform designed to help tennis players, 
            coaches, and families plan their tournament travel efficiently and cost-effectively.
          </p>
          <p className="text-tennis-600">
            We combine real-time tournament data with intelligent travel recommendations to make 
            tournament planning seamless and enjoyable.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-tennis-800 mb-4">What We Offer</h2>
          <ul className="list-disc pl-6 text-tennis-600 space-y-2">
            <li>Comprehensive tournament calendars from ATP, WTA, ITF, and Challenger tours</li>
            <li>Intelligent flight search and booking recommendations</li>
            <li>Hotel suggestions near tournament venues</li>
            <li>Price tracking and alerts for travel deals</li>
            <li>Personalized recommendations based on player preferences</li>
            <li>Tournament travel planning tools and itineraries</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-tennis-800 mb-4">Data Sources</h2>
          <p className="text-tennis-600 mb-4">
            We source our tournament data from official tennis organizations including:
          </p>
          <ul className="list-disc pl-6 text-tennis-600 space-y-2">
            <li>ATP Tour - Official men's professional tennis</li>
            <li>WTA Tour - Official women's professional tennis</li>
            <li>ITF (International Tennis Federation) - Development tours and junior events</li>
            <li>ATP Challenger Tour - Men's development circuit</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-tennis-800 mb-4">Our Commitment</h2>
          <p className="text-tennis-600 mb-4">
            We are committed to providing accurate, up-to-date information while respecting 
            the intellectual property and guidelines of all tennis organizations.
          </p>
          <ul className="list-disc pl-6 text-tennis-600 space-y-2">
            <li>Use official data only for legitimate travel planning purposes</li>
            <li>Respect API rate limits and usage guidelines</li>
            <li>Provide proper attribution to data sources</li>
            <li>Maintain user privacy and data security</li>
            <li>Support the growth of tennis through better accessibility</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-tennis-800 mb-4">Technology</h2>
          <p className="text-tennis-600">
            Built with modern web technologies including Next.js, TypeScript, and Supabase, 
            ensuring a fast, secure, and reliable experience for all users.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-tennis-800 mb-4">Contact</h2>
          <p className="text-tennis-600">
            For questions, partnerships, or support, please contact us at{' '}
            <a href="mailto:contact@tennistravelassistant.com" className="text-primary-600 hover:text-primary-700">
              contact@tennistravelassistant.com
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
