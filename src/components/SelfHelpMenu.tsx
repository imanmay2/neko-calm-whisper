
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

export const SelfHelpMenu = () => {
  const [activeExercise, setActiveExercise] = useState<string | null>(null);

  if (activeExercise === 'breathing') {
    return <BreathingExercise onClose={() => setActiveExercise(null)} />;
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Self-Help Toolkit</h2>
        <p className="text-gray-300 text-center mb-6">
          Choose an exercise that feels right for you in this moment. Remember, small steps count! 💜
        </p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exercises.map((exercise) => (
          <Card 
            key={exercise.id}
            className="bg-gray-800 border-gray-700 p-6 hover:bg-gray-750 transition-all cursor-pointer group"
            onClick={() => setActiveExercise(exercise.id)}
          >
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${exercise.color} rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                {exercise.emoji}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">{exercise.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{exercise.description}</p>
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
                >
                  Start Exercise
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="bg-gray-800 border-gray-700 p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-2">Need immediate help?</h3>
          <p className="text-gray-300 mb-4">
            If you're having thoughts of self-harm or suicide, please reach out for professional support.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
              Crisis Text Line: Text HOME to 741741
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
              National Suicide Prevention: 988
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
