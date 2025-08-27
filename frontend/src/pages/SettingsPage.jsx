import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStroe";
import { Send, Check } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Appearance Settings</h1>
            <p className="text-gray-600">Customize how your chat interface looks and feels</p>
          </div>

          {/* Theme Selection */}
          <div className="mb-10">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-1">Theme</h2>
              <p className="text-sm text-gray-500">Choose a color theme for your chat interface</p>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {THEMES.map((t) => (
                <button
                  key={t}
                  className={`
                    relative group flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all
                    ${theme === t 
                      ? "border-primary ring-2 ring-primary/20" 
                      : "border-gray-200 hover:border-gray-300"
                    }
                  `}
                  onClick={() => setTheme(t)}
                >
                  {/* Theme color preview */}
                  <div className="h-10 w-full rounded-lg overflow-hidden" data-theme={t}>
                    <div className="h-full w-full grid grid-cols-4 gap-0.5 p-1">
                      <div className="rounded bg-primary"></div>
                      <div className="rounded bg-secondary"></div>
                      <div className="rounded bg-accent"></div>
                      <div className="rounded bg-neutral"></div>
                    </div>
                  </div>
                  
                  {/* Theme name */}
                  <span className="text-xs font-medium text-gray-700">
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </span>
                  
                  {/* Selected indicator */}
                  {theme === t && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Preview Section */}
          <div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Preview</h3>
              <p className="text-sm text-gray-500">See how your selected theme will look</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <div className="max-w-md mx-auto">
                {/* Mock Chat UI */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                  {/* Chat Header */}
                  <div className="px-4 py-3 border-b border-gray-200 bg-white">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-medium">
                        J
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">John Doe</h3>
                        <p className="text-xs text-gray-500">Online</p>
                      </div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-4 space-y-4 min-h-[200px] bg-white">
                    {PREVIEW_MESSAGES.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`
                            max-w-[80%] rounded-2xl p-3 shadow-sm
                            ${message.isSent 
                              ? "bg-primary text-white rounded-br-none" 
                              : "bg-gray-100 text-gray-800 rounded-bl-none"
                            }
                          `}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`
                              text-xs mt-1.5 text-right
                              ${message.isSent ? "text-white/70" : "text-gray-500"}
                            `}
                          >
                            12:00 PM
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="flex-1 px-4 py-2 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                        placeholder="Type a message..."
                        value="This is a preview"
                        readOnly
                      />
                      <button className="bg-primary text-white p-2 rounded-xl hover:bg-primary/90 transition-colors">
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;