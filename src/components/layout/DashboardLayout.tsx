
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Users,
  Settings,
  Lock,
  UserPlus,
  ChevronLeft,
  Menu,
  X,
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavigationItem {
  title: string;
  icon: React.ReactNode;
  href: string;
}

const navigationItems: NavigationItem[] = [
  {
    title: 'User Management',
    icon: <Users className="h-5 w-5" />,
    href: '/admin/users',
  },
  {
    title: 'Add User',
    icon: <UserPlus className="h-5 w-5" />,
    href: '/admin/users/new',
  },
  {
    title: 'Change Password',
    icon: <Lock className="h-5 w-5" />,
    href: '/admin/password',
  },
  {
    title: 'Settings',
    icon: <Settings className="h-5 w-5" />,
    href: '/admin/settings',
  },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile menu button */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-apple",
          isMobile && !sidebarOpen && "-translate-x-full",
          "glass-panel"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="p-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                <Settings className="h-5 w-5 text-white" />
              </div>
              <span className="font-semibold text-lg">Admin Dashboard</span>
            </Link>
          </div>
          <Separator />
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ease-apple focus-ring",
                  location.pathname === item.href
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </nav>
          <div className="p-4">
            <Link to="/">
              <Button
                variant="outline"
                className="w-full flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Back to Site</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div 
        className={cn(
          "flex-1 transition-all duration-300 ease-apple",
          sidebarOpen ? "md:ml-64" : "ml-0"
        )}
      >
        <main className="mx-auto max-w-5xl p-6 md:p-10 page-transition">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
