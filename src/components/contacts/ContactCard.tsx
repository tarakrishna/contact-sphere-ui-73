import { Contact } from '@/types/contact';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, Edit, Trash2, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

export const ContactCard: React.FC<ContactCardProps> = ({ contact, onEdit, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -4 }}
      className="contact-card"
    >
      <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-lg">{contact.name}</h3>
                <p className="text-sm text-muted-foreground">Contact</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-2 text-sm">
              <Mail className="w-4 h-4 text-primary" />
              <span className="text-foreground">{contact.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="w-4 h-4 text-accent" />
              <span className="text-foreground">{contact.phone}</span>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(contact)}
              className="flex-1 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(contact.id)}
              className="flex-1 hover:bg-destructive hover:text-destructive-foreground transition-colors"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};