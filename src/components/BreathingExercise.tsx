
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

  const getPhaseScale = () => {
    switch (phase) {
      case 'inhale': return 'scale-110';
      case 'hold': return 'scale-105';
      case 'exhale': return 'scale-95';
    }
  };

  return (
    <Card className="bg-gray-800/90 backdrop-blur-md border-gray-700/50 p-8 relative overflow-hidden animate-fade-in">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-green-500/5"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      
      <div className="text-center space-y-6 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={onClose} 
            className="text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-300 hover:scale-105"
          >
            ← Back
          </Button>
          <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Breathing Exercise
          </h2>
          <div className="w-16"></div>
        </div>

        <p className="text-gray-300 mb-8 animate-fade-in">
          Follow the rhythm: Inhale for 4, hold for 4, exhale for 4. Let your body relax with each breath.
        </p>

        <div className="relative">
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/30 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-400/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-green-400/30 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
          </div>
          
          <div className={`w-48 h-48 mx-auto rounded-full bg-gradient-to-r ${getPhaseColor()} flex items-center justify-center transition-all duration-1000 shadow-2xl ${
            isActive ? `${getPhaseScale()} shadow-lg` : 'scale-100'
          } hover:scale-105`}>
            <div className="text-center text-white">
              <div className="text-4xl font-light mb-2 animate-pulse">{count}</div>
              <div className="text-lg font-medium">{getPhaseText()}</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-gray-300 p-4 bg-gray-700/30 rounded-lg backdrop-blur-sm border border-gray-600/30">
            <div className="flex items-center justify-center space-x-4">
              <span>Completed cycles:</span>
              <div className="flex items-center space-x-2">
                <span className="text-white font-semibold text-lg">{totalCycles}</span>
                {totalCycles > 0 && <span className="text-green-400 animate-bounce">✨</span>}
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 justify-center">
            {!isActive ? (
              <Button 
                onClick={() => setIsActive(true)}
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
              >
                Start Breathing
              </Button>
            ) : (
              <Button 
                onClick={() => setIsActive(false)}
                variant="outline"
                className="border-gray-600/50 text-gray-300 hover:bg-gray-700/50 hover:text-white transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              >
                Pause
              </Button>
            )}
          </div>
        </div>

        {totalCycles >= 3 && (
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-4 border border-green-500/20 animate-fade-in backdrop-blur-sm">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-2xl animate-bounce">🎉</span>
              <span className="text-green-400 font-semibold">Well Done!</span>
              <span className="text-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>🎉</span>
            </div>
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
