
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/sonner';

// Define types for our user data
export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
}

interface UserContextType {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  updateUser: (id: string, data: Partial<User>) => void;
  deleteUser: (id: string) => void;
  changePassword: (userId: string, newPassword: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Sample initial data
const initialUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    isAdmin: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    isAdmin: false,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    name: 'Jane Smith',
    email: 'jane@example.com',
    isAdmin: false,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(initialUsers[0]); // Set first user as current
  const [loading, setLoading] = useState(false);

  const addUser = (userData: Omit<User, 'id' | 'createdAt'>) => {
    setLoading(true);
    
    try {
      // In a real app, this would be an API call
      const newUser: User = {
        ...userData,
        id: `${users.length + 1}`,
        createdAt: new Date().toISOString(),
      };
      
      setUsers((prev) => [...prev, newUser]);
      toast.success('User created successfully');
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  const updateUser = (id: string, data: Partial<User>) => {
    setLoading(true);
    
    try {
      // In a real app, this would be an API call
      setUsers((prev) => 
        prev.map((user) => 
          user.id === id ? { ...user, ...data } : user
        )
      );
      
      // Update current user if it's the one being modified
      if (currentUser && currentUser.id === id) {
        setCurrentUser((prev) => prev ? { ...prev, ...data } : null);
      }
      
      toast.success('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = (id: string) => {
    setLoading(true);
    
    try {
      // In a real app, this would be an API call
      setUsers((prev) => prev.filter((user) => user.id !== id));
      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  const changePassword = (userId: string, newPassword: string) => {
    setLoading(true);
    
    try {
      // In a real app, this would be an API call to change password
      // Here we'll just simulate success
      setTimeout(() => {
        toast.success('Password changed successfully');
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error('Failed to change password');
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        currentUser,
        loading,
        addUser,
        updateUser,
        deleteUser,
        changePassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};
