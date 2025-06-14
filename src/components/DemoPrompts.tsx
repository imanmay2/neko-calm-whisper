
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { demoPrompts } from "@/utils/aiResponses";
import { Copy, Play } from "lucide-react";

interface DemoPromptsProps {
  onPromptSelect: (prompt: string) => void;
  isDarkMode: boolean;
}

export const DemoPrompts = ({ onPromptSelect, isDarkMode }: DemoPromptsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      <Card className={`backdrop-blur-md border p-6 ${
        isDarkMode 
          ? 'bg-gray-800/90 border-gray-700/50' 
          : 'bg-white/90 border-gray-200/50'
      }`}>
        <h2 className={`text-2xl font-bold mb-4 text-center bg-gradient-to-r bg-clip-text text-transparent ${
          isDarkMode 
            ? 'from-white to-purple-200' 
            : 'from-gray-800 to-purple-600'
        }`}>
          Demo Prompts for Video Recording
        </h2>
        <p className={`text-center mb-6 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Click on any prompt to test it, or copy it for your demo video. Each prompt shows different AI responses.
        </p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {demoPrompts.map((category, categoryIndex) => (
          <Card 
            key={category.category}
            className={`backdrop-blur-md border p-6 transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-800/90 border-gray-700/50 hover:bg-gray-750/90' 
                : 'bg-white/90 border-gray-200/50 hover:bg-gray-50/90'
            }`}
          >
            <h3 className={`text-xl font-semibold mb-4 flex items-center ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              {category.category === "Crisis Detection" && "🚨"}
              {category.category === "Happiness Seeking" && "😊"}
              {category.category === "Sadness & Depression" && "😔"}
              {category.category === "Anxiety & Panic" && "😰"}
              {category.category === "Anger & Frustration" && "😤"}
              {category.category === "Stress & Burnout" && "😓"}
              {category.category === "General Support" && "💜"}
              <span className="ml-2">{category.category}</span>
            </h3>
            
            <div className="space-y-3">
              {category.prompts.map((prompt, promptIndex) => (
                <div 
                  key={promptIndex}
                  className={`rounded-lg p-4 border ${
                    isDarkMode 
                      ? 'bg-gray-700/50 border-gray-600/30' 
                      : 'bg-gray-50/50 border-gray-300/30'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className={`text-sm font-medium ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>"{prompt.input}"</p>
                    <div className="flex space-x-2 ml-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(prompt.input)}
                        className={`p-1 ${
                          isDarkMode 
                            ? 'text-gray-400 hover:text-white' 
                            : 'text-gray-600 hover:text-gray-800'
                        }`}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onPromptSelect(prompt.input)}
                        className={`p-1 ${
                          isDarkMode 
                            ? 'text-purple-400 hover:text-purple-300' 
                            : 'text-purple-600 hover:text-purple-800'
                        }`}
                      >
                        <Play className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <p className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>{prompt.description}</p>
                  <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs ${
                    prompt.expectedMood === 'crisis' ? 'bg-red-500/20 text-red-300' :
                    prompt.expectedMood === 'happiness' ? 'bg-yellow-500/20 text-yellow-300' :
                    prompt.expectedMood === 'sadness' ? 'bg-blue-500/20 text-blue-300' :
                    prompt.expectedMood === 'anxiety' ? 'bg-orange-500/20 text-orange-300' :
                    prompt.expectedMood === 'anger' ? 'bg-red-500/20 text-red-300' :
                    prompt.expectedMood === 'stress' ? 'bg-purple-500/20 text-purple-300' :
                    'bg-gray-500/20 text-gray-300'
                  }`}>
                    {prompt.expectedMood}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Card className={`backdrop-blur-md border p-6 ${
        isDarkMode 
          ? 'bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/30' 
          : 'bg-gradient-to-r from-purple-100/50 to-blue-100/50 border-purple-300/30'
      }`}>
        <h3 className={`text-lg font-semibold mb-4 ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>📹 Demo Video Tips</h3>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 text-sm ${
          isDarkMode ? 'text-gray-200' : 'text-gray-700'
        }`}>
          <div>
            <h4 className={`font-medium mb-2 ${
              isDarkMode ? 'text-purple-300' : 'text-purple-700'
            }`}>Crisis Response Demo:</h4>
            <ul className={`space-y-1 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <li>• Type "I want to kill myself"</li>
              <li>• Show red alert appearing</li>
              <li>• Highlight crisis resources</li>
              <li>• Demonstrate immediate response</li>
            </ul>
          </div>
          <div>
            <h4 className={`font-medium mb-2 ${
              isDarkMode ? 'text-purple-300' : 'text-purple-700'
            }`}>Mood Detection Demo:</h4>
            <ul className={`space-y-1 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <li>• Try different emotion keywords</li>
              <li>• Show mood badges appearing</li>
              <li>• Demonstrate varied responses</li>
              <li>• Test happiness suggestions</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};
