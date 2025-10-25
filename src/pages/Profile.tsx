import { User, Mail, Phone, Bell, Shield, FileText, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { AIModeSwitcher } from '@/components/AIModeSwitcher';
import { mockUser } from '@/data/mockData';
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';

export default function Profile() {
  const [aiMode, setAiMode] = useState(mockUser.defaultAIMode);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="pb-20 px-4 pt-6 max-w-md mx-auto animate-fade-in">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-1">Profile</h1>
        <p className="text-muted-foreground">Manage your account settings</p>
      </header>

      {/* User Info Card */}
      <div className="mb-6 bg-gradient-emerald rounded-3xl p-8 shadow-emerald text-white">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm text-2xl font-bold">
            {mockUser.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-1">{mockUser.name}</h2>
            <p className="text-white/80 text-sm">Member since {new Date(mockUser.joinedDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="mb-6 bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Personal Information</h3>
        </div>
        
        <div className="divide-y divide-border">
          <div className="flex items-center gap-3 p-4">
            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
              <Mail className="w-5 h-5 text-secondary" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm font-medium text-foreground">{mockUser.email}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>

          <div className="flex items-center gap-3 p-4">
            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
              <Phone className="w-5 h-5 text-secondary" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Phone</p>
              <p className="text-sm font-medium text-foreground">{mockUser.phone}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* AI Settings */}
      <div className="mb-6 bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">AI Assistant Settings</h3>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-foreground">Default AI Mode</p>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Choose how your AI coach communicates with you
          </p>
          <AIModeSwitcher currentMode={aiMode} onModeChange={setAiMode} />
        </div>
      </div>

      {/* Preferences */}
      <div className="mb-6 bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Preferences</h3>
        </div>
        
        <div className="divide-y divide-border">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <Bell className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Notifications</p>
                <p className="text-xs text-muted-foreground">Receive alerts and updates</p>
              </div>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>

          <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-secondary" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-foreground">Privacy & Security</p>
                <p className="text-xs text-muted-foreground">Manage your data</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-secondary" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-foreground">Export Data</p>
                <p className="text-xs text-muted-foreground">Download your financial data</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Help & Support */}
      <div className="mb-6 bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Help & Support</h3>
        </div>
        
        <div className="divide-y divide-border">
          <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-secondary" />
              </div>
              <p className="text-sm font-medium text-foreground">Help Center</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-secondary" />
              </div>
              <p className="text-sm font-medium text-foreground">Terms & Privacy</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Logout */}
      <button className="w-full flex items-center justify-center gap-2 p-4 bg-destructive/10 text-destructive rounded-2xl font-medium hover:bg-destructive/20 transition-colors mb-4">
        <LogOut className="w-5 h-5" />
        Sign Out
      </button>

      {/* Version */}
      <p className="text-center text-xs text-muted-foreground">
        FinMate v1.0.0 • Made with ❤️ for smart savers
      </p>
    </div>
  );
}
