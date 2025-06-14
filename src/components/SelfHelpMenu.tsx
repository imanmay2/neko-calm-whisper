
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BreathingExercise } from "@/components/BreathingExercise";

const exercises = [
  {
    id: 'breathing',
    title: '5-min Calm Down',
    description: 'Guided breathing to help you relax',
    emoji: '🫁',
    color: 'from-blue-400 to-cyan-400'
  },
  {
    id: 'grounding',
    title: 'Break the Overthinking Loop',
    description: '5-4-3-2-1 grounding technique',
    emoji: '🌱',
    color: 'from-green-400 to-emerald-400'
  },
  {
    id: 'sos',
    title: 'SOS: Feeling Panicky',
    description: 'Emergency coping strategies',
    emoji: '🆘',
    color: 'from-red-400 to-pink-400'
  },
  {
    id: 'journaling',
    title: 'Thought Journaling',
    description: 'Write down your thoughts and feelings',
    emoji: '📝',
    color: 'from-purple-400 to-purple-600'
  },
  {
    id: 'affirmations',
    title: 'Positive Affirmations',
    description: 'Gentle reminders of your worth',
    emoji: '💝',
    color: 'from-pink-400 to-rose-400'
  },
  {
    id: 'meditation',
    title: 'Mini Meditation',
    description: '3-minute mindfulness practice',
    emoji: '🧘‍♀️',
    color: 'from-indigo-400 to-purple-500'
  }
];

interface SelfHelpMenuProps {
  isDarkMode?: boolean;
}

export const SelfHelpMenu = ({ isDarkMode = true }: SelfHelpMenuProps) => {
  const [activeExercise, setActiveExercise] = useState<string | null>(null);

  if (activeExercise === 'breathing') {
    return <BreathingExercise onClose={() => setActiveExercise(null)} isDarkMode={isDarkMode} />;
  }

  return (
    <div className="space-y-6">
      <Card className={`backdrop-blur-md border p-6 relative overflow-hidden animate-fade-in transition-all duration-500 ${
        isDarkMode 
          ? 'bg-gray-800/90 border-gray-700/50' 
          : 'bg-white/90 border-gray-200/50'
      }`}>
        {/* Decorative background */}
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5' 
            : 'bg-gradient-to-br from-purple-200/10 via-transparent to-blue-200/10'
        }`}></div>
        <div className={`absolute top-0 left-1/2 w-64 h-64 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 ${
          isDarkMode 
            ? 'bg-gradient-to-b from-purple-500/10 to-transparent' 
            : 'bg-gradient-to-b from-purple-300/20 to-transparent'
        }`}></div>
        
        <div className="relative z-10">
          <h2 className={`text-2xl font-bold mb-4 text-center bg-gradient-to-r bg-clip-text text-transparent transition-all duration-500 ${
            isDarkMode 
              ? 'from-white to-purple-200' 
              : 'from-gray-800 to-purple-600'
          }`}>
            Self-Help Toolkit
          </h2>
          <p className={`text-center mb-6 transition-colors duration-500 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Choose an exercise that feels right for you in this moment. Remember, small steps count! 💜
          </p>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exercises.map((exercise, index) => (
          <Card 
            key={exercise.id}
            className={`backdrop-blur-md border p-6 transition-all duration-300 cursor-pointer group hover:scale-105 hover:shadow-xl animate-fade-in relative overflow-hidden ${
              isDarkMode 
                ? 'bg-gray-800/90 border-gray-700/50 hover:bg-gray-750/90' 
                : 'bg-white/90 border-gray-200/50 hover:bg-gray-50/90'
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => setActiveExercise(exercise.id)}
          >
            {/* Card background decoration */}
            <div className={`absolute inset-0 bg-gradient-to-br ${exercise.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
            
            <div className="flex items-start space-x-4 relative z-10">
              <div className={`w-12 h-12 bg-gradient-to-r ${exercise.color} rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
                <span className="animate-pulse">{exercise.emoji}</span>
              </div>
              <div className="flex-1">
                <h3 className={`text-lg font-semibold mb-2 group-hover:text-purple-200 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {exercise.title}
                </h3>
                <p className={`text-sm mb-4 transition-colors duration-300 ${
                  isDarkMode 
                    ? 'text-gray-300 group-hover:text-gray-200' 
                    : 'text-gray-600 group-hover:text-gray-700'
                }`}>
                  {exercise.description}
                </p>
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                >
                  Start Exercise
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className={`backdrop-blur-md border p-6 animate-fade-in relative overflow-hidden transition-all duration-500 ${
        isDarkMode 
          ? 'bg-gray-800/90 border-gray-700/50' 
          : 'bg-white/90 border-gray-200/50'
      }`}>
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-red-500/5 to-pink-500/5' 
            : 'bg-gradient-to-r from-red-200/10 to-pink-200/10'
        }`}></div>
        <div className={`absolute bottom-0 right-0 w-32 h-32 rounded-full blur-2xl ${
          isDarkMode 
            ? 'bg-gradient-to-tl from-red-500/10 to-transparent' 
            : 'bg-gradient-to-tl from-red-300/20 to-transparent'
        }`}></div>
        
        <div className="text-center relative z-10">
          <h3 className={`text-lg font-semibold mb-2 flex items-center justify-center transition-colors duration-500 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            <span className="mr-2 text-red-400">🚨</span>
            Need immediate help?
          </h3>
          <p className={`mb-4 transition-colors duration-500 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            If you're having thoughts of self-harm or suicide, please reach out for professional support.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              variant="outline" 
              className={`border transition-all duration-300 hover:scale-105 backdrop-blur-sm ${
                isDarkMode 
                  ? 'border-gray-600/50 text-gray-300 hover:bg-gray-700/50 hover:text-white' 
                  : 'border-gray-300/50 text-gray-600 hover:bg-gray-100/50 hover:text-gray-800'
              }`}
            >
              Crisis Text Line: Text HOME to 741741
            </Button>
            <Button 
              variant="outline" 
              className={`border transition-all duration-300 hover:scale-105 backdrop-blur-sm ${
                isDarkMode 
                  ? 'border-gray-600/50 text-gray-300 hover:bg-gray-700/50 hover:text-white' 
                  : 'border-gray-300/50 text-gray-600 hover:bg-gray-100/50 hover:text-gray-800'
              }`}
            >
              National Suicide Prevention: 988
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
