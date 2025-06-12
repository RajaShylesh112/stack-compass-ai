import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const bestPractices = [
  {
    title: 'Keep Dependencies Updated',
    description: 'Regularly update your stack dependencies to benefit from security patches and new features.',
  },
  {
    title: 'Use Environment Variables',
    description: 'Store sensitive configuration in environment variables, not in your codebase.',
  },
  {
    title: 'Automate Testing',
    description: 'Set up automated tests to catch bugs early and ensure reliability.',
  },
  {
    title: 'Document Your Stack',
    description: 'Maintain clear documentation for your stack choices and architecture.',
  },
];

const BestPracticesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f23] to-[#18181b]">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-8 text-gradient">Best Practices</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {bestPractices.map((practice) => (
            <div key={practice.title} className="bg-[#18181b] border border-[#A26DF8] rounded-2xl p-6 shadow-lg hover:shadow-[#A26DF8]/20 transition-all">
              <h2 className="text-2xl font-semibold mb-2 text-[#A26DF8]">{practice.title}</h2>
              <p className="text-gray-400">{practice.description}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BestPracticesPage;
