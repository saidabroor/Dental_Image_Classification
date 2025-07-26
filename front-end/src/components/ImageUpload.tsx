import React, { useState, useRef } from 'react';
import { Upload, Camera, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  isAnalyzing: boolean;
}

export default function ImageUpload({ onImageUpload, isAnalyzing }: ImageUploadProps) {
  const { t } = useLanguage();
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onImageUpload(file);
    }
  };

  const clearImage = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        } ${isAnalyzing ? 'opacity-50 pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {previewUrl ? (
          <div className="relative">
            <img
              src={previewUrl}
              alt="Uploaded tooth"
              className="w-full h-48 object-cover rounded-lg"
            />
            <button
              onClick={clearImage}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
              disabled={isAnalyzing}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              {t('upload.title')}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              {t('upload.subtitle')}
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
              disabled={isAnalyzing}
            >
              <Upload className="w-4 h-4" />
              <span>{t('upload.button')}</span>
            </button>
          </>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
          disabled={isAnalyzing}
        />
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p className="font-medium mb-2">{t('upload.tips.title')}</p>
        <ul className="space-y-1 text-xs">
          <li>{t('upload.tips.lighting')}</li>
          <li>{t('upload.tips.clear')}</li>
          <li>{t('upload.tips.blur')}</li>
          <li>{t('upload.tips.clean')}</li>
        </ul>
      </div>
    </div>
  );
}