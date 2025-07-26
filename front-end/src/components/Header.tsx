import React from 'react';
import { Stethoscope } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';

export default function Header() {
  const { t } = useLanguage();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{t('header.title')}</h1>
              <p className="text-sm text-gray-600">{t('header.subtitle')}</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">{t('nav.home')}</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">{t('nav.about')}</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">{t('nav.contact')}</a>
            </nav>
            <LanguageToggle />
          </div>
        </div>
      </div>
    </header>
  );
}