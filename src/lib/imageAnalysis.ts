import { pipeline } from '@huggingface/transformers';

let captioningPipeline: any = null;

export async function initializeImageAnalysis() {
  if (!captioningPipeline) {
    try {
      console.log('Initializing image captioning model...');
      captioningPipeline = await pipeline(
        'image-to-text',
        'Xenova/vit-gpt2-image-captioning',
        { device: 'webgpu' }
      );
      console.log('Image captioning model initialized successfully');
    } catch (error) {
      console.warn('WebGPU not available, falling back to CPU');
      captioningPipeline = await pipeline(
        'image-to-text',
        'Xenova/vit-gpt2-image-captioning'
      );
    }
  }
  return captioningPipeline;
}

export async function analyzeImageMood(imageFile: File): Promise<{ mood: string; description: string }> {
  try {
    const pipeline = await initializeImageAnalysis();
    
    // Convert file to image element for processing
    const imageUrl = URL.createObjectURL(imageFile);
    const img = new Image();
    
    return new Promise((resolve, reject) => {
      img.onload = async () => {
        try {
          // Generate caption using the pipeline
          const results = await pipeline(img);
          const caption = results[0]?.generated_text || '';
          
          console.log('Generated caption:', caption);
          
          // Convert caption to mood
          const mood = extractMoodFromCaption(caption);
          
          // Create a more descriptive version
          const description = enhanceDescription(caption);
          
          URL.revokeObjectURL(imageUrl);
          resolve({ mood, description });
          
        } catch (error) {
          console.error('Error analyzing image:', error);
          URL.revokeObjectURL(imageUrl);
          reject(new Error('Failed to analyze image mood'));
        }
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(imageUrl);
        reject(new Error('Failed to load image'));
      };
      
      img.src = imageUrl;
    });
    
  } catch (error) {
    console.error('Error in image analysis:', error);
    throw new Error('Failed to initialize image analysis');
  }
}

function extractMoodFromCaption(caption: string): string {
  const moodMappings = {
    // Nature and outdoor scenes
    'sunset': 'romantic, peaceful, nostalgic',
    'sunrise': 'hopeful, energetic, fresh',
    'ocean': 'calm, peaceful, vast',
    'forest': 'mysterious, peaceful, natural',
    'mountain': 'majestic, adventurous, inspiring',
    'beach': 'relaxing, happy, carefree',
    'rain': 'melancholic, cozy, contemplative',
    'snow': 'peaceful, pure, cold',
    'clouds': 'dreamy, contemplative, peaceful',
    'flowers': 'happy, romantic, delicate',
    'garden': 'peaceful, natural, serene',
    
    // Animals
    'cat': 'cozy, peaceful, playful',
    'dog': 'happy, energetic, loyal',
    'bird': 'free, light, peaceful',
    
    // Urban and architectural
    'city': 'energetic, busy, urban',
    'building': 'structured, modern, ambitious',
    'street': 'urban, busy, dynamic',
    'bridge': 'connecting, transitional, architectural',
    
    // Indoor scenes
    'room': 'cozy, intimate, personal',
    'kitchen': 'warm, homey, nurturing',
    'bedroom': 'peaceful, intimate, restful',
    
    // Colors and lighting
    'dark': 'mysterious, moody, dramatic',
    'bright': 'happy, energetic, optimistic',
    'colorful': 'vibrant, happy, energetic',
    'black and white': 'classic, nostalgic, artistic',
    
    // Activities and objects
    'food': 'satisfying, social, comforting',
    'book': 'contemplative, peaceful, intellectual',
    'music': 'emotional, rhythmic, expressive',
    'art': 'creative, expressive, inspiring',
    'car': 'adventurous, freedom, dynamic',
    
    // People and emotions
    'smiling': 'happy, joyful, positive',
    'child': 'innocent, playful, joyful',
    'family': 'warm, loving, connected',
    'couple': 'romantic, intimate, loving',
    'group': 'social, energetic, connected',
    
    // Abstract concepts
    'vintage': 'nostalgic, classic, timeless',
    'modern': 'sleek, contemporary, minimalist',
    'old': 'nostalgic, weathered, historic',
    'new': 'fresh, optimistic, clean'
  };
  
  let detectedMoods: string[] = [];
  const lowerCaption = caption.toLowerCase();
  
  // Check for mood keywords in the caption
  for (const [keyword, mood] of Object.entries(moodMappings)) {
    if (lowerCaption.includes(keyword)) {
      detectedMoods.push(mood);
    }
  }
  
  // If no specific moods found, use general interpretation
  if (detectedMoods.length === 0) {
    if (lowerCaption.includes('water') || lowerCaption.includes('blue')) {
      detectedMoods.push('calm, peaceful');
    } else if (lowerCaption.includes('green') || lowerCaption.includes('tree')) {
      detectedMoods.push('natural, peaceful');
    } else if (lowerCaption.includes('red') || lowerCaption.includes('fire')) {
      detectedMoods.push('passionate, energetic');
    } else if (lowerCaption.includes('light') || lowerCaption.includes('white')) {
      detectedMoods.push('peaceful, pure');
    } else {
      detectedMoods.push('contemplative, artistic');
    }
  }
  
  // Combine and deduplicate moods
  const allMoods = detectedMoods.join(', ').split(', ');
  const uniqueMoods = [...new Set(allMoods)];
  
  return uniqueMoods.slice(0, 4).join(', ');
}

function enhanceDescription(caption: string): string {
  const enhancements = {
    'shows': 'reveals',
    'has': 'features',
    'is': 'appears to be',
    'picture': 'image',
    'photo': 'photograph'
  };
  
  let enhanced = caption;
  
  // Apply enhancements
  for (const [old, replacement] of Object.entries(enhancements)) {
    enhanced = enhanced.replace(new RegExp(`\\b${old}\\b`, 'gi'), replacement);
  }
  
  // Add emotional context based on content
  if (enhanced.includes('sunset') || enhanced.includes('sunrise')) {
    enhanced += ' The lighting creates a warm, contemplative atmosphere that evokes feelings of tranquility and reflection.';
  } else if (enhanced.includes('nature') || enhanced.includes('outdoor')) {
    enhanced += ' The natural setting suggests a sense of freedom and connection with the environment.';
  } else if (enhanced.includes('indoor') || enhanced.includes('room')) {
    enhanced += ' The intimate setting creates a cozy, personal atmosphere.';
  } else if (enhanced.includes('people') || enhanced.includes('person')) {
    enhanced += ' The human presence adds warmth and emotional connection to the scene.';
  } else {
    enhanced += ' This image captures a moment that speaks to deeper emotions and experiences.';
  }
  
  return enhanced;
}