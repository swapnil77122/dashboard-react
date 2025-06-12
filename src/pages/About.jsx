import { useState } from 'react';

export default function About() {
  const [showFAQ, setShowFAQ] = useState(false);
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !feedback.trim()) {
      console.warn('Please fill out both fields');
      return;
    }
    console.log('📥 Feedback Submitted:', { name, feedback });
    alert('✅ Feedback submitted! (Check console)');
    setName('');
    setFeedback('');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📊 About This Dashboard</h1>

      {/* Description */}
      <p className="text-gray-700 text-lg mb-4">
        This interactive dashboard helps visualize monthly business metrics like sales,
        revenue, and website traffic using intuitive graphs and tables. It is built for
        performance insights, executive overviews, and real-time data presentation.
      </p>

      {/* Tech Stack */}
      <div className="bg-gray-50 p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">🛠️ Built With:</h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 text-gray-600 text-sm list-disc pl-5">
          <li>React.js ⚛️</li>
          <li>Vite ⚡</li>
          <li>Tailwind CSS 💨</li>
          <li>Recharts 📈</li>
          <li>React Router 🌐</li>
          <li>JavaScript (ES6+) 🧠</li>
        </ul>
      </div>

      {/* Collapsible FAQ */}
      <div className="mb-6">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => setShowFAQ(!showFAQ)}
        >
          {showFAQ ? '🙈 Hide FAQ' : '❓ Show FAQ'}
        </button>
        {showFAQ && (
          <div className="mt-4 bg-white border rounded p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Frequently Asked Questions</h3>
            <ul className="list-disc text-sm text-gray-700 pl-6 space-y-1">
              <li>Can I download the data? → Yes, use the CSV download button in the Table page.</li>
              <li>Are graphs responsive? → Yes, they adapt to screen size using Recharts.</li>
              <li>Can I upload my data? → Coming soon in future versions!</li>
            </ul>
          </div>
        )}
      </div>

      {/* Feedback Form */}
      <div className="bg-white border p-6 rounded shadow">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">💬 Feedback</h3>
        <p className="text-sm text-gray-600 mb-4">
          We'd love to hear your thoughts or suggestions for improvements!
        </p>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded text-sm"
          />
          <textarea
            placeholder="Your Feedback"
            rows="4"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full border p-2 rounded text-sm"
          ></textarea>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
