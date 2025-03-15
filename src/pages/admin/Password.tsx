
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useUsers } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

const PasswordRequirement = ({ met, text }: { met: boolean; text: string }) => (
  <div className="flex items-center space-x-2">
    <div className={`rounded-full p-0.5 ${met ? 'text-green-500' : 'text-muted-foreground'}`}>
      <CheckCircle2 className="h-4 w-4" />
    </div>
    <span className={`text-sm ${met ? 'text-foreground' : 'text-muted-foreground'}`}>{text}</span>
  </div>
);

const AdminPassword = () => {
  const { users, changePassword, loading } = useUsers();
  const adminUsers = users.filter(user => user.isAdmin);
  
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Password requirements checking
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const passwordsMatch = password === confirmPassword;
  
  const isPasswordValid = hasMinLength && hasUppercase && hasNumber && hasSpecialChar;
  const canSubmit = userId && isPasswordValid && passwordsMatch;
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!canSubmit) {
      toast.error('Please fix the password issues before submitting');
      return;
    }
    
    changePassword(userId, password);
    setPassword('');
    setConfirmPassword('');
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Change Admin Password</h1>
          <p className="text-muted-foreground mt-2">
            Update passwords for administrator accounts.
          </p>
        </div>
        
        <Separator />
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="overflow-hidden md:col-span-2">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Lock className="h-5 w-5" />
                <span>Password Management</span>
              </CardTitle>
              <CardDescription>
                Create a new password for the selected administrator account.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="user">Select Admin User</Label>
                  <Select value={userId} onValueChange={setUserId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an admin user" />
                    </SelectTrigger>
                    <SelectContent>
                      {adminUsers.map(user => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name} ({user.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">New Password</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="pr-10"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                  />
                </div>
                
                <div className="p-4 border rounded-lg bg-muted/30 space-y-2">
                  <h4 className="text-sm font-medium mb-2">Password Requirements:</h4>
                  <PasswordRequirement met={hasMinLength} text="At least 8 characters long" />
                  <PasswordRequirement met={hasUppercase} text="At least one uppercase letter" />
                  <PasswordRequirement met={hasNumber} text="At least one number" />
                  <PasswordRequirement met={hasSpecialChar} text="At least one special character" />
                  <PasswordRequirement met={passwordsMatch} text="Passwords match" />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={!canSubmit || loading}
                >
                  {loading ? 'Updating Password...' : 'Update Password'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminPassword;
