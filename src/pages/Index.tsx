
import { useState } from "react";
import { ChatInterface } from "@/components/ChatInterface";
import { MoodSelector } from "@/components/MoodSelector";
import { SelfHelpMenu } from "@/components/SelfHelpMenu";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Book } from "lucide-react";

const Index = () => {
  const [activeView, setActiveView] = useState<'chat' | 'mood' | 'selfhelp'>('chat');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <div className="bg-gray-800/80 border-b border-gray-700/50 backdrop-blur-sm relative z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-xl animate-bounce">🐱</span>
              </div>
              <div className="animate-fade-in">
                <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  Neko
                </h1>
                <p className="text-gray-300 text-sm">Your AI Mental Health Companion</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant={activeView === 'chat' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveView('chat')}
                className={`transition-all duration-300 hover:scale-105 ${activeView === 'chat' 
                  ? "bg-purple-600 text-white hover:bg-purple-700 shadow-lg" 
                  : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                }`}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat
              </Button>
              <Button
                variant={activeView === 'mood' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveView('mood')}
                className={`transition-all duration-300 hover:scale-105 ${activeView === 'mood' 
                  ? "bg-purple-600 text-white hover:bg-purple-700 shadow-lg" 
                  : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                }`}
              >
                <Heart className="w-4 h-4 mr-2" />
                Mood
              </Button>
              <Button
                variant={activeView === 'selfhelp' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveView('selfhelp')}
                className={`transition-all duration-300 hover:scale-105 ${activeView === 'selfhelp' 
                  ? "bg-purple-600 text-white hover:bg-purple-700 shadow-lg" 
                  : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                }`}
              >
                <Book className="w-4 h-4 mr-2" />
                Self-Help
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with transitions */}
      <div className="max-w-4xl mx-auto p-4 relative z-10">
        <div className="transition-all duration-500 ease-in-out">
          {activeView === 'chat' && (
            <div className="animate-fade-in">
              <ChatInterface />
            </div>
          )}
          {activeView === 'mood' && (
            <div className="animate-fade-in">
              <MoodSelector />
            </div>
          )}
          {activeView === 'selfhelp' && (
            <div className="animate-fade-in">
              <SelfHelpMenu />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
