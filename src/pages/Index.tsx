import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Shield, Sparkles, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { LampContainer } from '@/components/ui/lamp';

const Index = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading ContactSphere...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Lamp */}
      <LampContainer className="min-h-screen bg-slate-950">
        <motion.div
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="text-center space-y-6 max-w-4xl mx-auto px-4"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-9 h-9 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white">
              ContactSphere
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            The modern way to manage your contacts. Simple, beautiful, and powerful.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Link to="/register">
              <Button variant="hero" className="px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            
            <Link to="/login">
              <Button variant="hero" className="px-8 py-6 text-lg rounded-xl">
                Sign In
              </Button>
            </Link>
          </div>
        </motion.div>
      </LampContainer>

      {/* Features Section */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose ContactSphere?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience contact management like never before with our modern, intuitive platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Smart Organization",
                description: "Organize your contacts with intelligent search and filtering. Find anyone in seconds."
              },
              {
                icon: Shield,
                title: "Secure & Private",
                description: "Your contact data is encrypted and secure. We prioritize your privacy above all."
              },
              {
                icon: CheckCircle,
                title: "Simple & Intuitive",
                description: "Clean, modern interface that's easy to use. No learning curve required."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 bg-card/30">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to organize your contacts?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of users who trust ContactSphere for their contact management needs.
          </p>
          
          <Link to="/register">
            <Button className="btn-primary text-lg px-12 py-6 rounded-xl shadow-lg hover:shadow-xl">
              Start Managing Contacts Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
