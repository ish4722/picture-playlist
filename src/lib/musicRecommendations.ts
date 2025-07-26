interface Song {
  title: string;
  artist: string;
  spotify?: string;
  youtube?: string;
}

interface MoodSongMap {
  [key: string]: Song[];
}

const songDatabase: MoodSongMap = {
  // Calm, peaceful, serene moods
  calm: [
    { title: "Weightless", artist: "Marconi Union", spotify: "https://open.spotify.com/track/3k8hPpiHnKdLIgAUKV2Hng", youtube: "https://www.youtube.com/watch?v=UfcAVejslrU" },
    { title: "Clair de Lune", artist: "Claude Debussy", spotify: "https://open.spotify.com/track/0qksx8mV28lztYIZ1om8ml", youtube: "https://www.youtube.com/watch?v=CvFH_6DNRCY" },
    { title: "Mad World", artist: "Gary Jules", spotify: "https://open.spotify.com/track/4Sh2jIJjMB3k7E2TJWVZuR", youtube: "https://www.youtube.com/watch?v=4N3N1MlvVc4" },
    { title: "Holocene", artist: "Bon Iver", spotify: "https://open.spotify.com/track/4lRBNG9pJTibbAOnJjPDJ7", youtube: "https://www.youtube.com/watch?v=TWcyIpul8OE" },
  ],
  
  peaceful: [
    { title: "River", artist: "Joni Mitchell", spotify: "https://open.spotify.com/track/72KTyPUrz24KYMmGmhIaJz", youtube: "https://www.youtube.com/watch?v=3NH-ctddY9o" },
    { title: "The Night We Met", artist: "Lord Huron", spotify: "https://open.spotify.com/track/7qEHsqek33rTcFNT9PFqLf", youtube: "https://www.youtube.com/watch?v=KtlgYxa6BMU" },
    { title: "Yellow", artist: "Coldplay", spotify: "https://open.spotify.com/track/3AJwUDP919kvQ9QcozQPxg", youtube: "https://www.youtube.com/watch?v=yKNxeF4KMsY" },
    { title: "Breathe", artist: "Pink Floyd", spotify: "https://open.spotify.com/track/2ctvdKmETyOzPb2GiJJT53", youtube: "https://www.youtube.com/watch?v=mrojrDCI02k" },
  ],
  
  // Happy, energetic, upbeat moods
  happy: [
    { title: "Good as Hell", artist: "Lizzo", spotify: "https://open.spotify.com/track/1w6C2YqIHygosg9OY6v7Wl", youtube: "https://www.youtube.com/watch?v=SmbmeOgWsqE" },
    { title: "Walking on Sunshine", artist: "Katrina and the Waves", spotify: "https://open.spotify.com/track/05wIrZSwuaVWhcv5FfqeH0", youtube: "https://www.youtube.com/watch?v=iPUmE-tne5U" },
    { title: "Can't Stop the Feeling!", artist: "Justin Timberlake", spotify: "https://open.spotify.com/track/20I6sIOMTCkB6w7ryavxtO", youtube: "https://www.youtube.com/watch?v=ru0K8uYEZWw" },
    { title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", spotify: "https://open.spotify.com/track/32OlwWuMpZ6b0aN2RZOeMS", youtube: "https://www.youtube.com/watch?v=OPf0YbXqDm0" },
  ],
  
  energetic: [
    { title: "Pump It", artist: "The Black Eyed Peas", spotify: "https://open.spotify.com/track/3ZOEytgrvLwQaqXreDs2Jx", youtube: "https://www.youtube.com/watch?v=ZaI2IlHwmgQ" },
    { title: "Thunder", artist: "Imagine Dragons", spotify: "https://open.spotify.com/track/1zB4vmk8tFRmM9UULNzbLB", youtube: "https://www.youtube.com/watch?v=fKopy74weus" },
    { title: "High Hopes", artist: "Panic! At The Disco", spotify: "https://open.spotify.com/track/1Ub6VfiTXgyV8HnsfzrZzC", youtube: "https://www.youtube.com/watch?v=IPXIgEAGe4U" },
    { title: "Shut Up and Dance", artist: "Walk the Moon", spotify: "https://open.spotify.com/track/4kbj5MwxO1bq9wjT5g9HaA", youtube: "https://www.youtube.com/watch?v=6JCLY0Rlx6Q" },
  ],
  
  // Nostalgic, dreamy, romantic moods
  nostalgic: [
    { title: "Yesterday", artist: "The Beatles", spotify: "https://open.spotify.com/track/3BQHpFgAp4l80e1XslIjNI", youtube: "https://www.youtube.com/watch?v=wXTJBr9tt8Q" },
    { title: "The Sound of Silence", artist: "Simon & Garfunkel", spotify: "https://open.spotify.com/track/5qQpjj4TabrHlWWkdqa3gz", youtube: "https://www.youtube.com/watch?v=4zLfCnGVeL4" },
    { title: "Sweet Caroline", artist: "Neil Diamond", spotify: "https://open.spotify.com/track/38zsOOcu31XbbYj9BIPUF1", youtube: "https://www.youtube.com/watch?v=1vhFnTjia_I" },
    { title: "Take Me Home, Country Roads", artist: "John Denver", spotify: "https://open.spotify.com/track/10PqUAEJgIam9J9Q2u5267", youtube: "https://www.youtube.com/watch?v=1vrEljMfXYo" },
  ],
  
  dreamy: [
    { title: "Space Song", artist: "Beach House", spotify: "https://open.spotify.com/track/6p0oPwT8zM7o9WA9Q0aWmJ", youtube: "https://www.youtube.com/watch?v=f9X1C7pTu-M" },
    { title: "Pink Moon", artist: "Nick Drake", spotify: "https://open.spotify.com/track/6KnhWEJp5lkRtJa12C5MOF", youtube: "https://www.youtube.com/watch?v=irq959oNVww" },
    { title: "Sleepyhead", artist: "Passion Pit", spotify: "https://open.spotify.com/track/4nsKKjHBrldTwDNlaFv0ZS", youtube: "https://www.youtube.com/watch?v=T0RvPYRRRbE" },
    { title: "Night Changes", artist: "One Direction", spotify: "https://open.spotify.com/track/5Ohxk2dO5COHF1syuksUsk", youtube: "https://www.youtube.com/watch?v=syFZfO_wfMQ" },
  ],
  
  romantic: [
    { title: "Perfect", artist: "Ed Sheeran", spotify: "https://open.spotify.com/track/0tgVpDi06FyKpA1z0VMD4v", youtube: "https://www.youtube.com/watch?v=2Vv-BfVoq4g" },
    { title: "All of Me", artist: "John Legend", spotify: "https://open.spotify.com/track/3U4isOIWM3VvDubwSI3y7a", youtube: "https://www.youtube.com/watch?v=450p7goxZqg" },
    { title: "Make You Feel My Love", artist: "Adele", spotify: "https://open.spotify.com/track/7kt9e9LFSpN1zQtYRSq0g4", youtube: "https://www.youtube.com/watch?v=0put0_a--Ng" },
    { title: "Thinking Out Loud", artist: "Ed Sheeran", spotify: "https://open.spotify.com/track/1KiaBYMOzCBOjrIEIjGYgj", youtube: "https://www.youtube.com/watch?v=lp-EO5I60KA" },
  ],
  
  // Melancholic, sad moods
  melancholic: [
    { title: "Hurt", artist: "Johnny Cash", spotify: "https://open.spotify.com/track/5YbXkU50ZjCeRpD0JJ4tje", youtube: "https://www.youtube.com/watch?v=8AHCfZTRGiI" },
    { title: "Black", artist: "Pearl Jam", spotify: "https://open.spotify.com/track/1Pl6SEz83tU8LpKJW7HmMF", youtube: "https://www.youtube.com/watch?v=5ChbxMVgGV4" },
    { title: "Skinny Love", artist: "Bon Iver", spotify: "https://open.spotify.com/track/0afhq8XCExXpqazILNJM2K", youtube: "https://www.youtube.com/watch?v=ssdgFoHLwnk" },
    { title: "Mad About You", artist: "Sting", spotify: "https://open.spotify.com/track/1JNGGdYBFRW8TjgKwdgvn2", youtube: "https://www.youtube.com/watch?v=OMnaP_J_2Nk" },
  ],
  
  // Nature, outdoor moods
  nature: [
    { title: "Big Yellow Taxi", artist: "Joni Mitchell", spotify: "https://open.spotify.com/track/4cuOCCVB8E8fWAE8dFK1Cj", youtube: "https://www.youtube.com/watch?v=tvtJPs8IDgU" },
    { title: "Country Roads", artist: "John Denver", spotify: "https://open.spotify.com/track/10PqUAEJgIam9J9Q2u5267", youtube: "https://www.youtube.com/watch?v=1vrEljMfXYo" },
    { title: "Into the Wild", artist: "LP", spotify: "https://open.spotify.com/track/2CjHSlmVd5IzXZ5SuAZ8kw", youtube: "https://www.youtube.com/watch?v=LKaXY4IdZ40" },
    { title: "Fire on the Mountain", artist: "Grateful Dead", spotify: "https://open.spotify.com/track/7iqLkKUZR6O51lBTa9AkCN", youtube: "https://www.youtube.com/watch?v=prhJZyVkESQ" },
  ],
  
  // Dark, mysterious moods
  dark: [
    { title: "Paint It Black", artist: "The Rolling Stones", spotify: "https://open.spotify.com/track/63T7DJ1AFDD6Bn8VzG6JE8", youtube: "https://www.youtube.com/watch?v=O4irXQhgMqg" },
    { title: "Radioactive", artist: "Imagine Dragons", spotify: "https://open.spotify.com/track/4Zxdh4ms5HlMOOy14I4L4b", youtube: "https://www.youtube.com/watch?v=ktvTqknDobU" },
    { title: "Somebody That I Used to Know", artist: "Gotye", spotify: "https://open.spotify.com/track/2cGxRwrMyEAp8dEbuZaVv6", youtube: "https://www.youtube.com/watch?v=8UVNT4wvIGY" },
    { title: "Creep", artist: "Radiohead", spotify: "https://open.spotify.com/track/70LcF31zb1H0PyJoS1Sx1r", youtube: "https://www.youtube.com/watch?v=XFkzRNyygfk" },
  ]
};

export function getMoodBasedRecommendations(detectedMood: string): Song[] {
  const moodWords = detectedMood.toLowerCase().split(',').map(word => word.trim());
  
  let recommendations: Song[] = [];
  
  // Try to match mood words with our database
  for (const word of moodWords) {
    for (const [moodKey, songs] of Object.entries(songDatabase)) {
      if (word.includes(moodKey) || moodKey.includes(word)) {
        recommendations.push(...songs);
      }
    }
  }
  
  // If no matches found, provide default recommendations based on common mood types
  if (recommendations.length === 0) {
    if (moodWords.some(word => ['sad', 'melancholy', 'blue', 'down', 'lonely'].includes(word))) {
      recommendations = songDatabase.melancholic;
    } else if (moodWords.some(word => ['happy', 'joyful', 'bright', 'cheerful', 'upbeat'].includes(word))) {
      recommendations = songDatabase.happy;
    } else if (moodWords.some(word => ['peaceful', 'serene', 'quiet', 'tranquil'].includes(word))) {
      recommendations = songDatabase.peaceful;
    } else {
      // Fallback to calm mood
      recommendations = songDatabase.calm;
    }
  }
  
  // Remove duplicates and limit to 4-5 songs
  const uniqueRecommendations = recommendations.filter((song, index, self) => 
    index === self.findIndex(s => s.title === song.title && s.artist === song.artist)
  );
  
  return uniqueRecommendations.slice(0, 5);
}