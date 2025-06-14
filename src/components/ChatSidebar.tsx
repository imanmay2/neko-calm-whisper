
import { MessageCircle, Clock, Heart, BookOpen } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface ChatSidebarProps {
  isDarkMode?: boolean;
}

export const ChatSidebar = ({ isDarkMode = true }: ChatSidebarProps) => {
  const dummyChats = [
    {
      id: 1,
      title: "Feeling anxious about work",
      preview: "I've been having trouble sleeping...",
      timestamp: "2 hours ago",
      mood: "anxious"
    },
    {
      id: 2,
      title: "Grateful for today",
      preview: "Today was actually a good day...",
      timestamp: "1 day ago",
      mood: "happy"
    },
    {
      id: 3,
      title: "Struggling with motivation",
      preview: "I can't seem to get started...",
      timestamp: "2 days ago",
      mood: "sad"
    },
    {
      id: 4,
      title: "Meditation session",
      preview: "Just finished a 10-minute meditation...",
      timestamp: "3 days ago",
      mood: "calm"
    },
    {
      id: 5,
      title: "Family stress",
      preview: "Had an argument with my family...",
      timestamp: "4 days ago",
      mood: "frustrated"
    },
    {
      id: 6,
      title: "Making progress",
      preview: "I think I'm getting better at...",
      timestamp: "5 days ago",
      mood: "hopeful"
    },
    {
      id: 7,
      title: "Late night thoughts",
      preview: "Can't stop overthinking about...",
      timestamp: "1 week ago",
      mood: "worried"
    },
    {
      id: 8,
      title: "Self-care routine",
      preview: "Started a new morning routine...",
      timestamp: "1 week ago",
      mood: "motivated"
    }
  ];

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'happy': return 'text-green-400';
      case 'sad': return 'text-blue-400';
      case 'anxious': return 'text-orange-400';
      case 'calm': return 'text-purple-400';
      case 'frustrated': return 'text-red-400';
      case 'hopeful': return 'text-yellow-400';
      case 'worried': return 'text-pink-400';
      case 'motivated': return 'text-cyan-400';
      default: return 'text-gray-400';
    }
  };

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'happy': return '😊';
      case 'sad': return '😢';
      case 'anxious': return '😰';
      case 'calm': return '😌';
      case 'frustrated': return '😤';
      case 'hopeful': return '🌟';
      case 'worried': return '😟';
      case 'motivated': return '💪';
      default: return '💭';
    }
  };

  return (
    <div className={`w-80 h-full backdrop-blur-md rounded-2xl border shadow-xl transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gray-800/90 border-gray-700/50' 
        : 'bg-white/90 border-gray-200/50'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-700/50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className={`font-semibold transition-colors duration-500 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>Chat History</h3>
            <p className={`text-xs transition-colors duration-500 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Your recent conversations</p>
          </div>
        </div>
      </div>

      {/* Chat List */}
      <ScrollArea className="h-[calc(100%-80px)]">
        <div className="p-2 space-y-2">
          {dummyChats.map((chat) => (
            <Button
              key={chat.id}
              variant="ghost"
              className={`w-full h-auto p-3 justify-start transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'hover:bg-gray-700/50 text-left' 
                  : 'hover:bg-gray-100/50 text-left'
              }`}
            >
              <div className="w-full">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">{getMoodIcon(chat.mood)}</span>
                    <h4 className={`text-sm font-medium truncate max-w-[180px] ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-800'
                    }`}>
                      {chat.title}
                    </h4>
                  </div>
                </div>
                <p className={`text-xs truncate mb-2 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {chat.preview}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-gray-500" />
                    <span className="text-xs text-gray-500">{chat.timestamp}</span>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${getMoodColor(chat.mood)}`}></div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="absolute bottom-4 left-4 right-4">
        <Button
          variant="outline"
          size="sm"
          className={`w-full transition-all duration-300 ${
            isDarkMode 
              ? 'border-gray-600/50 hover:bg-gray-700/50 text-gray-300' 
              : 'border-gray-300/50 hover:bg-gray-100/50 text-gray-700'
          }`}
        >
          <BookOpen className="w-4 h-4 mr-2" />
          View All Chats
        </Button>
      </div>
    </div>
  );
};
