import React, { useState } from 'react';
import { ImageUpload } from '@/components/ImageUpload';
import { MoodDisplay } from '@/components/MoodDisplay';
import { SongRecommendations } from '@/components/SongRecommendations';
import { analyzeImageMood } from '@/lib/imageAnalysis';
import { getMoodBasedRecommendations } from '@/lib/musicRecommendations';
import { useToast } from '@/hooks/use-toast';
import { Music, Sparkles } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

interface Song {
  title: string;
  artist: string;
  spotify?: string;
  youtube?: string;
}

interface AnalysisResult {
  mood: string;
  description: string;
  songs: Song[];
}

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const handleImageUpload = async (file: File) => {
    try {
      // Create preview URL
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
      setAnalysisResult(null);
      setIsAnalyzing(true);

      toast({
        title: "Analyzing image...",
        description: "AI is detecting the mood and emotions in your image.",
      });

      // Analyze the image
      const { mood, description } = await analyzeImageMood(file);
      
      // Get song recommendations
      const songs = getMoodBasedRecommendations(mood);
      
      setAnalysisResult({ mood, description, songs });
      
      toast({
        title: "Analysis complete!",
        description: "Found the perfect songs to match your image's mood.",
      });
      
    } catch (error) {
      console.error('Error analyzing image:', error);
      toast({
        title: "Analysis failed",
        description: "Couldn't analyze the image. Please try another image.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClearImage = () => {
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage);
    }
    setUploadedImage(null);
    setAnalysisResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={heroImage} 
          alt="AI Music Recommendations" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/50 to-background"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4 px-4">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
                <Music className="h-6 w-6 text-white" />
              </div>
              <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center shadow-glow">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Mood Music AI
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
              Upload an image and discover songs that match its mood and emotion
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">How it works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI analyzes the visual elements, colors, and composition of your image to detect the underlying mood and emotions. 
            Then it recommends songs that perfectly match the atmosphere.
          </p>
        </div>

        {/* Image Upload */}
        <ImageUpload
          onImageUpload={handleImageUpload}
          uploadedImage={uploadedImage}
          onClearImage={handleClearImage}
          isAnalyzing={isAnalyzing}
        />

        {/* Results */}
        {analysisResult && (
          <div className="space-y-8">
            <MoodDisplay 
              mood={analysisResult.mood}
              description={analysisResult.description}
            />
            
            <SongRecommendations songs={analysisResult.songs} />
          </div>
        )}

        {/* Instructions */}
        {!uploadedImage && (
          <div className="max-w-2xl mx-auto text-center space-y-6 pt-8">
            <h3 className="text-xl font-semibold">Get Started</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="space-y-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-glow">
                  <span className="text-white font-bold">1</span>
                </div>
                <h4 className="font-medium">Upload Image</h4>
                <p className="text-muted-foreground">Choose any photo that captures a moment or feeling</p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center mx-auto shadow-glow">
                  <span className="text-white font-bold">2</span>
                </div>
                <h4 className="font-medium">AI Analysis</h4>
                <p className="text-muted-foreground">Our AI detects the mood and emotional context</p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-glow">
                  <span className="text-white font-bold">3</span>
                </div>
                <h4 className="font-medium">Get Recommendations</h4>
                <p className="text-muted-foreground">Discover songs that match the detected mood</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;