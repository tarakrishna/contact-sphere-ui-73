import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { contactsAPI } from '@/lib/api';
import { Contact, ContactFormData } from '@/types/contact';

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const contactsData = await contactsAPI.getContacts();
      setContacts(contactsData);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to fetch contacts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createContact = async (contactData: ContactFormData): Promise<boolean> => {
    try {
      const newContact = await contactsAPI.createContact(contactData);
      setContacts(prev => [newContact, ...prev]);
      
      toast({
        title: "Contact Created",
        description: `${contactData.name} has been added to your contacts.`,
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create contact",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateContact = async (id: string, contactData: Partial<ContactFormData>): Promise<boolean> => {
    try {
      const updatedContact = await contactsAPI.updateContact(id, contactData);
      setContacts(prev => 
        prev.map(contact => 
          contact.id === id ? updatedContact : contact
        )
      );
      
      toast({
        title: "Contact Updated",
        description: "Contact has been successfully updated.",
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update contact",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteContact = async (id: string): Promise<boolean> => {
    try {
      await contactsAPI.deleteContact(id);
      setContacts(prev => prev.filter(contact => contact.id !== id));
      
      toast({
        title: "Contact Deleted",
        description: "Contact has been successfully deleted.",
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete contact",
        variant: "destructive",
      });
      return false;
    }
  };

  const getContact = async (id: string): Promise<Contact | null> => {
    try {
      const contact = await contactsAPI.getContact(id);
      return contact;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to fetch contact",
        variant: "destructive",
      });
      return null;
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return {
    contacts,
    loading,
    createContact,
    updateContact,
    deleteContact,
    getContact,
    refreshContacts: fetchContacts,
  };
};