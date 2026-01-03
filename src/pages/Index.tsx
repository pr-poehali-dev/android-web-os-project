import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

type AppItem = {
  id: string;
  name: string;
  icon: string;
  color: string;
  category: 'system' | 'media' | 'productivity' | 'social';
};

type Section = 'home' | 'apps' | 'settings' | 'files' | 'gallery' | 'notifications';

const apps: AppItem[] = [
  { id: '1', name: 'Chrome', icon: 'Globe', color: 'bg-blue-500', category: 'system' },
  { id: '2', name: 'Gmail', icon: 'Mail', color: 'bg-red-500', category: 'productivity' },
  { id: '3', name: 'Maps', icon: 'Map', color: 'bg-green-500', category: 'system' },
  { id: '4', name: 'YouTube', icon: 'Play', color: 'bg-red-600', category: 'media' },
  { id: '5', name: 'Camera', icon: 'Camera', color: 'bg-purple-500', category: 'media' },
  { id: '6', name: 'Gallery', icon: 'Images', color: 'bg-pink-500', category: 'media' },
  { id: '7', name: 'Files', icon: 'FolderOpen', color: 'bg-yellow-500', category: 'productivity' },
  { id: '8', name: 'Settings', icon: 'Settings', color: 'bg-gray-500', category: 'system' },
  { id: '9', name: 'Calendar', icon: 'Calendar', color: 'bg-blue-600', category: 'productivity' },
  { id: '10', name: 'Messages', icon: 'MessageSquare', color: 'bg-green-600', category: 'social' },
  { id: '11', name: 'Phone', icon: 'Phone', color: 'bg-emerald-500', category: 'social' },
  { id: '12', name: 'Contacts', icon: 'Users', color: 'bg-indigo-500', category: 'social' },
];

const files = [
  { id: '1', name: 'Documents', icon: 'FileText', size: '45 MB', items: 23 },
  { id: '2', name: 'Downloads', icon: 'Download', size: '1.2 GB', items: 156 },
  { id: '3', name: 'Pictures', icon: 'Image', size: '3.4 GB', items: 892 },
  { id: '4', name: 'Music', icon: 'Music', size: '512 MB', items: 87 },
];

const notifications = [
  { id: '1', app: 'Gmail', text: 'New email from John Doe', time: '5 min ago', icon: 'Mail' },
  { id: '2', app: 'Messages', text: '3 new messages', time: '15 min ago', icon: 'MessageSquare' },
  { id: '3', app: 'Calendar', text: 'Meeting in 30 minutes', time: '30 min ago', icon: 'Calendar' },
  { id: '4', app: 'YouTube', text: 'New video from your subscription', time: '1 hour ago', icon: 'Play' },
];

export default function Index() {
  const [currentSection, setCurrentSection] = useState<Section>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderSection = () => {
    switch (currentSection) {
      case 'home':
        return (
          <div className="flex-1 p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-light mb-2">Welcome</h2>
              <p className="text-muted-foreground text-sm">Android OS Web Interface</p>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-8">
              {apps.slice(0, 8).map((app) => (
                <button
                  key={app.id}
                  className="flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-muted/50 transition-all duration-200 hover:scale-105 group"
                >
                  <div className={`${app.color} w-14 h-14 rounded-2xl flex items-center justify-center app-icon-shadow group-hover:shadow-lg transition-shadow`}>
                    <Icon name={app.icon as any} size={28} className="text-white" />
                  </div>
                  <span className="text-xs font-medium text-center">{app.name}</span>
                </button>
              ))}
            </div>

            <div className="bg-card rounded-3xl p-6 border border-border">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Icon name="Zap" size={20} className="text-primary" />
                Quick Access
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {files.slice(0, 4).map((file) => (
                  <button
                    key={file.id}
                    className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl hover:bg-muted transition-colors"
                  >
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Icon name={file.icon as any} size={20} className="text-primary" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{file.items} items</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'apps':
        return (
          <div className="flex-1 p-6">
            <h2 className="text-2xl font-light mb-6">All Applications</h2>
            <div className="grid grid-cols-4 gap-4">
              {filteredApps.map((app) => (
                <button
                  key={app.id}
                  className="flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-muted/50 transition-all duration-200 hover:scale-105 group"
                >
                  <div className={`${app.color} w-16 h-16 rounded-2xl flex items-center justify-center app-icon-shadow group-hover:shadow-lg transition-shadow`}>
                    <Icon name={app.icon as any} size={32} className="text-white" />
                  </div>
                  <span className="text-sm font-medium text-center">{app.name}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 'files':
        return (
          <div className="flex-1 p-6">
            <h2 className="text-2xl font-light mb-6">File Manager</h2>
            <div className="space-y-3">
              {filteredFiles.map((file) => (
                <button
                  key={file.id}
                  className="w-full flex items-center gap-4 p-4 bg-card rounded-2xl border border-border hover:border-primary transition-colors"
                >
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    <Icon name={file.icon as any} size={24} className="text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">{file.items} items · {file.size}</p>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div className="flex-1 p-6">
            <h2 className="text-2xl font-light mb-6">Gallery</h2>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
                >
                  <Icon name="Image" size={48} className="text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="flex-1 p-6">
            <h2 className="text-2xl font-light mb-6">Settings</h2>
            <div className="space-y-2">
              {[
                { icon: 'Wifi', label: 'Network & Internet', badge: 'Connected' },
                { icon: 'Bluetooth', label: 'Bluetooth', badge: 'Off' },
                { icon: 'Volume2', label: 'Sound & Vibration', badge: '' },
                { icon: 'Bell', label: 'Notifications', badge: '5 new' },
                { icon: 'Lock', label: 'Security & Privacy', badge: '' },
                { icon: 'Palette', label: 'Display', badge: 'Dark theme' },
              ].map((setting, i) => (
                <button
                  key={i}
                  className="w-full flex items-center gap-4 p-4 bg-card rounded-2xl border border-border hover:border-primary transition-colors"
                >
                  <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                    <Icon name={setting.icon as any} size={20} className="text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium">{setting.label}</p>
                  </div>
                  {setting.badge && (
                    <Badge variant="secondary" className="text-xs">{setting.badge}</Badge>
                  )}
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="flex-1 p-6">
            <h2 className="text-2xl font-light mb-6">Notifications</h2>
            <div className="space-y-3">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="p-4 bg-card rounded-2xl border border-border notification-glow"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon name={notif.icon as any} size={20} className="text-secondary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{notif.app}</p>
                      <p className="text-sm text-muted-foreground mt-1">{notif.text}</p>
                      <p className="text-xs text-muted-foreground mt-2">{notif.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <div className="bg-card/50 backdrop-blur-lg border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Icon name="Smartphone" size={24} className="text-primary" />
            <span className="font-medium text-lg">Android OS</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search apps, files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-border"
            />
          </div>

          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 hover:bg-muted rounded-xl transition-colors"
          >
            <Icon name="Bell" size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full animate-pulse" />
          </button>

          <div className="flex items-center gap-2 text-sm">
            <Icon name="Battery" size={18} className="text-green-500" />
            <span className="text-muted-foreground">85%</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Icon name="Wifi" size={18} className="text-primary" />
          </div>

          <div className="text-sm text-muted-foreground">
            {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>

      {showNotifications && (
        <div className="absolute right-6 top-20 w-96 bg-card border border-border rounded-2xl shadow-2xl z-50 animate-slide-up">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="font-medium">Notifications</h3>
            <button onClick={() => setShowNotifications(false)}>
              <Icon name="X" size={18} />
            </button>
          </div>
          <ScrollArea className="h-96">
            <div className="p-4 space-y-3">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="p-3 bg-muted/30 rounded-xl hover:bg-muted transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={notif.icon as any} size={16} className="text-secondary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-xs">{notif.app}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notif.text}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      <div className="flex-1 overflow-auto">
        {renderSection()}
      </div>

      <div className="bg-card/50 backdrop-blur-lg border-t border-border px-8 py-4">
        <div className="flex items-center justify-around max-w-2xl mx-auto">
          {[
            { id: 'home', icon: 'Home', label: 'Home' },
            { id: 'apps', icon: 'Grid3x3', label: 'Apps' },
            { id: 'files', icon: 'FolderOpen', label: 'Files' },
            { id: 'gallery', icon: 'Images', label: 'Gallery' },
            { id: 'settings', icon: 'Settings', label: 'Settings' },
          ].map((nav) => (
            <button
              key={nav.id}
              onClick={() => setCurrentSection(nav.id as Section)}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all duration-200 ${
                currentSection === nav.id
                  ? 'bg-primary text-primary-foreground scale-105'
                  : 'hover:bg-muted text-muted-foreground'
              }`}
            >
              <Icon name={nav.icon as any} size={24} />
              <span className="text-xs font-medium">{nav.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
