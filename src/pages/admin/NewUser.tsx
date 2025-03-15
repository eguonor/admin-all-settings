
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useUsers } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { UserPlus } from 'lucide-react';
import { toast } from 'sonner';

const AdminNewUser = () => {
  const navigate = useNavigate();
  const { addUser, loading } = useUsers();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    const isAdmin = formData.get('isAdmin') === 'on';
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    addUser({ name, email, isAdmin });
    navigate('/admin/users');
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New User</h1>
          <p className="text-muted-foreground mt-2">
            Add a new user to the system and set their permissions.
          </p>
        </div>
        
        <Separator />
        
        <Card className="overflow-hidden">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">User Details</CardTitle>
            <CardDescription>Enter the information for the new user account.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" placeholder="John Doe" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" placeholder="john@example.com" required />
              </div>
              
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" placeholder="••••••••" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" required />
                </div>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Switch id="isAdmin" name="isAdmin" />
                <Label htmlFor="isAdmin" className="font-normal cursor-pointer">
                  Grant administrator privileges to this user
                </Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => navigate('/admin/users')}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="gap-2">
                <UserPlus className="h-4 w-4" />
                {loading ? 'Creating...' : 'Create User'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminNewUser;
