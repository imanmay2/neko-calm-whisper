
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getAIResponse } from "@/utils/aiResponses";
import { Send, AlertTriangle } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'neko';
  timestamp: Date;
  mood?: string;
  isCrisis?: boolean;
}

interface ChatInterfaceProps {
  initialPrompt?: string;
  isDarkMode?: boolean;
}

export const ChatInterface = ({ initialPrompt, isDarkMode = true }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm Neko, your AI companion. I'm here to listen and support you. How are you feeling today? 💜",
      sender: 'neko',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Handle initial prompt from demo
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      setInputText(initialPrompt);
    }
  }, [initialPrompt]);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(async () => {
      const aiResponse = await getAIResponse(inputText, messages);
      const nekoMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.text,
        sender: 'neko',
        timestamp: new Date(),
        mood: aiResponse.detectedMood,
        isCrisis: aiResponse.isCrisis
      };

      setMessages(prev => [...prev, nekoMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`backdrop-blur-md rounded-2xl p-6 border shadow-2xl relative overflow-hidden transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gray-800/90 border-gray-700/50' 
        : 'bg-white/90 border-gray-200/50'
    }`}>
      {/* Decorative elements */}
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-xl -translate-y-1/2 translate-x-1/2 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20' 
          : 'bg-gradient-to-br from-purple-300/30 to-pink-300/30'
      }`}></div>
      <div className={`absolute bottom-0 left-0 w-24 h-24 rounded-full blur-xl translate-y-1/2 -translate-x-1/2 ${
        isDarkMode 
          ? 'bg-gradient-to-tr from-blue-500/20 to-cyan-500/20' 
          : 'bg-gradient-to-tr from-blue-300/30 to-cyan-300/30'
      }`}></div>
      
      {/* Chat header with avatar */}
      <div className="flex items-center space-x-3 mb-4 relative z-10">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
          <span className="text-white font-bold">🐱</span>
        </div>
        <div>
          <h3 className={`font-semibold transition-colors duration-500 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>Neko is here for you</h3>
          <p className={`text-sm transition-colors duration-500 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>Always listening, always caring</p>
        </div>
      </div>

      <ScrollArea className="h-[600px] mb-4 relative z-10" ref={scrollAreaRef}>
        <div className="space-y-4 pr-4">
          {messages.map((message, index) => (
            <div key={message.id} className="space-y-2">
              {/* Crisis Alert */}
              {message.isCrisis && message.sender === 'neko' && (
                <Alert className={`border-red-500/50 backdrop-blur-sm animate-pulse ${
                  isDarkMode ? 'bg-red-900/20' : 'bg-red-100/80'
                }`}>
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <AlertDescription className={`font-semibold ${
                    isDarkMode ? 'text-red-200' : 'text-red-700'
                  }`}>
                    🚨 Crisis Alert: Immediate support resources provided below
                  </AlertDescription>
                </Alert>
              )}
              
              <div
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl transition-all duration-300 hover:scale-105 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg hover:shadow-purple-500/25'
                      : message.isCrisis
                      ? isDarkMode
                        ? 'bg-gradient-to-r from-red-800/80 to-red-700/80 backdrop-blur-sm text-red-100 border border-red-500/50 hover:bg-red-700/90 shadow-lg shadow-red-500/25'
                        : 'bg-gradient-to-r from-red-200/80 to-red-300/80 backdrop-blur-sm text-red-800 border border-red-400/50 hover:bg-red-300/90 shadow-lg shadow-red-400/25'
                      : isDarkMode
                      ? 'bg-gray-700/80 backdrop-blur-sm text-gray-100 border border-gray-600/50 hover:bg-gray-700/90'
                      : 'bg-gray-100/80 backdrop-blur-sm text-gray-800 border border-gray-300/50 hover:bg-gray-200/90'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {message.mood && (
                      <span className="text-xs bg-black/20 px-2 py-1 rounded-full">
                        {message.mood}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className={`backdrop-blur-sm px-4 py-3 rounded-2xl border ${
                isDarkMode 
                  ? 'bg-gray-700/80 text-gray-100 border-gray-600/50' 
                  : 'bg-gray-100/80 text-gray-800 border-gray-300/50'
              }`}>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="flex space-x-2 relative z-10">
        <Input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Share what's on your mind..."
          className={`flex-1 backdrop-blur-sm border transition-all duration-300 focus:ring-purple-500 focus:border-purple-500 ${
            isDarkMode 
              ? 'bg-gray-700/80 border-gray-600/50 text-gray-100 placeholder:text-gray-400 hover:bg-gray-700/90' 
              : 'bg-white/80 border-gray-300/50 text-gray-800 placeholder:text-gray-500 hover:bg-white/90'
          }`}
          disabled={isTyping}
        />
        <Button
          onClick={handleSendMessage}
          disabled={!inputText.trim() || isTyping}
          className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
