import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const docs = [
  {
    title: 'Getting Started',
    description: 'How to set up your first project, install dependencies, and run the app.',
    links: [
      { label: 'Installation', href: '#' },
      { label: 'Project Structure', href: '#' },
      { label: 'Configuration', href: '#' },
    ],
  },
  {
    title: 'Core Concepts',
    description: 'Understand the main building blocks of the platform.',
    links: [
      { label: 'Stacks & Technologies', href: '#' },
      { label: 'Comparisons', href: '#' },
      { label: 'AI Recommendations', href: '#' },
    ],
  },
  {
    title: 'Advanced Guides',
    description: 'Deep dives and best practices for advanced users.',
    links: [
      { label: 'Customizing Comparisons', href: '#' },
      { label: 'Integrations', href: '#' },
      { label: 'API Reference', href: '#' },
    ],
  },
];

const DocsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f23] to-[#18181b]">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-8 text-gradient">Documentation</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {docs.map((section) => (
            <div key={section.title} className="bg-[#18181b] border border-[#A26DF8] rounded-2xl p-6 shadow-lg hover:shadow-[#A26DF8]/20 transition-all">
              <h2 className="text-2xl font-semibold mb-2 text-[#A26DF8]">{section.title}</h2>
              <p className="text-gray-400 mb-4">{section.description}</p>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[#A26DF8] hover:underline hover:text-white transition-all">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DocsPage;
