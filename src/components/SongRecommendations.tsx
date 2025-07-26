import React from 'react';
import { Card } from '@/components/ui/card';
import { Music, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Song {
  title: string;
  artist: string;
  spotify?: string;
  youtube?: string;
}

interface SongRecommendationsProps {
  songs: Song[];
}

export const SongRecommendations: React.FC<SongRecommendationsProps> = ({ songs }) => {
  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 shadow-card">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
          <Music className="h-4 w-4 text-white" />
        </div>
        <h3 className="text-xl font-semibold">Recommended Songs</h3>
      </div>
      
      <div className="space-y-4">
        {songs.map((song, index) => (
          <Card key={index} className="p-4 bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-foreground">
                  {song.title}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {song.artist}
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                {song.spotify && (
                  <Button
                    onClick={() => openLink(song.spotify!)}
                    variant="outline"
                    size="sm"
                    className="bg-[#1DB954] hover:bg-[#1ed760] text-white border-[#1DB954] hover:border-[#1ed760]"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Spotify
                  </Button>
                )}
                
                {song.youtube && (
                  <Button
                    onClick={() => openLink(song.youtube!)}
                    variant="outline"
                    size="sm"
                    className="bg-[#FF0000] hover:bg-[#cc0000] text-white border-[#FF0000] hover:border-[#cc0000]"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    YouTube
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};