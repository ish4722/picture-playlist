import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

interface MoodDisplayProps {
  mood: string;
  description: string;
}

export const MoodDisplay: React.FC<MoodDisplayProps> = ({ mood, description }) => {
  const moodWords = mood.split(',').map(word => word.trim()).filter(word => word.length > 0);

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 shadow-card bg-gradient-secondary">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center shadow-glow">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <h3 className="text-xl font-semibold">Detected Mood</h3>
      </div>
      
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {moodWords.map((word, index) => (
            <Badge 
              key={index} 
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
            >
              {word}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
};