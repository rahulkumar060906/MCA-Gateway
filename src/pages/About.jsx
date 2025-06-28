import React from 'react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-100">
      {/* Platform Info */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">About MCA Gateway</h2>
        <p className="mb-4 text-lg">
          <strong>MCA Gateway</strong> is your personalized digital companion for NIMCET preparation. Whether you're just starting or deep into revision,
          this platform provides guided learning, mock tests, and chatbot support through <em>Astrix</em> — your AI mentor.
          With a structured path from beginner to advanced levels, MCA Gateway aims to simplify your journey to cracking NIMCET.
        </p>
      </div>

      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-purple-600 flex items-center justify-center gap-2">
          🎓 NIMCET 2026 – Complete Guide
        </h1>
        <p className="text-gray-600 text-lg mt-2 dark:text-gray-300">
          Your one-stop resource for the NIT MCA Common Entrance Test.
        </p>
      </div>

      {/* Banner */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-4 mb-10">
        <img
          src="src\assets\nimcet-banner.png"
          alt="NIMCET Banner"
          className="w-full rounded-md object-cover"
        />
      </div>

      {/* Exam Overview */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 mb-10">
        <h2 className="text-2xl font-bold text-purple-600 flex items-center gap-2 mb-4">
          📝 Exam Overview
        </h2>
        <table className="w-full text-left border-collapse text-sm text-gray-800 dark:text-gray-200">
          <tbody>
            <tr className="border-b border-gray-300 dark:border-gray-700">
              <td className="font-semibold py-2">Exam Name</td>
              <td className="py-2">NIMCET (NIT MCA Common Entrance Test)</td>
            </tr>
            <tr className="border-b border-gray-300 dark:border-gray-700">
              <td className="font-semibold py-2">Conducting Body</td>
              <td className="py-2">NITs</td>
            </tr>
            <tr className="border-b border-gray-300 dark:border-gray-700">
              <td className="font-semibold py-2">Mode of Exam</td>
              <td className="py-2">Online (CBT)</td>
            </tr>
            <tr className="border-b border-gray-300 dark:border-gray-700">
              <td className="font-semibold py-2">Duration</td>
              <td className="py-2">2 hours</td>
            </tr>
            <tr className="border-b border-gray-300 dark:border-gray-700">
              <td className="font-semibold py-2">Total Questions</td>
              <td className="py-2">120</td>
            </tr>
            <tr className="border-b border-gray-300 dark:border-gray-700">
              <td className="font-semibold py-2">Total Marks</td>
              <td className="py-2">1000</td>
            </tr>
            <tr className="border-b border-gray-300 dark:border-gray-700">
              <td className="font-semibold py-2">Negative Marking</td>
              <td className="py-2">Yes (25% deduction)</td>
            </tr>
            <tr className="border-b border-gray-300 dark:border-gray-700">
              <td className="font-semibold py-2">Medium of Exam</td>
              <td className="py-2">English</td>
            </tr>
            <tr className="border-b border-gray-300 dark:border-gray-700">
              <td className="font-semibold py-2">Course Offered</td>
              <td className="py-2">MCA</td>
            </tr>
            <tr className="border-b border-gray-300 dark:border-gray-700">
              <td className="font-semibold py-2">Approx Registration</td>
              <td className="py-2">50,000+</td>
            </tr>
            <tr className="border-b border-gray-300 dark:border-gray-700">
              <td className="font-semibold py-2">Seat Available</td>
              <td className="py-2">~805 (across 9–10 NITs)</td>
            </tr>
            <tr>
              <td className="font-semibold py-2">Application Fees</td>
              <td className="py-2">₹2500 (Gen/OBC/EWS), ₹1250 (SC/ST/PwD)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Important Dates - Timeline Style */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 mb-10">
        <h2 className="text-2xl font-bold text-purple-600 mb-6">📅 Important Dates (Tentative)</h2>
        <ol className="relative border-l border-gray-300 dark:border-gray-600 ml-4">
          <li className="mb-6 ml-6">
            <span className="absolute w-3 h-3 bg-purple-600 rounded-full -left-1.5 top-1"></span>
            <p className="font-semibold">Application Start: <span className="font-normal">March 2026</span></p>
          </li>
          <li className="mb-6 ml-6">
            <span className="absolute w-3 h-3 bg-purple-600 rounded-full -left-1.5 top-1"></span>
            <p className="font-semibold">Application End: <span className="font-normal">April 2026</span></p>
          </li>
          <li className="mb-6 ml-6">
            <span className="absolute w-3 h-3 bg-purple-600 rounded-full -left-1.5 top-1"></span>
            <p className="font-semibold">Admit Card Release: <span className="font-normal">May 2026</span></p>
          </li>
          <li className="mb-6 ml-6">
            <span className="absolute w-3 h-3 bg-purple-600 rounded-full -left-1.5 top-1"></span>
            <p className="font-semibold">Exam Date: <span className="font-normal">June 2026</span></p>
          </li>
          <li className="ml-6">
            <span className="absolute w-3 h-3 bg-purple-600 rounded-full -left-1.5 top-1"></span>
            <p className="font-semibold">Result Declaration: <span className="font-normal">July 2026</span></p>
          </li>
        </ol>
      </div>

      {/* Reservation Criteria - Table Style */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 mb-10">
        <h2 className="text-2xl font-bold text-purple-600 mb-4">📊 Reservation Criteria</h2>
        <table className="w-full text-left border-collapse text-sm text-gray-800 dark:text-gray-200">
          <thead>
            <tr>
              <th className="border-b border-gray-300 dark:border-gray-700 py-2">Category</th>
              <th className="border-b border-gray-300 dark:border-gray-700 py-2">Reservation %</th>
            </tr>
          </thead>
          <tbody >
            <tr className='bg-gray-300 dark:bg-blue-800'>
              <td className="py-2 px-4">SC</td>
              <td className="py-2">15%</td>
            </tr>
            <tr className='bg-gray-200 dark:bg-blue-700'>
              <td className="py-2 px-4">ST</td>
              <td className="py-2">7.5%</td>
            </tr>
            <tr className='bg-gray-300 dark:bg-blue-800'>
              <td className="py-2 px-4">OBC (Non-Creamy Layer)</td>
              <td className="py-2">27%</td>
            </tr>
            <tr className='bg-gray-200 dark:bg-blue-700'>
              <td className="py-2 px-4">EWS</td>
              <td className="py-2">10%</td>
            </tr>
            <tr className='bg-gray-300 dark:bg-blue-800'>
              <td className="py-2 px-4">PwD</td>
              <td className="py-2">5% (within each category)</td>
            </tr>
            <tr className='bg-gray-200 dark:bg-blue-700'>
              <td className="py-2 px-4">Kashmiri Migrants</td>
              <td className="py-2">3 seats</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Participating NITs */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 mb-10">
        <h2 className="text-2xl font-bold text-purple-600 mb-4">🏛️ Participating NITs</h2>
        <ul className="list-disc ml-6 text-gray-800 dark:text-gray-200">
          <li>NIT Agartala</li>
          <li>NIT Allahabad</li>
          <li>NIT Bhopal</li>
          <li>NIT Calicut</li>
          <li>NIT Jamshedpur</li>
          <li>NIT Kurukshetra</li>
          <li>NIT Raipur</li>
          <li>NIT Surathkal</li>
          <li>NIT Tiruchirappalli</li>
          <li>NIT Warangal</li>
        </ul>
      </div>

      {/* Preparation Resources */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 mb-10">
        <h2 className="text-2xl font-bold text-purple-600 mb-4">📚 Preparation Resources</h2>
        <ul className="list-disc ml-6 text-gray-800 dark:text-gray-200">
          <li>Previous Year Question Papers</li>
          <li>Mock Tests on MCA Gateway</li>
          <li>Subject-wise Notes</li>
          <li>Video Lectures or Coaching Services</li>
          <li>Time Management & Strategy Tips</li>
        </ul>
      </div>

      {/* Official Website */}
      <div className="mt-6 text-lg">
        🔗 Visit the official NIMCET website:{' '}
        <a href="https://nimcet.admissions.nic.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">
          https://nimcet.admissions.nic.in
        </a>
      </div>
    </div>
  );
}
