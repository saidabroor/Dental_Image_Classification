import React from 'react';
import { CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface AnalysisResultProps {
  result: 'healthy' | 'caries' | null;
  confidence?: number;
}

export default function AnalysisResult({ result, confidence }: AnalysisResultProps) {
  const { t } = useLanguage();

  if (!result) return null;

  const isHealthy = result === 'healthy';

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <div className={`p-6 rounded-lg border-2 ${
        isHealthy 
          ? 'bg-green-50 border-green-200' 
          : 'bg-red-50 border-red-200'
      }`}>
        <div className="flex items-center space-x-3 mb-4">
          {isHealthy ? (
            <CheckCircle className="w-8 h-8 text-green-600" />
          ) : (
            <AlertTriangle className="w-8 h-8 text-red-600" />
          )}
          <div>
            <h3 className={`text-lg font-semibold ${
              isHealthy ? 'text-green-800' : 'text-red-800'
            }`}>
              {t('result.complete')}
            </h3>
            {confidence && (
              <p className="text-sm text-gray-600">
                {t('result.confidence')}: {Math.round(confidence * 100)}%
              </p>
            )}
          </div>
        </div>
        
        <div className={`text-center p-4 rounded-lg ${
          isHealthy ? 'bg-green-100' : 'bg-red-100'
        }`}>
          <p className="text-2xl mb-2">
            {isHealthy ? t('result.healthy.title') : t('result.caries.title')}
          </p>
          <p className={`text-lg font-medium ${
            isHealthy ? 'text-green-700' : 'text-red-700'
          }`}>
            {isHealthy ? t('result.healthy.subtitle') : t('result.caries.subtitle')}
          </p>
        </div>

        {!isHealthy && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>{t('result.recommendation')}</strong>
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start space-x-2">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">{t('result.disclaimer.title')}</p>
            <p>
              {t('result.disclaimer.text')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}