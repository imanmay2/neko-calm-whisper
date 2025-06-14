
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getAIResponse } from "@/utils/aiResponses";
import { Send } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'neko';
  timestamp: Date;
  mood?: string;
}

export const ChatInterface = () => {
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
        mood: aiResponse.detectedMood
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
    <div className="bg-gray-800/90 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 shadow-2xl relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-xl translate-y-1/2 -translate-x-1/2"></div>
      
      {/* Chat header with avatar */}
      <div className="flex items-center space-x-3 mb-4 relative z-10">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
          <span className="text-white font-bold">🐱</span>
        </div>
        <div>
          <h3 className="text-white font-semibold">Neko is here for you</h3>
          <p className="text-gray-400 text-sm">Always listening, always caring</p>
        </div>
      </div>

      <ScrollArea className="h-96 mb-4 relative z-10" ref={scrollAreaRef}>
        <div className="space-y-4 pr-4">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl transition-all duration-300 hover:scale-105 ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg hover:shadow-purple-500/25'
                    : 'bg-gray-700/80 backdrop-blur-sm text-gray-100 border border-gray-600/50 hover:bg-gray-700/90'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-gray-700/80 backdrop-blur-sm text-gray-100 border border-gray-600/50 px-4 py-3 rounded-2xl">
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
          className="flex-1 bg-gray-700/80 backdrop-blur-sm border-gray-600/50 text-gray-100 placeholder:text-gray-400 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 hover:bg-gray-700/90"
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
