
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const moods = [
  { emoji: "😊", label: "Happy", color: "from-yellow-400 to-orange-400" },
  { emoji: "😌", label: "Calm", color: "from-blue-400 to-cyan-400" },
  { emoji: "😔", label: "Sad", color: "from-blue-600 to-indigo-600" },
  { emoji: "😰", label: "Anxious", color: "from-red-400 to-pink-400" },
  { emoji: "😤", label: "Angry", color: "from-red-500 to-red-700" },
  { emoji: "😴", label: "Tired", color: "from-gray-400 to-gray-600" },
  { emoji: "🤔", label: "Confused", color: "from-purple-400 to-purple-600" },
  { emoji: "😭", label: "Overwhelmed", color: "from-indigo-500 to-purple-700" }
];

export const MoodSelector = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodHistory, setMoodHistory] = useState<Array<{date: string, mood: string, emoji: string}>>([]);

  const handleMoodSelect = (mood: typeof moods[0]) => {
    setSelectedMood(mood.label);
    const today = new Date().toLocaleDateString();
    setMoodHistory(prev => [
      { date: today, mood: mood.label, emoji: mood.emoji },
      ...prev.filter(entry => entry.date !== today)
    ].slice(0, 7));
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800/90 backdrop-blur-md border-gray-700/50 p-6 relative overflow-hidden animate-fade-in">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-2xl"></div>
        
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-white mb-4 text-center bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            How are you feeling today?
          </h2>
          <p className="text-gray-300 text-center mb-6">
            Tracking your mood helps Neko understand you better and provide more personalized support.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {moods.map((mood, index) => (
              <Button
                key={mood.label}
                variant="ghost"
                className={`h-20 flex flex-col items-center justify-center space-y-2 hover:bg-gray-700/50 border-2 transition-all duration-300 hover:scale-110 hover:shadow-lg animate-fade-in ${
                  selectedMood === mood.label 
                    ? 'border-purple-500 bg-gray-700/50 shadow-lg shadow-purple-500/25 scale-105' 
                    : 'border-gray-600/50 hover:border-purple-400/50'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleMoodSelect(mood)}
              >
                <span className="text-3xl transition-transform duration-300 hover:scale-125">{mood.emoji}</span>
                <span className="text-gray-100 text-sm">{mood.label}</span>
              </Button>
            ))}
          </div>

          {selectedMood && (
            <div className="text-center animate-fade-in">
              <div className="mb-4 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                <p className="text-gray-200 mb-4 text-lg">
                  Thank you for sharing! I'm here to support you through whatever you're feeling. 💜
                </p>
                <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full animate-pulse"></div>
              </div>
              <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
                Get personalized support
              </Button>
            </div>
          )}
        </div>
      </Card>

      {moodHistory.length > 0 && (
        <Card className="bg-gray-800/90 backdrop-blur-md border-gray-700/50 p-6 animate-fade-in relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <span className="mr-2">📊</span>
              Your Mood Journey
            </h3>
            <div className="space-y-3">
              {moodHistory.map((entry, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between bg-gray-700/50 backdrop-blur-sm rounded-lg p-3 transition-all duration-300 hover:bg-gray-700/70 hover:scale-102 animate-fade-in border border-gray-600/30"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl transition-transform duration-300 hover:scale-125">{entry.emoji}</span>
                    <span className="text-gray-100">{entry.mood}</span>
                  </div>
                  <span className="text-gray-400 text-sm">{entry.date}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
