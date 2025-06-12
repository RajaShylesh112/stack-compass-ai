import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const learningPaths = [
  {
    title: 'Frontend Foundations',
    description: 'Master React, Next.js, and modern UI libraries.',
    level: 'Beginner',
    color: '#A26DF8',
  },
  {
    title: 'Backend Essentials',
    description: 'Learn Node.js, Express, and API design best practices.',
    level: 'Intermediate',
    color: '#A26DF8',
  },
  {
    title: 'Fullstack Pro',
    description: 'Combine frontend and backend skills for real-world projects.',
    level: 'Advanced',
    color: '#A26DF8',
  },
  {
    title: 'DevOps & Deployment',
    description: 'Automate, deploy, and scale your apps with modern tools.',
    level: 'Intermediate',
    color: '#A26DF8',
  },
];

const LearnPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f23] to-[#18181b]">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-8 text-gradient">Learning Paths</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {learningPaths.map((path) => (
            <div key={path.title} className="bg-[#18181b] border border-[#A26DF8] rounded-2xl p-6 shadow-lg hover:shadow-[#A26DF8]/20 transition-all">
              <h2 className="text-2xl font-semibold mb-2 text-[#A26DF8]">{path.title}</h2>
              <p className="text-gray-400 mb-4">{path.description}</p>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#A26DF8]/10 text-[#A26DF8]">{path.level}</span>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LearnPage;
