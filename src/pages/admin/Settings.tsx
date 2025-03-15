
import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useUsers } from '@/contexts/UserContext';
import { 
  Users, 
  UserPlus,
  Lock, 
  Settings, 
  ChevronRight
} from 'lucide-react';

const AdminSettings = () => {
  const { users } = useUsers();
  const adminCount = users.filter(user => user.isAdmin).length;
  const userCount = users.length;
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your application's administrative settings and user accounts.
          </p>
        </div>
        
        <Separator />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-none">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Users</span>
                <Users className="h-5 w-5 text-primary" />
              </CardTitle>
              <CardDescription>Total registered users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{userCount}</div>
              <div className="text-sm text-muted-foreground mt-1">
                Including {adminCount} administrators
              </div>
            </CardContent>
          </Card>
        </div>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">Quick Actions</h2>
        
        <div className="grid gap-4">
          <Link to="/admin/users">
            <Card className="transition-all hover:shadow-md hover:border-primary/50">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">User Management</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage user accounts and admin privileges
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/admin/users/new">
            <Card className="transition-all hover:shadow-md hover:border-primary/50">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <UserPlus className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Create New User</h3>
                    <p className="text-sm text-muted-foreground">
                      Add new users to the system
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/admin/password">
            <Card className="transition-all hover:shadow-md hover:border-primary/50">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Lock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Password Management</h3>
                    <p className="text-sm text-muted-foreground">
                      Update admin passwords and security settings
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>
        </div>
        
        <div className="mt-8 flex justify-center">
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link to="/">
              <Settings className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Link>
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings;
