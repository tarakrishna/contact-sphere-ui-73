import { useState, useEffect, useMemo } from 'react';
import { Contact } from '@/types/contact';
import { ContactCard } from '@/components/contacts/ContactCard';
import { ContactModal } from '@/components/contacts/ContactModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Plus, Search, Users, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const { toast } = useToast();

  // Mock data loading
  useEffect(() => {
    const loadContacts = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockContacts: Contact[] = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+1 (555) 123-4567',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          phone: '+1 (555) 987-6543',
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          name: 'Mike Johnson',
          email: 'mike.johnson@example.com',
          phone: '+1 (555) 456-7890',
          createdAt: new Date().toISOString()
        }
      ];
      
      setContacts(mockContacts);
      setLoading(false);
    };

    loadContacts();
  }, []);

  const filteredContacts = useMemo(() => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm)
    );
  }, [contacts, searchTerm]);

  const handleAddContact = () => {
    setEditingContact(null);
    setIsModalOpen(true);
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setIsModalOpen(true);
  };

  const handleSaveContact = async (contactData: Omit<Contact, 'id'>) => {
    setModalLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (editingContact) {
        // Update existing contact
        setContacts(prev => prev.map(contact =>
          contact.id === editingContact.id
            ? { ...contact, ...contactData, updatedAt: new Date().toISOString() }
            : contact
        ));
        toast({
          title: "Contact Updated",
          description: `${contactData.name}'s information has been updated.`,
        });
      } else {
        // Add new contact
        const newContact: Contact = {
          id: Date.now().toString(),
          ...contactData,
          createdAt: new Date().toISOString()
        };
        setContacts(prev => [newContact, ...prev]);
        toast({
          title: "Contact Added",
          description: `${contactData.name} has been added to your contacts.`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save contact. Please try again.",
        variant: "destructive",
      });
    } finally {
      setModalLoading(false);
    }
  };

  const handleDeleteContact = async (id: string) => {
    const contact = contacts.find(c => c.id === id);
    if (!contact) return;

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setContacts(prev => prev.filter(c => c.id !== id));
      toast({
        title: "Contact Deleted",
        description: `${contact.name} has been removed from your contacts.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete contact. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading your contacts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold flex items-center space-x-3">
              <Users className="w-8 h-8 text-primary" />
              <span>My Contacts</span>
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your contact list with ease
            </p>
          </div>
          
          <Button 
            onClick={handleAddContact}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Contact</span>
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-card/50 border-border/50"
          />
        </div>
      </motion.div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact, index) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <ContactCard
                  contact={contact}
                  onEdit={handleEditContact}
                  onDelete={handleDeleteContact}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {searchTerm ? 'No contacts found' : 'No contacts yet'}
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                {searchTerm 
                  ? `No contacts match "${searchTerm}". Try a different search term.`
                  : 'Get started by adding your first contact to ContactSphere.'
                }
              </p>
              {!searchTerm && (
                <Button 
                  onClick={handleAddContact}
                  className="btn-primary"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Your First Contact
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveContact}
        contact={editingContact}
        loading={modalLoading}
      />
    </div>
  );
};

export default Dashboard;