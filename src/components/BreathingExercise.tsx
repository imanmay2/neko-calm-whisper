
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface BreathingExerciseProps {
  onClose: () => void;
}

export const BreathingExercise = ({ onClose }: BreathingExerciseProps) => {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [count, setCount] = useState(4);
  const [isActive, setIsActive] = useState(false);
  const [totalCycles, setTotalCycles] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        setCount((prev) => {
          if (prev === 1) {
            if (phase === 'inhale') {
              setPhase('hold');
              return 4;
            } else if (phase === 'hold') {
              setPhase('exhale');
              return 4;
            } else {
              setPhase('inhale');
              setTotalCycles(cycles => cycles + 1);
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, phase]);

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Breathe Out';
    }
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale': return 'from-blue-400 to-cyan-400';
      case 'hold': return 'from-purple-400 to-purple-600';
      case 'exhale': return 'from-green-400 to-emerald-400';
    }
  };

  return (
    <Card className="bg-gray-800 border-gray-700 p-8">
      <div className="text-center space-y-6">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onClose} className="text-gray-300 hover:text-white hover:bg-gray-700">
            ← Back
          </Button>
          <h2 className="text-2xl font-bold text-white">Breathing Exercise</h2>
          <div className="w-16"></div>
        </div>

        <p className="text-gray-300 mb-8">
          Follow the rhythm: Inhale for 4, hold for 4, exhale for 4. Let your body relax with each breath.
        </p>

        <div className="relative">
          <div className={`w-48 h-48 mx-auto rounded-full bg-gradient-to-r ${getPhaseColor()} flex items-center justify-center transition-all duration-1000 ${isActive ? 'scale-110' : 'scale-100'}`}>
            <div className="text-center text-white">
              <div className="text-4xl font-light mb-2">{count}</div>
              <div className="text-lg font-medium">{getPhaseText()}</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-gray-300">
            Completed cycles: <span className="text-white font-semibold">{totalCycles}</span>
          </div>
          <div className="flex gap-4 justify-center">
            {!isActive ? (
              <Button 
                onClick={() => setIsActive(true)}
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
              >
                Start Breathing
              </Button>
            ) : (
              <Button 
                onClick={() => setIsActive(false)}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Pause
              </Button>
            )}
          </div>
        </div>

        {totalCycles >= 3 && (
          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <p className="text-gray-100 text-sm">
              Great job! You've completed {totalCycles} breathing cycles. 
              Notice how your body feels more relaxed. You can continue or try another exercise. 💜
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
