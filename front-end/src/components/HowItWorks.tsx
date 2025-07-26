import React from 'react';
import { Brain, Camera, Shield, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: Camera,
      title: t('how.step1.title'),
      description: t('how.step1.desc')
    },
    {
      icon: Brain,
      title: t('how.step2.title'),
      description: t('how.step2.desc')
    },
    {
      icon: Zap,
      title: t('how.step3.title'),
      description: t('how.step3.desc')
    },
    {
      icon: Shield,
      title: t('how.step4.title'),
      description: t('how.step4.desc')
    }
  ];

  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('how.title')}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('how.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('how.tech.title')}</h3>
          <p className="text-gray-600 leading-relaxed">
            {t('how.tech.desc')}
          </p>
        </div>
      </div>
    </section>
  );
}