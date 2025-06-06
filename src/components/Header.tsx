
import React, { useState } from 'react';
import { Search, Menu, ArrowDown, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Home', href: '/' },
    { label: 'Stacks', href: '/stacks' },
    { 
      label: 'Compare', 
      href: '#', 
      hasDropdown: true,
      dropdownItems: [
        { label: 'Compare Tools/Frameworks', href: '/compare/tools' },
        { label: 'Compare Stacks', href: '/compare/stacks' }
      ]
    },
    { label: 'AI Assistant', href: '/ai-recommendations' },
    { 
      label: 'Insights', 
      href: '#', 
      hasDropdown: true,
      dropdownItems: [
        { label: 'Analytics Dashboard', href: '/analytics' },
        { label: 'Compatibility Explorer', href: '/insights/compatibility' }
      ]
    },
    { 
      label: 'Resources', 
      href: '#', 
      hasDropdown: true,
      dropdownItems: [
        { label: 'Documentation', href: '/resources/docs' },
        { label: 'Learning Paths', href: '/resources/learn' },
        { label: 'Best Practices', href: '/resources/best-practices' },
        { label: 'Glossary', href: '/resources/glossary' }
      ]
    },
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
          <nav className="hidden lg:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.href === '#' ? (
                  <button className="flex items-center space-x-1 text-text-secondary hover:text-text transition-colors duration-200 py-2">
                    <span className="font-medium">{item.label}</span>
                    {item.hasDropdown && (
                      <ArrowDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                    )}
                  </button>
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
                {item.hasDropdown && item.dropdownItems && (
                  <div className="absolute top-full left-0 mt-2 w-56 neumorphic-card p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 bg-secondary">
                    <div className="space-y-2">
                      {item.dropdownItems.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.label}
                          to={dropdownItem.href}
                          className="block text-text-secondary hover:text-text transition-colors py-2 px-2 rounded hover:bg-primary/20"
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Search and Profile */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-4 h-4" />
              <Input
                placeholder="Search technologies..."
                className="pl-10 pr-4 py-2 w-64 bg-secondary border border-gray-600 rounded-xl text-text placeholder-text-secondary focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
            <div className="relative group">
              <button className="neumorphic-button p-2">
                <User className="w-5 h-5 text-text" />
              </button>
              <div className="absolute top-full right-0 mt-2 w-48 neumorphic-card p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 bg-secondary">
                <div className="space-y-2">
                  <a href="#" className="block text-text-secondary hover:text-text transition-colors py-2">My Account</a>
                  <a href="#" className="block text-text-secondary hover:text-text transition-colors py-2">Preferences</a>
                  <a href="#" className="block text-text-secondary hover:text-text transition-colors py-2">Saved Comparisons</a>
                  <hr className="border-gray-600 my-2" />
                  <a href="#" className="block text-text-secondary hover:text-text transition-colors py-2">Logout</a>
                </div>
              </div>
            </div>
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
        <div className="lg:hidden absolute top-full left-4 right-4 mt-2 neumorphic-card p-6 z-40 bg-secondary">
          <div className="space-y-4">
            {navigationItems.map((item) => (
              <div key={item.label}>
                {item.href === '#' ? (
                  <div className="text-text-secondary py-2 border-b border-gray-700">
                    <span className="font-medium">{item.label}</span>
                    {item.dropdownItems && (
                      <div className="ml-4 mt-2 space-y-2">
                        {item.dropdownItems.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.label}
                            to={dropdownItem.href}
                            className="block text-text-secondary hover:text-text transition-colors py-1"
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className="block text-text-secondary hover:text-text transition-colors py-2 border-b border-gray-700"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-4 space-y-3">
              <Input
                placeholder="Search technologies..."
                className="w-full bg-secondary border border-gray-600 rounded-xl text-text placeholder-text-secondary"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
