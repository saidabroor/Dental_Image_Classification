import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import Header from './components/Header';
import ImageUpload from './components/ImageUpload';
import LoadingSpinner from './components/LoadingSpinner';
import AnalysisResult from './components/AnalysisResult';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import { analyzeToothImage } from './utils/mockAnalysis';

function AppContent() {
  const { t } = useLanguage();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    result: 'healthy' | 'caries';
    confidence: number;
  } | null>(null);

  const handleImageUpload = async (file: File) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    
    try {
      const result = await analyzeToothImage(file);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Analysis failed:', error);
      // Handle error appropriately
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setAnalysisResult(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section id="home" className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t('hero.title')}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                {t('hero.description')}
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-2xl mx-auto">
                <p className="text-sm text-yellow-800">
                  <strong>{t('hero.disclaimer')}</strong>
                </p>
              </div>
            </div>

            {/* Analysis Section */}
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold text-gray-900 text-center mb-8">
                {t('hero.analysis.title')}
              </h2>
              
              <ImageUpload 
                onImageUpload={handleImageUpload} 
                isAnalyzing={isAnalyzing}
              />
              
              {isAnalyzing && <LoadingSpinner />}
              
              <AnalysisResult 
                result={analysisResult?.result || null}
                confidence={analysisResult?.confidence}
              />
              
              {analysisResult && (
                <div className="text-center mt-6">
                  <button
                    onClick={resetAnalysis}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {t('result.analyze.again')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        <HowItWorks />
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;