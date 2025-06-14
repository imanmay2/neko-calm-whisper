
import { useState } from "react";
import { ChatInterface } from "@/components/ChatInterface";
import { ChatSidebar } from "@/components/ChatSidebar";
import { MoodSelector } from "@/components/MoodSelector";
import { SelfHelpMenu } from "@/components/SelfHelpMenu";
import { DemoPrompts } from "@/components/DemoPrompts";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Book, TestTube, Sun, Moon } from "lucide-react";

const Index = () => {
  const [activeView, setActiveView] = useState<'chat' | 'mood' | 'selfhelp' | 'demo'>('chat');
  const [chatPrompt, setChatPrompt] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handlePromptSelect = (prompt: string) => {
    setChatPrompt(prompt);
    setActiveView('chat');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-1/2 -right-1/2 w-96 h-96 rounded-full blur-3xl animate-pulse ${
          isDarkMode ? 'bg-purple-500/10' : 'bg-purple-300/20'
        }`}></div>
        <div className={`absolute -bottom-1/2 -left-1/2 w-96 h-96 rounded-full blur-3xl animate-pulse ${
          isDarkMode ? 'bg-blue-500/10' : 'bg-blue-300/20'
        }`} style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <div className={`border-b backdrop-blur-sm relative z-10 transition-all duration-500 ${
        isDarkMode 
          ? 'bg-gray-800/80 border-gray-700/50' 
          : 'bg-white/80 border-gray-200/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-xl animate-bounce">🐱</span>
              </div>
              <div className="animate-fade-in">
                <h1 className={`text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent transition-all duration-500 ${
                  isDarkMode 
                    ? 'from-white to-purple-200' 
                    : 'from-gray-800 to-purple-600'
                }`}>
                  Neko
                </h1>
                <p className={`text-sm transition-colors duration-500 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>Your AI Mental Health Companion</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className={`transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? "text-gray-300 hover:bg-gray-700/50 hover:text-white" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                }`}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Button
                variant={activeView === 'chat' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveView('chat')}
                className={`transition-all duration-300 hover:scale-105 ${activeView === 'chat' 
                  ? "bg-purple-600 text-white hover:bg-purple-700 shadow-lg" 
                  : isDarkMode 
                    ? "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
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
                  : isDarkMode 
                    ? "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
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
                  : isDarkMode 
                    ? "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                }`}
              >
                <Book className="w-4 h-4 mr-2" />
                Self-Help
              </Button>
              <Button
                variant={activeView === 'demo' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveView('demo')}
                className={`transition-all duration-300 hover:scale-105 ${activeView === 'demo' 
                  ? "bg-purple-600 text-white hover:bg-purple-700 shadow-lg" 
                  : isDarkMode 
                    ? "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                }`}
              >
                <TestTube className="w-4 h-4 mr-2" />
                Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto p-4 relative z-10">
        <div className="flex gap-4 h-[calc(100vh-120px)]">
          {/* Sidebar - only show on chat view */}
          {activeView === 'chat' && (
            <div className="flex-shrink-0 animate-fade-in">
              <ChatSidebar isDarkMode={isDarkMode} />
            </div>
          )}
          
          {/* Main Content */}
          <div className="flex-1 transition-all duration-500 ease-in-out">
            {activeView === 'chat' && (
              <div className="animate-fade-in">
                <ChatInterface key={chatPrompt} initialPrompt={chatPrompt} isDarkMode={isDarkMode} />
              </div>
            )}
            {activeView === 'mood' && (
              <div className="animate-fade-in">
                <MoodSelector isDarkMode={isDarkMode} />
              </div>
            )}
            {activeView === 'selfhelp' && (
              <div className="animate-fade-in">
                <SelfHelpMenu isDarkMode={isDarkMode} />
              </div>
            )}
            {activeView === 'demo' && (
              <div className="animate-fade-in">
                <DemoPrompts onPromptSelect={handlePromptSelect} isDarkMode={isDarkMode} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
