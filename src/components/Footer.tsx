
import React from 'react';

const Footer = () => {
  const footerLinks = {
    'Platform': [
      'Compare Stacks',
      'AI Suggestions',
      'Technology Database',
      'Performance Analytics',
      'Team Collaboration'
    ],
    'Resources': [
      'Documentation',
      'API Reference',
      'Best Practices',
      'Case Studies',
      'Blog'
    ],
    'Community': [
      'Discord',
      'GitHub',
      'Twitter',
      'LinkedIn',
      'Newsletter'
    ],
    'Company': [
      'About Us',
      'Careers',
      'Contact',
      'Privacy Policy',
      'Terms of Service'
    ]
  };

  return (
    <footer className="px-4 py-16 border-t border-gray-700">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Logo & Description */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-text font-poppins">Stackcompare</h3>
                <p className="text-xs text-text-secondary">Tech Stack Intelligence</p>
              </div>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              Empowering developers and teams to make informed technology decisions with AI-powered insights and comprehensive comparisons.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 neumorphic-card rounded-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <span className="text-text-secondary text-sm">𝕏</span>
              </div>
              <div className="w-8 h-8 neumorphic-card rounded-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <span className="text-text-secondary text-sm">📱</span>
              </div>
              <div className="w-8 h-8 neumorphic-card rounded-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <span className="text-text-secondary text-sm">💼</span>
              </div>
              <div className="w-8 h-8 neumorphic-card rounded-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <span className="text-text-secondary text-sm">🐙</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h4 className="text-text font-semibold font-poppins">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-text-secondary hover:text-text transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16 neumorphic-card p-8">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-text font-poppins">Stay Updated</h3>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Get the latest technology trends, stack recommendations, and platform updates delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-secondary border border-gray-600 rounded-xl px-4 py-3 text-text placeholder-text-secondary focus:border-accent focus:ring-1 focus:ring-accent"
              />
              <button className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
          <p className="text-text-secondary text-sm">
            © 2024 Stackcompare. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <a href="#" className="text-text-secondary hover:text-text text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-text-secondary hover:text-text text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-text-secondary hover:text-text text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
