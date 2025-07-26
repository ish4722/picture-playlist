import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  uploadedImage: string | null;
  onClearImage: () => void;
  isAnalyzing: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  uploadedImage,
  onClearImage,
  isAnalyzing
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onImageUpload(acceptedFiles[0]);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.gif']
    },
    multiple: false,
    disabled: isAnalyzing
  });

  if (uploadedImage) {
    return (
      <Card className="relative w-full max-w-md mx-auto overflow-hidden shadow-card">
        <div className="relative">
          <img
            src={uploadedImage}
            alt="Uploaded"
            className="w-full h-64 object-cover"
          />
          {!isAnalyzing && (
            <Button
              onClick={onClearImage}
              variant="outline"
              size="sm"
              className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          {isAnalyzing && (
            <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
                <div className="w-4 h-4 bg-primary rounded-full animate-pulse delay-100"></div>
                <div className="w-4 h-4 bg-primary rounded-full animate-pulse delay-200"></div>
              </div>
            </div>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-card">
      <div
        {...getRootProps()}
        className={`p-8 border-2 border-dashed rounded-lg transition-all duration-300 cursor-pointer
          ${isDragActive 
            ? 'border-primary bg-primary/5' 
            : 'border-border hover:border-primary/50 hover:bg-primary/5'
          }
          ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
            {isDragActive ? (
              <ImageIcon className="h-8 w-8 text-white" />
            ) : (
              <Upload className="h-8 w-8 text-white" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              {isDragActive ? 'Drop your image here' : 'Upload an image'}
            </h3>
            <p className="text-muted-foreground text-sm">
              Drag and drop an image, or click to browse
            </p>
            <p className="text-muted-foreground text-xs mt-1">
              Supports PNG, JPG, JPEG, WebP, GIF
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};