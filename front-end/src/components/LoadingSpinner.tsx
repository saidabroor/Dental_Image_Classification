import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function LoadingSpinner() {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center justify-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <div>
            <p className="text-lg font-medium text-gray-700">{t('loading.analyzing')}</p>
            <p className="text-sm text-gray-500">{t('loading.wait')}</p>
          </div>
        </div>
        
        <div className="mt-4 bg-gray-100 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
        </div>
      </div>
    </div>
  );
}