
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Users, UserPlus, Lock } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-background to-muted/50">
      <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <div className="inline-block p-2 bg-primary/10 rounded-xl mb-4 animate-float">
            <Settings className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-xl text-muted-foreground max-w-lg mx-auto">
            Manage users, permissions, and system settings with our intuitive admin interface.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          <Link to="/admin/users" className="group">
            <Card className="h-full border border-border/50 card-hover">
              <CardHeader className="pb-2">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage your users, admins, and permissions</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                View, edit, and delete users. Control who has admin access to the system.
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full justify-start group-hover:bg-primary/5">
                  Manage Users
                </Button>
              </CardFooter>
            </Card>
          </Link>
          
          <Link to="/admin/users/new" className="group">
            <Card className="h-full border border-border/50 card-hover">
              <CardHeader className="pb-2">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <UserPlus className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Create User</CardTitle>
                <CardDescription>Add new users to the system</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Create new user accounts and set their initial permissions and access levels.
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full justify-start group-hover:bg-primary/5">
                  Add User
                </Button>
              </CardFooter>
            </Card>
          </Link>
          
          <Link to="/admin/password" className="group">
            <Card className="h-full border border-border/50 card-hover">
              <CardHeader className="pb-2">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Password Management</CardTitle>
                <CardDescription>Update and secure user passwords</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Change admin passwords and assist users with password resets.
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full justify-start group-hover:bg-primary/5">
                  Manage Passwords
                </Button>
              </CardFooter>
            </Card>
          </Link>
        </div>
        
        <div className="flex justify-center pt-6">
          <Link to="/admin/settings">
            <Button size="lg" className="px-8">
              <Settings className="mr-2 h-4 w-4" />
              Go to Admin Settings
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
