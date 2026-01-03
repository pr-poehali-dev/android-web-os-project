import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

type AppItem = {
  id: string;
  name: string;
  icon: string;
  color: string;
  category: 'system' | 'media' | 'productivity' | 'social';
};

type Section = 'home' | 'apps' | 'settings' | 'files' | 'gallery' | 'notifications' | 'store';

type StoreApp = {
  id: string;
  name: string;
  icon: string;
  color: string;
  category: 'games' | 'productivity' | 'social' | 'entertainment' | 'tools';
  description: string;
  rating: number;
  downloads: string;
  size: string;
  developer: string;
  screenshots: number;
  installed?: boolean;
};

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
  { id: '13', name: 'Play Store', icon: 'ShoppingBag', color: 'bg-blue-400', category: 'system' },
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

const emailMessages = [
  { id: '1', from: 'John Doe', subject: 'Meeting Tomorrow', preview: 'Hi! Just confirming our meeting...', time: '10:30 AM', unread: true },
  { id: '2', from: 'Sarah Smith', subject: 'Project Update', preview: 'The latest updates on the project...', time: 'Yesterday', unread: true },
  { id: '3', from: 'Team Lead', subject: 'Weekly Report', preview: 'Please find attached the weekly...', time: 'Monday', unread: false },
];

const messageChats = [
  { id: '1', name: 'Mom', lastMsg: 'Don\'t forget to call me!', time: '2m ago', unread: 2 },
  { id: '2', name: 'Work Group', lastMsg: 'Meeting at 3 PM', time: '1h ago', unread: 5 },
  { id: '3', name: 'Alex', lastMsg: 'See you tomorrow!', time: '3h ago', unread: 0 },
];

const calendarEvents = [
  { id: '1', title: 'Team Meeting', time: '10:00 AM - 11:00 AM', date: 'Today', color: 'bg-blue-500' },
  { id: '2', title: 'Lunch with Client', time: '1:00 PM - 2:00 PM', date: 'Today', color: 'bg-green-500' },
  { id: '3', title: 'Gym', time: '6:00 PM - 7:00 PM', date: 'Today', color: 'bg-purple-500' },
];

const contacts = [
  { id: '1', name: 'John Doe', phone: '+1 234 567 8900', avatar: 'bg-blue-500' },
  { id: '2', name: 'Sarah Smith', phone: '+1 234 567 8901', avatar: 'bg-pink-500' },
  { id: '3', name: 'Alex Johnson', phone: '+1 234 567 8902', avatar: 'bg-green-500' },
  { id: '4', name: 'Emily Brown', phone: '+1 234 567 8903', avatar: 'bg-purple-500' },
];

const storeApps: StoreApp[] = [
  { id: 's1', name: 'Instagram', icon: 'Instagram', color: 'bg-gradient-to-br from-purple-500 to-pink-500', category: 'social', description: 'Photo & video sharing app', rating: 4.5, downloads: '5B+', size: '45 MB', developer: 'Meta', screenshots: 4 },
  { id: 's2', name: 'TikTok', icon: 'Music', color: 'bg-black', category: 'entertainment', description: 'Short video platform', rating: 4.6, downloads: '3B+', size: '120 MB', developer: 'ByteDance', screenshots: 4 },
  { id: 's3', name: 'Spotify', icon: 'Music', color: 'bg-green-600', category: 'entertainment', description: 'Music streaming service', rating: 4.4, downloads: '1B+', size: '85 MB', developer: 'Spotify AB', screenshots: 3 },
  { id: 's4', name: 'Telegram', icon: 'Send', color: 'bg-blue-500', category: 'social', description: 'Fast and secure messaging', rating: 4.7, downloads: '1B+', size: '75 MB', developer: 'Telegram FZ-LLC', screenshots: 4 },
  { id: 's5', name: 'WhatsApp', icon: 'MessageCircle', color: 'bg-green-500', category: 'social', description: 'Simple. Secure. Reliable messaging.', rating: 4.3, downloads: '5B+', size: '60 MB', developer: 'Meta', screenshots: 3 },
  { id: 's6', name: 'Netflix', icon: 'Tv', color: 'bg-red-600', category: 'entertainment', description: 'Watch TV shows and movies', rating: 4.5, downloads: '1B+', size: '95 MB', developer: 'Netflix Inc.', screenshots: 4 },
  { id: 's7', name: 'Notion', icon: 'BookOpen', color: 'bg-gray-800', category: 'productivity', description: 'Notes, docs, tasks & wikis', rating: 4.6, downloads: '100M+', size: '55 MB', developer: 'Notion Labs', screenshots: 4 },
  { id: 's8', name: 'Duolingo', icon: 'GraduationCap', color: 'bg-green-500', category: 'productivity', description: 'Learn languages for free', rating: 4.7, downloads: '500M+', size: '42 MB', developer: 'Duolingo', screenshots: 4 },
  { id: 's9', name: 'Discord', icon: 'Gamepad2', color: 'bg-indigo-600', category: 'social', description: 'Chat, talk & hangout', rating: 4.4, downloads: '500M+', size: '95 MB', developer: 'Discord Inc.', screenshots: 3 },
  { id: 's10', name: 'Canva', icon: 'Palette', color: 'bg-blue-400', category: 'tools', description: 'Design graphics & videos', rating: 4.8, downloads: '500M+', size: '65 MB', developer: 'Canva', screenshots: 4 },
  { id: 's11', name: 'Subway Surfers', icon: 'Gamepad2', color: 'bg-orange-500', category: 'games', description: 'Endless runner game', rating: 4.5, downloads: '1B+', size: '120 MB', developer: 'SYBO Games', screenshots: 5 },
  { id: 's12', name: 'Among Us', icon: 'Users', color: 'bg-red-500', category: 'games', description: 'Multiplayer game', rating: 4.2, downloads: '500M+', size: '85 MB', developer: 'Innersloth', screenshots: 4 },
];

export default function Index() {
  const [currentSection, setCurrentSection] = useState<Section>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [openApp, setOpenApp] = useState<string | null>(null);
  const [installedApps, setInstalledApps] = useState<string[]>([]);
  const [selectedStoreApp, setSelectedStoreApp] = useState<StoreApp | null>(null);
  const [storeCategory, setStoreCategory] = useState<string>('all');

  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAppClick = (appName: string) => {
    if (appName === 'Play Store') {
      setCurrentSection('store');
      setOpenApp(null);
    } else {
      setOpenApp(appName);
      setCurrentSection('home');
    }
  };

  const handleInstallApp = (appId: string) => {
    if (installedApps.includes(appId)) {
      setInstalledApps(installedApps.filter(id => id !== appId));
    } else {
      setInstalledApps([...installedApps, appId]);
    }
  };

  const filteredStoreApps = storeApps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = storeCategory === 'all' || app.category === storeCategory;
    return matchesSearch && matchesCategory;
  });

  const closeApp = () => {
    setOpenApp(null);
  };

  const renderAppContent = () => {
    const installedStoreApp = storeApps.find(app => app.name === openApp && installedApps.includes(app.id));
    
    if (installedStoreApp) {
      return (
        <div className="flex-1 flex flex-col bg-background">
          <div className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={closeApp} className="rounded-full">
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <h2 className="text-xl font-medium">{installedStoreApp.name}</h2>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Icon name="MoreVertical" size={20} />
            </Button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <div className={`${installedStoreApp.color} w-32 h-32 rounded-[48px] flex items-center justify-center shadow-2xl mb-6`}>
              <Icon name={installedStoreApp.icon as any} size={64} className="text-white" />
            </div>
            <h3 className="text-2xl font-medium mb-2">{installedStoreApp.name}</h3>
            <p className="text-muted-foreground text-center mb-6 max-w-md">
              {installedStoreApp.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                {installedStoreApp.rating}
              </span>
              <span>•</span>
              <span>{installedStoreApp.downloads} downloads</span>
            </div>
            <div className="mt-8 p-6 bg-card rounded-3xl border border-border">
              <p className="text-sm text-center text-muted-foreground">
                This is a demo app interface. In a real implementation, this would be the full {installedStoreApp.name} experience.
              </p>
            </div>
          </div>
        </div>
      );
    }
    
    switch (openApp) {
      case 'Gmail':
        return (
          <div className="flex-1 flex flex-col bg-background">
            <div className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" onClick={closeApp} className="rounded-full">
                  <Icon name="ArrowLeft" size={20} />
                </Button>
                <h2 className="text-xl font-medium">Gmail</h2>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Icon name="Search" size={20} />
              </Button>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-2">
                {emailMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-4 rounded-3xl border border-border hover:bg-muted/50 transition-colors cursor-pointer ${
                      msg.unread ? 'bg-card' : 'bg-background'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">{msg.from[0]}</span>
                        </div>
                        <div>
                          <p className={`font-medium ${msg.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {msg.from}
                          </p>
                          <p className="text-xs text-muted-foreground">{msg.time}</p>
                        </div>
                      </div>
                      {msg.unread && <div className="w-2 h-2 bg-primary rounded-full" />}
                    </div>
                    <p className={`text-sm ${msg.unread ? 'font-medium' : 'text-muted-foreground'} mb-1`}>
                      {msg.subject}
                    </p>
                    <p className="text-sm text-muted-foreground">{msg.preview}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t border-border">
              <Button className="w-full rounded-full" size="lg">
                <Icon name="Plus" size={20} className="mr-2" />
                Compose
              </Button>
            </div>
          </div>
        );

      case 'Messages':
        return (
          <div className="flex-1 flex flex-col bg-background">
            <div className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" onClick={closeApp} className="rounded-full">
                  <Icon name="ArrowLeft" size={20} />
                </Button>
                <h2 className="text-xl font-medium">Messages</h2>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Icon name="MoreVertical" size={20} />
              </Button>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-2">
                {messageChats.map((chat) => (
                  <div
                    key={chat.id}
                    className="p-4 rounded-3xl bg-card border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <span className="text-sm font-medium text-white">{chat.name[0]}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium">{chat.name}</p>
                          <span className="text-xs text-muted-foreground">{chat.time}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground truncate">{chat.lastMsg}</p>
                          {chat.unread > 0 && (
                            <Badge className="ml-2 rounded-full w-6 h-6 flex items-center justify-center p-0">
                              {chat.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        );

      case 'Calendar':
        return (
          <div className="flex-1 flex flex-col bg-background">
            <div className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" onClick={closeApp} className="rounded-full">
                  <Icon name="ArrowLeft" size={20} />
                </Button>
                <h2 className="text-xl font-medium">Calendar</h2>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Icon name="Plus" size={20} />
              </Button>
            </div>
            <div className="p-6">
              <div className="mb-6 text-center">
                <p className="text-sm text-muted-foreground mb-1">January 2026</p>
                <h3 className="text-4xl font-light">3</h3>
                <p className="text-sm text-muted-foreground">Friday</p>
              </div>
              <div className="space-y-3">
                {calendarEvents.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 rounded-3xl bg-card border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-1 h-16 ${event.color} rounded-full`} />
                      <div className="flex-1">
                        <p className="font-medium mb-1">{event.title}</p>
                        <p className="text-sm text-muted-foreground">{event.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'Contacts':
        return (
          <div className="flex-1 flex flex-col bg-background">
            <div className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" onClick={closeApp} className="rounded-full">
                  <Icon name="ArrowLeft" size={20} />
                </Button>
                <h2 className="text-xl font-medium">Contacts</h2>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Icon name="Search" size={20} />
              </Button>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-2">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="p-4 rounded-3xl bg-card border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full ${contact.avatar} flex items-center justify-center`}>
                        <span className="text-lg font-medium text-white">{contact.name[0]}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-sm text-muted-foreground">{contact.phone}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Icon name="Phone" size={18} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        );

      case 'Phone':
        return (
          <div className="flex-1 flex flex-col bg-background">
            <div className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" onClick={closeApp} className="rounded-full">
                  <Icon name="ArrowLeft" size={20} />
                </Button>
                <h2 className="text-xl font-medium">Phone</h2>
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-6">
              <div className="w-full max-w-sm space-y-6">
                <div className="bg-card rounded-3xl p-6 text-center border border-border">
                  <Input
                    type="tel"
                    placeholder="Enter number"
                    className="text-2xl text-center border-0 bg-transparent mb-4"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((num) => (
                    <Button
                      key={num}
                      variant="outline"
                      size="lg"
                      className="h-16 text-xl rounded-3xl border-border hover:bg-muted"
                    >
                      {num}
                    </Button>
                  ))}
                </div>
                <Button size="lg" className="w-full rounded-full">
                  <Icon name="Phone" size={20} className="mr-2" />
                  Call
                </Button>
              </div>
            </div>
          </div>
        );

      case 'Camera':
        return (
          <div className="flex-1 flex flex-col bg-black">
            <div className="absolute top-0 left-0 right-0 z-10 px-6 py-4 flex items-center justify-between">
              <Button variant="ghost" size="icon" onClick={closeApp} className="rounded-full bg-black/50">
                <Icon name="ArrowLeft" size={20} className="text-white" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-black/50">
                <Icon name="Settings" size={20} className="text-white" />
              </Button>
            </div>
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
              <Icon name="Camera" size={120} className="text-gray-600" />
            </div>
            <div className="p-6 flex items-center justify-center gap-8">
              <Button variant="ghost" size="icon" className="rounded-full w-16 h-16">
                <Icon name="Image" size={24} className="text-white" />
              </Button>
              <Button size="icon" className="rounded-full w-20 h-20 bg-white hover:bg-gray-200">
                <div className="w-16 h-16 rounded-full border-4 border-black" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full w-16 h-16">
                <Icon name="RotateCw" size={24} className="text-white" />
              </Button>
            </div>
          </div>
        );

      case 'Chrome':
        return (
          <div className="flex-1 flex flex-col bg-background">
            <div className="bg-card border-b border-border px-4 py-3 flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={closeApp} className="rounded-full">
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <div className="flex-1 bg-muted/50 rounded-full px-4 py-2 flex items-center gap-2">
                <Icon name="Search" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Search or type URL</span>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Icon name="MoreVertical" size={20} />
              </Button>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-4">
                <Icon name="Globe" size={64} className="mx-auto text-muted-foreground" />
                <p className="text-muted-foreground">Start browsing</p>
              </div>
            </div>
          </div>
        );

      case 'YouTube':
        return (
          <div className="flex-1 flex flex-col bg-background">
            <div className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" onClick={closeApp} className="rounded-full">
                  <Icon name="ArrowLeft" size={20} />
                </Button>
                <h2 className="text-xl font-medium">YouTube</h2>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Icon name="Search" size={20} />
              </Button>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-3">
                    <div className="aspect-video bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-3xl flex items-center justify-center">
                      <Icon name="Play" size={48} className="text-muted-foreground" />
                    </div>
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-medium mb-1">Video Title {i}</p>
                        <p className="text-sm text-muted-foreground">Channel Name • 1M views • 2 days ago</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        );

      case 'Maps':
        return (
          <div className="flex-1 flex flex-col bg-background">
            <div className="absolute top-0 left-0 right-0 z-10 px-6 py-4 flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={closeApp} className="rounded-full bg-card shadow-lg">
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <div className="flex-1 bg-card rounded-full px-4 py-3 shadow-lg">
                <p className="text-sm text-muted-foreground">Search for a place</p>
              </div>
            </div>
            <div className="flex-1 bg-gradient-to-br from-green-500/10 to-blue-500/10 flex items-center justify-center">
              <Icon name="Map" size={120} className="text-muted-foreground" />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderSection = () => {
    if (openApp) {
      return renderAppContent();
    }

    switch (currentSection) {
      case 'home':
        const installedStoreApps = storeApps.filter(app => installedApps.includes(app.id));
        const allHomeApps = [...apps, ...installedStoreApps.map(app => ({
          id: app.id,
          name: app.name,
          icon: app.icon,
          color: app.color,
          category: 'social' as const
        }))];
        
        return (
          <div className="flex-1 p-6">
            <div className="mb-8">
              <h2 className="text-3xl font-light mb-2">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </h2>
              <p className="text-muted-foreground">Welcome back</p>
            </div>

            <div className="grid grid-cols-5 gap-6 mb-8">
              {allHomeApps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => handleAppClick(app.name)}
                  className="flex flex-col items-center gap-3 p-3 rounded-3xl hover:bg-muted/30 transition-all duration-200 active:scale-95 group"
                >
                  <div className={`${app.color} w-16 h-16 rounded-[28px] flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                    <Icon name={app.icon as any} size={30} className="text-white" />
                  </div>
                  <span className="text-xs font-medium text-center">{app.name}</span>
                </button>
              ))}
            </div>

            <div className="bg-gradient-to-br from-card to-card/50 rounded-[32px] p-6 border border-border/50 shadow-xl">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Icon name="Zap" size={22} className="text-primary" />
                At a Glance
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-2xl">
                  <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                    <Icon name="Calendar" size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Team Meeting</p>
                    <p className="text-xs text-muted-foreground">10:00 AM - 11:00 AM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-2xl">
                  <div className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center">
                    <Icon name="Mail" size={20} className="text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">3 unread emails</p>
                    <p className="text-xs text-muted-foreground">From Gmail</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'apps':
        const allAppsForList = [...apps, ...storeApps.filter(app => installedApps.includes(app.id)).map(app => ({
          id: app.id,
          name: app.name,
          icon: app.icon,
          color: app.color,
          category: 'social' as const
        }))];
        
        return (
          <div className="flex-1 p-6">
            <h2 className="text-2xl font-light mb-6">All Apps</h2>
            <div className="grid grid-cols-5 gap-6">
              {allAppsForList.map((app) => (
                <button
                  key={app.id}
                  onClick={() => handleAppClick(app.name)}
                  className="flex flex-col items-center gap-3 p-3 rounded-3xl hover:bg-muted/30 transition-all duration-200 active:scale-95 group"
                >
                  <div className={`${app.color} w-16 h-16 rounded-[28px] flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                    <Icon name={app.icon as any} size={30} className="text-white" />
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
            <h2 className="text-2xl font-light mb-6">Files</h2>
            <div className="space-y-3">
              {filteredFiles.map((file) => (
                <button
                  key={file.id}
                  className="w-full flex items-center gap-4 p-5 bg-card rounded-[28px] border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Icon name={file.icon as any} size={26} className="text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium mb-1">{file.name}</p>
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
            <h2 className="text-2xl font-light mb-6">Photos</h2>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded-[24px] flex items-center justify-center hover:scale-[1.02] transition-transform cursor-pointer"
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
            <div className="space-y-3">
              {[
                { icon: 'Wifi', label: 'Network & internet', badge: 'Connected' },
                { icon: 'Bluetooth', label: 'Connected devices', badge: '' },
                { icon: 'Smartphone', label: 'Apps', badge: '' },
                { icon: 'Bell', label: 'Notifications', badge: '5 new' },
                { icon: 'Battery', label: 'Battery', badge: '85%' },
                { icon: 'Volume2', label: 'Sound & vibration', badge: '' },
                { icon: 'Palette', label: 'Display', badge: '' },
                { icon: 'Lock', label: 'Security & privacy', badge: '' },
              ].map((setting, i) => (
                <button
                  key={i}
                  className="w-full flex items-center gap-4 p-5 bg-card rounded-[28px] border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Icon name={setting.icon as any} size={22} className="text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium">{setting.label}</p>
                  </div>
                  {setting.badge && (
                    <span className="text-sm text-muted-foreground">{setting.badge}</span>
                  )}
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        );

      case 'store':
        if (selectedStoreApp) {
          const isInstalled = installedApps.includes(selectedStoreApp.id);
          return (
            <div className="flex-1 flex flex-col bg-background">
              <div className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
                <Button variant="ghost" size="icon" onClick={() => setSelectedStoreApp(null)} className="rounded-full">
                  <Icon name="ArrowLeft" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Icon name="Share2" size={20} />
                </Button>
              </div>
              <ScrollArea className="flex-1">
                <div className="p-6 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className={`${selectedStoreApp.color} w-20 h-20 rounded-[28px] flex items-center justify-center shadow-xl flex-shrink-0`}>
                      <Icon name={selectedStoreApp.icon as any} size={40} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-medium mb-1">{selectedStoreApp.name}</h2>
                      <p className="text-sm text-muted-foreground mb-2">{selectedStoreApp.developer}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="secondary" className="rounded-full">
                          {selectedStoreApp.category}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 py-4 border-y border-border">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <span className="text-lg font-medium">{selectedStoreApp.rating}</span>
                        <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                      </div>
                      <p className="text-xs text-muted-foreground">Rating</p>
                    </div>
                    <div className="text-center border-x border-border">
                      <p className="text-lg font-medium mb-1">{selectedStoreApp.downloads}</p>
                      <p className="text-xs text-muted-foreground">Downloads</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-medium mb-1">{selectedStoreApp.size}</p>
                      <p className="text-xs text-muted-foreground">Size</p>
                    </div>
                  </div>

                  <Button 
                    size="lg" 
                    className="w-full rounded-full"
                    variant={isInstalled ? "outline" : "default"}
                    onClick={() => handleInstallApp(selectedStoreApp.id)}
                  >
                    {isInstalled ? (
                      <>
                        <Icon name="Trash2" size={20} className="mr-2" />
                        Uninstall
                      </>
                    ) : (
                      <>
                        <Icon name="Download" size={20} className="mr-2" />
                        Install
                      </>
                    )}
                  </Button>

                  <div>
                    <h3 className="font-medium mb-3">About this app</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedStoreApp.description}. This is a popular {selectedStoreApp.category} app with over {selectedStoreApp.downloads} downloads worldwide. 
                      Developed by {selectedStoreApp.developer}, it offers a seamless experience with regular updates and new features.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Screenshots</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {Array.from({ length: selectedStoreApp.screenshots }).map((_, i) => (
                        <div
                          key={i}
                          className="aspect-[9/16] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl flex items-center justify-center"
                        >
                          <Icon name="Image" size={32} className="text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium">Ratings & Reviews</h3>
                    {[
                      { name: 'John D.', rating: 5, text: 'Amazing app! Highly recommended.', time: '2 days ago' },
                      { name: 'Sarah M.', rating: 4, text: 'Great features but could use more customization.', time: '1 week ago' },
                      { name: 'Mike R.', rating: 5, text: 'Best app in its category!', time: '2 weeks ago' },
                    ].map((review, i) => (
                      <div key={i} className="p-4 bg-card rounded-2xl border border-border">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                              <span className="text-xs font-medium">{review.name[0]}</span>
                            </div>
                            <span className="text-sm font-medium">{review.name}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{review.time}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Icon
                              key={j}
                              name="Star"
                              size={12}
                              className={j < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            </div>
          );
        }

        return (
          <div className="flex-1 flex flex-col bg-background">
            <div className="bg-card border-b border-border px-6 py-4">
              <h2 className="text-xl font-medium mb-4">Play Store</h2>
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {['all', 'games', 'social', 'entertainment', 'productivity', 'tools'].map((cat) => (
                  <Button
                    key={cat}
                    variant={storeCategory === cat ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStoreCategory(cat)}
                    className="rounded-full capitalize whitespace-nowrap"
                  >
                    {cat === 'all' ? 'All' : cat}
                  </Button>
                ))}
              </div>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Featured Apps</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {filteredStoreApps.slice(0, 3).map((app) => {
                      const isInstalled = installedApps.includes(app.id);
                      return (
                        <div
                          key={app.id}
                          className="p-4 bg-card rounded-3xl border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                          onClick={() => setSelectedStoreApp(app)}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`${app.color} w-16 h-16 rounded-[24px] flex items-center justify-center shadow-lg flex-shrink-0`}>
                              <Icon name={app.icon as any} size={32} className="text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium mb-1">{app.name}</h4>
                              <p className="text-sm text-muted-foreground mb-2 truncate">{app.description}</p>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Icon name="Star" size={12} className="text-yellow-500 fill-yellow-500" />
                                  {app.rating}
                                </span>
                                <span>{app.downloads}</span>
                                <Badge variant="secondary" className="rounded-full text-xs">
                                  {app.category}
                                </Badge>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant={isInstalled ? "outline" : "default"}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleInstallApp(app.id);
                              }}
                              className="rounded-full"
                            >
                              {isInstalled ? 'Installed' : 'Install'}
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">All Apps</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {filteredStoreApps.map((app) => {
                      const isInstalled = installedApps.includes(app.id);
                      return (
                        <div
                          key={app.id}
                          className="p-4 bg-card rounded-3xl border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                          onClick={() => setSelectedStoreApp(app)}
                        >
                          <div className={`${app.color} w-14 h-14 rounded-[20px] flex items-center justify-center shadow-lg mb-3`}>
                            <Icon name={app.icon as any} size={28} className="text-white" />
                          </div>
                          <h4 className="font-medium mb-1 text-sm">{app.name}</h4>
                          <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{app.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Icon name="Star" size={10} className="text-yellow-500 fill-yellow-500" />
                              {app.rating}
                            </span>
                            <Button
                              size="sm"
                              variant={isInstalled ? "outline" : "default"}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleInstallApp(app.id);
                              }}
                              className="rounded-full h-7 px-3 text-xs"
                            >
                              {isInstalled ? 'Installed' : 'Get'}
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <div className="bg-card/80 backdrop-blur-xl border-b border-border/50 px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Icon name="Smartphone" size={22} className="text-primary" />
          <span className="font-medium">Android</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative max-w-md hidden lg:block">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 bg-muted/50 border-0 rounded-full text-sm"
            />
          </div>

          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 hover:bg-muted/50 rounded-full transition-colors"
          >
            <Icon name="Bell" size={18} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-accent rounded-full" />
          </button>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Icon name="Battery" size={16} className="text-green-500" />
            <span>85%</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Icon name="Wifi" size={16} />
          </div>

          <span className="text-xs text-muted-foreground">
            {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      {showNotifications && (
        <div className="absolute right-6 top-16 w-96 bg-card/95 backdrop-blur-xl border border-border rounded-[28px] shadow-2xl z-50 overflow-hidden animate-scale-in">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <h3 className="font-medium">Notifications</h3>
            <Button variant="ghost" size="icon" onClick={() => setShowNotifications(false)} className="rounded-full">
              <Icon name="X" size={18} />
            </Button>
          </div>
          <ScrollArea className="max-h-96">
            <div className="p-4 space-y-3">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="p-4 bg-muted/30 rounded-2xl hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon name={notif.icon as any} size={18} className="text-secondary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm mb-1">{notif.app}</p>
                      <p className="text-xs text-muted-foreground mb-2">{notif.text}</p>
                      <p className="text-xs text-muted-foreground">{notif.time}</p>
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

      <div className="bg-card/80 backdrop-blur-xl border-t border-border/50 px-6 py-3 shadow-sm">
        <div className="flex items-center justify-around max-w-2xl mx-auto">
          {[
            { id: 'home', icon: 'Home', label: 'Home' },
            { id: 'apps', icon: 'Grid3x3', label: 'Apps' },
            { id: 'store', icon: 'ShoppingBag', label: 'Store' },
            { id: 'gallery', icon: 'Images', label: 'Photos' },
            { id: 'settings', icon: 'Settings', label: 'Settings' },
          ].map((nav) => (
            <button
              key={nav.id}
              onClick={() => {
                setCurrentSection(nav.id as Section);
                setOpenApp(null);
                setSelectedStoreApp(null);
              }}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-2xl transition-all duration-200 ${
                currentSection === nav.id && !openApp
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-muted/50 text-muted-foreground'
              }`}
            >
              <Icon name={nav.icon as any} size={22} />
              <span className="text-xs font-medium">{nav.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}