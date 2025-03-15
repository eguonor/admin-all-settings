
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useUsers, User } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, UserCheck, UserMinus, Trash2, Edit, CheckCircle, XCircle } from 'lucide-react';

const AdminUsers = () => {
  const { users, updateUser, deleteUser, loading } = useUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'delete' | 'edit'>('delete');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const terms = searchTerm.toLowerCase().split(' ');
    return terms.every((term) => 
      user.name.toLowerCase().includes(term) || 
      user.email.toLowerCase().includes(term)
    );
  });

  const handlePromoteUser = (user: User) => {
    updateUser(user.id, { isAdmin: true });
  };

  const handleDemoteUser = (user: User) => {
    updateUser(user.id, { isAdmin: false });
  };

  const openDeleteDialog = (user: User) => {
    setSelectedUser(user);
    setDialogType('delete');
    setIsDialogOpen(true);
  };

  const openEditDialog = (user: User) => {
    setSelectedUser(user);
    setDialogType('edit');
    setIsDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedUser) {
      deleteUser(selectedUser.id);
    }
    setIsDialogOpen(false);
  };

  const handleEditUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    if (selectedUser) {
      updateUser(selectedUser.id, { name, email });
    }
    setIsDialogOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-2">
            View and manage all users in the system. Control user roles and permissions.
          </p>
        </div>
        
        <Separator />
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search users by name or email..."
            className="pl-10"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        <div className="grid gap-6">
          {filteredUsers.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <Search className="h-10 w-10 text-muted-foreground opacity-50" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">No users found</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try adjusting your search terms.
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredUsers.map((user) => (
              <Card key={user.id} className="overflow-hidden transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium text-lg">{user.name}</h3>
                        {user.isAdmin && (
                          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none">
                            Admin
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <p className="text-xs text-muted-foreground">Created: {new Date(user.createdAt).toLocaleDateString()}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 self-end md:self-auto">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => openEditDialog(user)}
                        className="gap-1"
                      >
                        <Edit className="h-4 w-4" />
                        <span className="hidden sm:inline">Edit</span>
                      </Button>
                      
                      {user.isAdmin ? (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDemoteUser(user)}
                          className="gap-1"
                        >
                          <UserMinus className="h-4 w-4" />
                          <span className="hidden sm:inline">Remove Admin</span>
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handlePromoteUser(user)}
                          className="gap-1"
                        >
                          <UserCheck className="h-4 w-4" />
                          <span className="hidden sm:inline">Make Admin</span>
                        </Button>
                      )}
                      
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => openDeleteDialog(user)}
                        className="gap-1"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="hidden sm:inline">Delete</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {dialogType === 'delete' ? (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Delete User</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete {selectedUser?.name}? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={confirmDelete}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete User"}
              </Button>
            </DialogFooter>
          </DialogContent>
        ) : (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>
                Update user information.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditUser}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={selectedUser?.name}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={selectedUser?.email}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        )}
      </Dialog>
    </DashboardLayout>
  );
};

export default AdminUsers;
