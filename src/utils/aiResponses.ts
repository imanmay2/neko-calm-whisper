
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'neko';
  timestamp: Date;
}

interface AIResponse {
  text: string;
  detectedMood?: string;
}

const crisisKeywords = [
  'kill myself', 'end it all', 'suicide', 'hurt myself', 'self harm', 
  'want to die', 'no point living', 'better off dead', 'end my life'
];

const sadnessKeywords = [
  'sad', 'depressed', 'hopeless', 'worthless', 'empty', 'lonely', 
  'crying', 'tears', 'heartbroken', 'miserable', 'devastated'
];

const anxietyKeywords = [
  'anxious', 'worried', 'panic', 'scared', 'nervous', 'overwhelmed',
  'stressed', 'can\'t breathe', 'heart racing', 'terrified', 'afraid'
];

const angerKeywords = [
  'angry', 'furious', 'mad', 'frustrated', 'rage', 'hate',
  'pissed off', 'irritated', 'fed up', 'livid'
];

const lonelinessKeywords = [
  'alone', 'lonely', 'isolated', 'no friends', 'nobody cares',
  'abandoned', 'left out', 'disconnected', 'no one understands'
];

const empathyResponses = {
  crisis: [
    "I'm really concerned about you right now. What you're feeling is incredibly painful, and I want you to know that you don't have to face this alone. Please consider reaching out to a crisis counselor at 988 (Suicide & Crisis Lifeline) or text HOME to 741741. You matter, and there are people who want to help. 💜",
    "Thank you for trusting me with these difficult feelings. I'm worried about your safety right now. Please reach out to someone who can provide immediate support - call 988 or text HOME to 741741. These feelings can change, even when they feel permanent. You're not alone in this. 🫂"
  ],
  sadness: [
    "I can hear how much pain you're in right now, and I'm so sorry you're feeling this way. Your feelings are completely valid. Sometimes when we're sad, it feels like it will never end, but feelings do shift and change. What's been weighing on your heart lately?",
    "That sounds incredibly difficult. I want you to know that feeling sad doesn't make you weak - it makes you human. You're brave for sharing this with me. Would it help to talk about what's been happening, or would you prefer some gentle coping strategies?",
    "I can feel the heaviness in your words. Sadness can be so overwhelming, like carrying an invisible weight. You don't have to carry it alone. I'm here with you. What would feel most supportive right now - talking it through or trying a calming exercise? 💙"
  ],
  anxiety: [
    "I can sense how anxious you're feeling, and that must be exhausting. Anxiety can make everything feel overwhelming and scary. You're safe right now, and we can work through this together. Take a deep breath with me - you're not alone in this feeling.",
    "Anxiety is so tough because it can make even small things feel huge and threatening. Your brain is trying to protect you, but sometimes it goes into overdrive. What you're feeling is real and valid. Would some breathing exercises help, or do you want to talk about what's triggering these feelings?",
    "I hear you, and I want you to know that anxiety, while terrifying, is temporary. Right now, let's focus on grounding you in this moment. Can you tell me 3 things you can see around you? Sometimes bringing our attention to the present can help calm that anxious spiral. 🌸"
  ],
  anger: [
    "It sounds like you're really frustrated and angry right now. Those are powerful emotions, and it makes complete sense that you'd feel this way given what you're going through. Anger often shows us that something important to us has been threatened or hurt. What's been building up?",
    "I can feel the intensity of your anger, and that's okay. Sometimes we need to feel angry - it can be our way of protecting ourselves or standing up for what matters to us. You're allowed to feel this way. What would help you process these feelings safely?",
    "Anger can be so consuming, can't it? It sounds like something really important to you has been affected. Your feelings are completely valid. Would it help to talk through what happened, or would you prefer to try something to help release some of that intense energy? 🔥"
  ],
  loneliness: [
    "Feeling alone and disconnected is one of the most painful human experiences. I hear you, and I want you to know that even though you feel alone, you're not invisible to me. Your feelings matter, and you matter. What's been making you feel most isolated lately?",
    "Loneliness can feel so overwhelming, like you're the only person in the world who feels this way. But the truth is, you're not alone in feeling lonely - so many people understand this pain. I'm here with you right now. What would help you feel a little less alone in this moment?",
    "That deep sense of loneliness you're describing sounds incredibly painful. Sometimes it can feel like no one truly sees or understands us. I see you, and I hear you. You reached out to me, which shows incredible strength. What does connection look like for you? 🤗"
  ],
  general: [
    "Thank you for sharing that with me. I can hear that you're going through something difficult. I'm here to listen and support you however I can. What would feel most helpful right now?",
    "I appreciate you opening up to me. It takes courage to share what you're feeling. Whatever you're going through, you don't have to face it alone. How can I best support you today?",
    "I'm glad you reached out. Sometimes just expressing what we're feeling can bring a little relief. I'm here to listen without judgment and help however I can. What's on your mind? 💜"
  ]
};

const detectMood = (text: string): string => {
  const lowerText = text.toLowerCase();
  
  if (crisisKeywords.some(keyword => lowerText.includes(keyword))) {
    return 'crisis';
  }
  if (sadnessKeywords.some(keyword => lowerText.includes(keyword))) {
    return 'sadness';
  }
  if (anxietyKeywords.some(keyword => lowerText.includes(keyword))) {
    return 'anxiety';
  }
  if (angerKeywords.some(keyword => lowerText.includes(keyword))) {
    return 'anger';
  }
  if (lonelinessKeywords.some(keyword => lowerText.includes(keyword))) {
    return 'loneliness';
  }
  
  return 'general';
};

export const getAIResponse = async (userMessage: string, messageHistory: Message[]): Promise<AIResponse> => {
  const detectedMood = detectMood(userMessage);
  
  console.log(`Detected mood: ${detectedMood} for message: "${userMessage}"`);
  
  const responses = empathyResponses[detectedMood as keyof typeof empathyResponses];
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  
  return {
    text: randomResponse,
    detectedMood: detectedMood
  };
};
