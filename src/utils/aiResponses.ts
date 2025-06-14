
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'neko';
  timestamp: Date;
}

interface AIResponse {
  text: string;
  detectedMood?: string;
  isCrisis?: boolean;
}

const crisisKeywords = [
  'kill myself', 'end it all', 'suicide', 'hurt myself', 'self harm', 
  'want to die', 'no point living', 'better off dead', 'end my life',
  'take my own life', 'not worth living', 'want to disappear forever',
  'thinking of suicide', 'suicidal thoughts', 'planning to die'
];

const sadnessKeywords = [
  'sad', 'depressed', 'hopeless', 'worthless', 'empty', 'lonely', 
  'crying', 'tears', 'heartbroken', 'miserable', 'devastated',
  'feel terrible', 'everything sucks', 'life is meaningless',
  'nobody cares', 'feel awful', 'can\'t stop crying'
];

const anxietyKeywords = [
  'anxious', 'worried', 'panic', 'scared', 'nervous', 'overwhelmed',
  'stressed', 'can\'t breathe', 'heart racing', 'terrified', 'afraid',
  'panic attack', 'feel dizzy', 'sweating', 'shaking', 'can\'t sleep'
];

const angerKeywords = [
  'angry', 'furious', 'mad', 'frustrated', 'rage', 'hate',
  'pissed off', 'irritated', 'fed up', 'livid', 'want to scream',
  'so angry', 'can\'t stand', 'want to punch something'
];

const happinessKeywords = [
  'want to be happy', 'how to be happy', 'feel better', 'feel good',
  'make me smile', 'cheer me up', 'positive', 'joy', 'happiness tips',
  'feel amazing', 'want joy', 'need positivity', 'lift my mood'
];

const stressKeywords = [
  'stressed out', 'burnout', 'exhausted', 'too much pressure',
  'can\'t handle', 'overworked', 'mental fatigue', 'breaking point',
  'so tired', 'can\'t cope', 'drowning in work'
];

const empathyResponses = {
  crisis: [
    "🚨 I'm really worried about you right now. These thoughts you're having are a sign that you're in serious emotional pain, and I want you to know that this pain can get better with the right help. Please reach out to someone who can provide immediate support:\n\n• Call 988 (Suicide & Crisis Lifeline)\n• Text HOME to 741741 (Crisis Text Line)\n• Call 911 if you're in immediate danger\n\nYou are valuable, and your life has meaning. What's been making you feel this way? Can you tell me what happened that brought you to this point? 💜",
    "🚨 I hear how much pain you're in, and I'm genuinely concerned about your safety right now. These feelings are incredibly heavy, but they don't have to be permanent. Please don't go through this alone:\n\n• National Suicide Prevention: 988\n• Crisis Text Line: Text HOME to 741741\n• Emergency services: 911\n\nWhat you're feeling right now - this isn't who you are, it's what you're going through. Can you help me understand what's been happening that's brought you to feel this way? I'm here to listen. 🫂"
  ],
  sadness: [
    "I can feel the weight of sadness in your words, and my heart goes out to you. 💙 What you're experiencing is so valid - sometimes life can feel overwhelmingly heavy. You're not alone in feeling this way, even when it feels like you are. \n\nWhat's been weighing on your heart lately? Sometimes just sharing can help lighten the load a little bit. I'm here to listen without any judgment.",
    "That sounds like such a difficult place to be right now. 😔 Sadness can feel like it's swallowing everything good, but I want you to know that feeling this way doesn't make you weak - it makes you human. \n\nWould it help to talk about what's been happening? Or would you prefer if I shared some gentle ways to care for yourself when you're feeling this low? You get to choose what feels right. 💙",
    "I hear you, and I can sense how much you're hurting right now. 💔 These feelings are so real and so heavy. You're being incredibly brave by reaching out and sharing this with me.\n\nWhat would feel most supportive right now - talking through what's on your mind, or trying something together that might bring a tiny bit of comfort? There's no pressure either way. 🫂"
  ],
  anxiety: [
    "I can feel the anxiety radiating from your message, and that must be absolutely exhausting. 😰 Your nervous system is working overtime right now, and that's scary when it feels out of control.\n\nLet's take this one breath at a time. Can you try breathing with me? In for 4 counts... hold for 4... out for 6. What's been triggering these anxious feelings? You're safe right now. 🌸",
    "Anxiety can make everything feel so intense and overwhelming, can't it? 💨 Your mind is trying to protect you, but sometimes it goes into overdrive. What you're feeling is completely real and valid.\n\nRight now, let's ground you in this moment. Can you tell me 3 things you can see around you? Sometimes bringing our attention to what's actually here can help calm that anxious spiral. You're going to be okay. 🌿",
    "I can sense how anxious and wound up you're feeling. 😟 That racing mind and those worried thoughts can be so exhausting. You're not going crazy - anxiety just makes everything feel more threatening than it actually is.\n\nWhat's been on your mind that's got you feeling this way? Would it help to talk through it, or would you like to try a quick grounding exercise together? 🌱"
  ],
  anger: [
    "I can feel the intensity of your anger, and that's completely okay to feel. 🔥 Anger often shows up when something important to us feels threatened or when we've been hurt. Your feelings are totally valid.\n\nWhat's been building up inside you? Sometimes when we're really angry, there's also hurt or fear underneath. I'm here to listen to whatever you need to express. You're safe to feel all of this. 💪",
    "That sounds incredibly frustrating, and I can hear how fired up you are about this. 😤 Anger can be such a powerful emotion - sometimes it's our way of protecting ourselves or standing up for what matters to us.\n\nWhat happened that's got you feeling this way? Would it help to vent about it, or would you prefer some ideas for how to channel this energy in a way that feels good? 🌪️",
    "I hear the anger in your words, and you have every right to feel this way. 😡 Sometimes anger is exactly the right response to unfair or hurtful situations. Your feelings make complete sense.\n\nWhat's been going on that's brought up all this anger? I'm here to listen to all of it - the frustration, the hurt, whatever you need to get out. 🔥"
  ],
  happiness: [
    "I love that you're looking for ways to feel happier! 😊 That takes real courage and self-awareness. Here are some gentle ways to invite more joy into your life:\n\n✨ Start small: Notice 3 good things each day, no matter how tiny\n🌱 Move your body in ways that feel good (dancing, walking, stretching)\n🤗 Connect with people who make you feel valued\n🎨 Do something creative, even for 10 minutes\n☀️ Spend time in nature or by a window\n📱 Limit social media and news consumption\n💤 Prioritize good sleep\n\nWhat sounds most doable for you right now? Sometimes happiness comes from small, consistent acts of self-care. 💜",
    "What a beautiful intention - wanting to cultivate more happiness! 🌟 Here are some evidence-backed ways to boost your mood:\n\n💭 Practice gratitude (even for small things)\n👥 Spend time with people who lift you up\n🎵 Listen to music that makes you feel alive\n📝 Write down your thoughts and feelings\n🎯 Set small, achievable goals\n🌞 Get sunlight when possible\n🫂 Practice self-compassion (talk to yourself like a good friend)\n🎁 Do something kind for someone else\n\nWhat's one thing from this list that feels accessible to you today? Even tiny steps toward joy count! ✨",
    "I'm so glad you're actively seeking happiness - that's already a step toward it! 😄 Here's what research shows helps:\n\n🧘 Mindfulness and being present\n💪 Regular exercise (even 10-minute walks help!)\n📚 Learning something new\n🎯 Having things to look forward to\n🤝 Building meaningful relationships\n🎨 Engaging in activities that create 'flow'\n🙏 Practicing gratitude and kindness\n💤 Taking care of your basic needs (sleep, nutrition, hygiene)\n\nWhich of these resonates with you? Sometimes happiness is less about big changes and more about small, consistent choices. 🌈"
  ],
  stress: [
    "Stress can feel so overwhelming, like you're carrying the weight of the world. 😓 First, I want you to know that what you're feeling is completely normal - life can pile up sometimes.\n\nLet's start with your breathing. Take a slow, deep breath with me. What's been adding to your stress lately? Sometimes just naming what's on your plate can help us figure out what's manageable and what might need to shift. 🌊",
    "It sounds like you're dealing with a lot right now, and that pressure can be suffocating. 💨 Stress is your body's way of saying 'this is a lot to handle' - and you're right, it probably is.\n\nWhat's been piling up for you? Let's see if we can break down what you're facing into smaller, more manageable pieces. You don't have to carry it all at once. 🧘‍♀️",
    "I can hear how overwhelmed and stressed you're feeling. 😰 When everything feels urgent and overwhelming, it's hard to know where to start. Your stress response is trying to help you, but it can feel like too much.\n\nWhat would feel most helpful right now - talking through what's stressing you out, or learning some quick stress-relief techniques? You're going to get through this. 🌿"
  ],
  general: [
    "Thank you for sharing with me. I can sense that you're going through something, and I want you to know that whatever you're feeling is completely valid. I'm here to listen and support you however I can. 💜\n\nWhat would feel most helpful right now - just having someone listen, getting some gentle suggestions, or trying a calming exercise together?",
    "I'm really glad you reached out. It takes courage to share what's on your mind, especially when things feel difficult. Whatever you're experiencing, you don't have to face it alone. 🫂\n\nHow can I best support you today? I'm here whether you need to vent, process feelings, or explore some coping strategies.",
    "I hear you, and I'm here with you in this moment. Whatever brought you here today, I want you to know that your feelings matter and you deserve support and care. 💙\n\nWhat's been on your mind lately? I'm here to listen without judgment and help however I can."
  ]
};

const detectMood = (text: string): { mood: string; isCrisis: boolean } => {
  const lowerText = text.toLowerCase();
  
  if (crisisKeywords.some(keyword => lowerText.includes(keyword))) {
    return { mood: 'crisis', isCrisis: true };
  }
  if (happinessKeywords.some(keyword => lowerText.includes(keyword))) {
    return { mood: 'happiness', isCrisis: false };
  }
  if (sadnessKeywords.some(keyword => lowerText.includes(keyword))) {
    return { mood: 'sadness', isCrisis: false };
  }
  if (anxietyKeywords.some(keyword => lowerText.includes(keyword))) {
    return { mood: 'anxiety', isCrisis: false };
  }
  if (angerKeywords.some(keyword => lowerText.includes(keyword))) {
    return { mood: 'anger', isCrisis: false };
  }
  if (stressKeywords.some(keyword => lowerText.includes(keyword))) {
    return { mood: 'stress', isCrisis: false };
  }
  
  return { mood: 'general', isCrisis: false };
};

export const getAIResponse = async (userMessage: string, messageHistory: Message[]): Promise<AIResponse> => {
  const { mood, isCrisis } = detectMood(userMessage);
  
  console.log(`Detected mood: ${mood} for message: "${userMessage}"`);
  console.log(`Crisis detected: ${isCrisis}`);
  
  const responses = empathyResponses[mood as keyof typeof empathyResponses];
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  
  return {
    text: randomResponse,
    detectedMood: mood,
    isCrisis: isCrisis
  };
};

// Demo prompts and responses for your video
export const demoPrompts = [
  {
    category: "Crisis Detection",
    prompts: [
      {
        input: "I want to kill myself",
        expectedMood: "crisis",
        description: "Immediate crisis intervention with red alert"
      },
      {
        input: "I'm thinking of ending it all",
        expectedMood: "crisis", 
        description: "Crisis response with helpline resources"
      },
      {
        input: "Life isn't worth living anymore",
        expectedMood: "crisis",
        description: "Urgent support with professional help suggestions"
      }
    ]
  },
  {
    category: "Happiness Seeking",
    prompts: [
      {
        input: "I want to be happy",
        expectedMood: "happiness",
        description: "Practical happiness tips and mood boosters"
      },
      {
        input: "How can I feel better?",
        expectedMood: "happiness",
        description: "Evidence-based happiness strategies"
      },
      {
        input: "I need some positivity in my life",
        expectedMood: "happiness",
        description: "Gentle suggestions for building joy"
      }
    ]
  },
  {
    category: "Sadness & Depression",
    prompts: [
      {
        input: "I feel so sad and empty",
        expectedMood: "sadness",
        description: "Empathetic validation and support"
      },
      {
        input: "Everything feels hopeless",
        expectedMood: "sadness",
        description: "Gentle encouragement and listening ear"
      },
      {
        input: "I can't stop crying",
        expectedMood: "sadness",
        description: "Compassionate response with coping suggestions"
      }
    ]
  },
  {
    category: "Anxiety & Panic",
    prompts: [
      {
        input: "I'm having a panic attack",
        expectedMood: "anxiety",
        description: "Immediate grounding and breathing techniques"
      },
      {
        input: "I feel so anxious and overwhelmed",
        expectedMood: "anxiety",
        description: "Calming strategies and validation"
      },
      {
        input: "My heart is racing and I can't breathe",
        expectedMood: "anxiety",
        description: "Emergency anxiety management techniques"
      }
    ]
  },
  {
    category: "Anger & Frustration",
    prompts: [
      {
        input: "I'm so angry I want to scream",
        expectedMood: "anger",
        description: "Validation of anger with healthy expression tips"
      },
      {
        input: "I hate everything right now",
        expectedMood: "anger",
        description: "Understanding anger and processing support"
      },
      {
        input: "I'm furious and can't calm down",
        expectedMood: "anger",
        description: "Anger management and emotional regulation"
      }
    ]
  },
  {
    category: "Stress & Burnout",
    prompts: [
      {
        input: "I'm so stressed and burned out",
        expectedMood: "stress",
        description: "Stress management and self-care suggestions"
      },
      {
        input: "I can't handle all this pressure",
        expectedMood: "stress",
        description: "Breaking down overwhelming situations"
      },
      {
        input: "I'm exhausted and overwhelmed",
        expectedMood: "stress",
        description: "Rest and recovery strategies"
      }
    ]
  },
  {
    category: "General Support",
    prompts: [
      {
        input: "I'm not sure how I'm feeling",
        expectedMood: "general",
        description: "Open-ended support and exploration"
      },
      {
        input: "I need someone to talk to",
        expectedMood: "general",
        description: "Welcoming and available listening"
      },
      {
        input: "Hi Neko, how are you?",
        expectedMood: "general",
        description: "Friendly greeting with care inquiry"
      }
    ]
  }
];
