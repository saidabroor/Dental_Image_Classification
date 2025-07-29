import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "ko";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    "header.title": "ToothHealth.AI",
    "header.subtitle": "AI-Powered Dental Health Assistant",
    "nav.home": "Home",
    "nav.about": "About",
    "nav.contact": "Contact",

    // Hero Section
    "hero.title": "🦷 Welcome to ToothHealth.AI",
    "hero.description":
      "Your AI-powered dental health assistant. Upload a photo of your tooth and get instant analysis to check for signs of decay or health issues.",
    "hero.analysis.title": "Tooth Health Analysis",

    // Image Upload
    "upload.title": "Upload a tooth photo",
    "upload.subtitle": "Drag and drop or click to select",
    "upload.button": "Choose File",
    "upload.tips.title": "📸 Tips for best results:",
    "upload.tips.lighting": "• Use good lighting",
    "upload.tips.clear": "• Show the tooth clearly",
    "upload.tips.blur": "• Avoid blurry or distant photos",
    "upload.tips.clean": "• Clean the tooth area before taking photo",

    // Loading
    "loading.analyzing": "Analyzing tooth...",
    "loading.wait": "This may take a few seconds",

    // Results
    "result.complete": "Analysis Complete",
    "result.confidence": "Confidence",
    "result.healthy.title": "🦷 The tooth looks healthy!",
    "result.healthy.subtitle": "No signs of decay ✅",
    "result.caries.title": "🦷 Signs of caries detected",
    "result.caries.subtitle": "Tooth decay detected ❌",
    "result.recommendation":
      "Recommendation: Please consult with a dental professional for proper diagnosis and treatment.",
    "result.disclaimer.title": "Important Disclaimer",
    "result.disclaimer.text":
      "This is an AI analysis for informational purposes only and should not replace professional dental examination. Always consult with a qualified dentist for accurate diagnosis and treatment.",
    "result.analyze.again": "Analyze Another Photo",

    // How It Works
    "how.title": "How It Works",
    "how.description":
      "Our AI-powered system uses advanced deep learning technology trained on thousands of dental images to help identify potential tooth decay and health issues.",
    "how.step1.title": "Upload Photo",
    "how.step1.desc": "Take a clear photo of the tooth you want to analyze",
    "how.step2.title": "AI Analysis",
    "how.step2.desc":
      "Our deep learning model analyzes the image for signs of decay",
    "how.step3.title": "Instant Results",
    "how.step3.desc": "Get immediate feedback on tooth health status",
    "how.step4.title": "Professional Advice",
    "how.step4.desc": "Receive recommendations for next steps if needed",
    "how.tech.title": "About Our Technology",
    "how.tech.desc":
      "ToothHealth.AI is powered by a state-of-the-art convolutional neural network trained on a comprehensive dataset of dental images. Our model can distinguish between healthy teeth and those showing signs of caries (tooth decay) with high accuracy. The system analyzes various visual indicators including discoloration, surface texture, and structural changes that may indicate dental health issues.",

    // Footer
    "footer.description":
      "Advanced AI technology for dental health screening. Helping people take better care of their oral health with instant, intelligent analysis.",
    "footer.contact": "Contact Us",
    "footer.notice.title": "Important Notice",
    "footer.notice.text":
      "This tool is for educational and screening purposes only. Always consult with a qualified dental professional for accurate diagnosis and treatment.",
    "footer.made": "Made with",
    "footer.for": "for better dental health",
    "footer.rights": "© 2025 ToothHealth.AI. All rights reserved.",
  },
  ko: {
    // Header
    "header.title": "ToothHealth.AI",
    "header.subtitle": "AI 기반 치아 건강 도우미",
    "nav.home": "홈",
    "nav.about": "소개",
    "nav.contact": "연락처",

    // Hero Section
    "hero.title": "🦷 ToothHealth.AI에 오신 것을 환영합니다",
    "hero.description":
      "AI 기반 치아 건강 도우미입니다. 치아 사진을 업로드하여 충치나 건강 문제의 징후를 즉시 분석받으세요.",
    "hero.analysis.title": "치아 건강 분석",

    // Image Upload
    "upload.title": "치아 사진 업로드",
    "upload.subtitle": "드래그 앤 드롭하거나 클릭하여 선택",
    "upload.button": "파일 선택",
    "upload.tips.title": "📸 최상의 결과를 위한 팁:",
    "upload.tips.lighting": "• 좋은 조명 사용",
    "upload.tips.clear": "• 치아를 명확하게 보여주기",
    "upload.tips.blur": "• 흐리거나 멀리서 찍은 사진 피하기",
    "upload.tips.clean": "• 사진 촬영 전 치아 부위 청소",

    // Loading
    "loading.analyzing": "치아 분석 중...",
    "loading.wait": "몇 초 정도 소요될 수 있습니다",

    // Results
    "result.complete": "분석 완료",
    "result.confidence": "신뢰도",
    "result.healthy.title": "🦷 치아가 건강해 보입니다!",
    "result.healthy.subtitle": "충치 징후 없음 ✅",
    "result.caries.title": "🦷 충치 징후가 감지되었습니다",
    "result.caries.subtitle": "치아 충치 감지됨 ❌",
    "result.recommendation":
      "권장사항: 정확한 진단과 치료를 위해 치과 전문의와 상담하시기 바랍니다.",
    "result.disclaimer.title": "중요한 면책조항",
    "result.disclaimer.text":
      "이것은 정보 제공 목적의 AI 분석이며 전문적인 치과 검진을 대체할 수 없습니다. 정확한 진단과 치료를 위해서는 항상 자격을 갖춘 치과의사와 상담하세요.",
    "result.analyze.again": "다른 사진 분석하기",

    // How It Works
    "how.title": "작동 원리",
    "how.description":
      "저희 AI 기반 시스템은 수천 장의 치과 이미지로 훈련된 고급 딥러닝 기술을 사용하여 잠재적인 치아 충치와 건강 문제를 식별하는 데 도움을 줍니다.",
    "how.step1.title": "사진 업로드",
    "how.step1.desc": "분석하고 싶은 치아의 선명한 사진을 촬영하세요",
    "how.step2.title": "AI 분석",
    "how.step2.desc": "딥러닝 모델이 충치 징후를 찾기 위해 이미지를 분석합니다",
    "how.step3.title": "즉시 결과",
    "how.step3.desc": "치아 건강 상태에 대한 즉각적인 피드백을 받으세요",
    "how.step4.title": "전문가 조언",
    "how.step4.desc": "필요시 다음 단계에 대한 권장사항을 받으세요",
    "how.tech.title": "저희 기술 소개",
    "how.tech.desc":
      "ToothHealth.AI는 포괄적인 치과 이미지 데이터셋으로 훈련된 최첨단 합성곱 신경망으로 구동됩니다. 저희 모델은 건강한 치아와 충치(치아 충치) 징후를 보이는 치아를 높은 정확도로 구별할 수 있습니다. 시스템은 치아 건강 문제를 나타낼 수 있는 변색, 표면 질감, 구조적 변화를 포함한 다양한 시각적 지표를 분석합니다.",

    // Footer
    "footer.description":
      "치아 건강 스크리닝을 위한 고급 AI 기술. 즉각적이고 지능적인 분석으로 사람들이 구강 건강을 더 잘 관리할 수 있도록 돕습니다.",
    "footer.contact": "연락처",
    "footer.notice.title": "중요 공지",
    "footer.notice.text":
      "이 도구는 교육 및 스크리닝 목적으로만 사용됩니다. 정확한 진단과 치료를 위해서는 항상 자격을 갖춘 치과 전문의와 상담하세요.",
    "footer.made": "더 나은 치아 건강을 위해",
    "footer.for": "사랑으로 제작",
    "footer.rights": "© 2025 ToothHealth.AI. 모든 권리 보유.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return (
      translations[language][key as keyof (typeof translations)["en"]] || key
    );
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
