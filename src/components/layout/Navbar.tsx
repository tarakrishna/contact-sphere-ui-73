import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, Sparkles, User } from 'lucide-react';
import { motion } from 'framer-motion';

export const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-card/80 backdrop-blur-lg border-b border-border/50 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ContactSphere
            </h1>
          </motion.div>

          {/* User Actions */}
          {isAuthenticated && user ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground font-medium">{user.username}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{user.email}</span>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="flex items-center space-x-2 hover:bg-destructive hover:text-destructive-foreground"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              Welcome to ContactSphere
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};