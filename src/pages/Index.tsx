
import { useState } from "react";
import { ChatInterface } from "@/components/ChatInterface";
import { MoodSelector } from "@/components/MoodSelector";
import { SelfHelpMenu } from "@/components/SelfHelpMenu";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Book } from "lucide-react";

const Index = () => {
  const [activeView, setActiveView] = useState<'chat' | 'mood' | 'selfhelp'>('chat');

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🐱</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Neko</h1>
                <p className="text-gray-300 text-sm">Your AI Mental Health Companion</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant={activeView === 'chat' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveView('chat')}
                className={activeView === 'chat' 
                  ? "bg-purple-600 text-white hover:bg-purple-700" 
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat
              </Button>
              <Button
                variant={activeView === 'mood' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveView('mood')}
                className={activeView === 'mood' 
                  ? "bg-purple-600 text-white hover:bg-purple-700" 
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }
              >
                <Heart className="w-4 h-4 mr-2" />
                Mood
              </Button>
              <Button
                variant={activeView === 'selfhelp' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveView('selfhelp')}
                className={activeView === 'selfhelp' 
                  ? "bg-purple-600 text-white hover:bg-purple-700" 
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }
              >
                <Book className="w-4 h-4 mr-2" />
                Self-Help
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4">
        {activeView === 'chat' && <ChatInterface />}
        {activeView === 'mood' && <MoodSelector />}
        {activeView === 'selfhelp' && <SelfHelpMenu />}
      </div>
    </div>
  );
};

export default Index;
