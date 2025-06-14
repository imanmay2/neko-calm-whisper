
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
      <Card className="bg-gray-800 border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">How are you feeling today?</h2>
        <p className="text-gray-300 text-center mb-6">
          Tracking your mood helps Neko understand you better and provide more personalized support.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {moods.map((mood) => (
            <Button
              key={mood.label}
              variant="ghost"
              className={`h-20 flex flex-col items-center justify-center space-y-2 hover:bg-gray-700 border-2 transition-all ${
                selectedMood === mood.label 
                  ? 'border-purple-500 bg-gray-700' 
                  : 'border-gray-600'
              }`}
              onClick={() => handleMoodSelect(mood)}
            >
              <span className="text-3xl">{mood.emoji}</span>
              <span className="text-gray-100 text-sm">{mood.label}</span>
            </Button>
          ))}
        </div>

        {selectedMood && (
          <div className="text-center">
            <p className="text-gray-300 mb-4">
              Thank you for sharing! I'm here to support you through whatever you're feeling. 💜
            </p>
            <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white">
              Get personalized support
            </Button>
          </div>
        )}
      </Card>

      {moodHistory.length > 0 && (
        <Card className="bg-gray-800 border-gray-700 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Your Mood Journey</h3>
          <div className="space-y-3">
            {moodHistory.map((entry, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-700 rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{entry.emoji}</span>
                  <span className="text-gray-100">{entry.mood}</span>
                </div>
                <span className="text-gray-400 text-sm">{entry.date}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
