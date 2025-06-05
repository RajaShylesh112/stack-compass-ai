
import React, { useState } from 'react';
import { Search, Menu, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Compare', href: '#compare', hasDropdown: true },
    { label: 'Technologies', href: '#technologies', hasDropdown: true },
    { label: 'AI Suggestions', href: '/ai-recommendations' },
    { label: 'Analytics', href: '#analytics' },
    { label: 'Resources', href: '#resources', hasDropdown: true },
  ];

  return (
    <header className="relative z-50 w-full">
      {/* Main Header */}
      <div className="neumorphic-card mx-4 mt-4 px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-text font-poppins">Stackcompare</h1>
              <p className="text-xs text-text-secondary">Tech Stack Intelligence</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.href.startsWith('#') ? (
                  <a
                    href={item.href}
                    className="flex items-center space-x-1 text-text-secondary hover:text-text transition-colors duration-200 py-2"
                  >
                    <span className="font-medium">{item.label}</span>
                    {item.hasDropdown && (
                      <ArrowDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                    )}
                  </a>
                ) : (
                  <Link
                    to={item.href}
                    className="flex items-center space-x-1 text-text-secondary hover:text-text transition-colors duration-200 py-2"
                  >
                    <span className="font-medium">{item.label}</span>
                    {item.hasDropdown && (
                      <ArrowDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                    )}
                  </Link>
                )}
                {item.hasDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-48 neumorphic-card p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="space-y-2">
                      <a href="#" className="block text-text-secondary hover:text-text transition-colors">Frontend Frameworks</a>
                      <a href="#" className="block text-text-secondary hover:text-text transition-colors">Backend Solutions</a>
                      <a href="#" className="block text-text-secondary hover:text-text transition-colors">Databases</a>
                      <a href="#" className="block text-text-secondary hover:text-text transition-colors">DevOps Tools</a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-4 h-4" />
              <Input
                placeholder="Search technologies..."
                className="pl-10 pr-4 py-2 w-64 bg-secondary border border-gray-600 rounded-xl text-text placeholder-text-secondary focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
            <Link to="/ai-recommendations">
              <Button className="bg-accent hover:bg-accent/90 text-white px-6 py-2 rounded-xl font-medium transition-all duration-200 hover:shadow-lg">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden neumorphic-button p-2"
          >
            <Menu className="w-6 h-6 text-text" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-4 right-4 mt-2 neumorphic-card p-6 z-40">
          <div className="space-y-4">
            {navigationItems.map((item) => (
              item.href.startsWith('#') ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="block text-text-secondary hover:text-text transition-colors py-2 border-b border-gray-700 last:border-b-0"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className="block text-text-secondary hover:text-text transition-colors py-2 border-b border-gray-700 last:border-b-0"
                >
                  {item.label}
                </Link>
              )
            ))}
            <div className="pt-4 space-y-3">
              <Input
                placeholder="Search technologies..."
                className="w-full bg-secondary border border-gray-600 rounded-xl text-text placeholder-text-secondary"
              />
              <Link to="/ai-recommendations">
                <Button className="w-full bg-accent hover:bg-accent/90 text-white py-2 rounded-xl font-medium">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
