import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md mx-auto"
      >
        <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10 text-white" />
        </div>
        
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-3">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back to ContactSphere.
        </p>
        
        <Link to="/">
          <Button className="btn-primary">
            <Home className="w-5 h-5 mr-2" />
            Return to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
