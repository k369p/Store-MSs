import React from 'react';
import { Link } from 'react-router-dom';
import { Store, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Store className="h-8 w-8 text-blue-400" />
              <h3 className="text-lg font-semibold ml-2">QuickMart</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Your neighborhood convenience store for all your daily needs.
            </p>
          </div>
          
          <div>
            <h4 className="text-base font-medium mb-4">Store Hours</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Monday - Friday: 6am - 11pm</li>
              <li>Saturday: 7am - 11pm</li>
              <li>Sunday: 8am - 10pm</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-base font-medium mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                (555) 123-4567
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                info@quickmart.com
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                123 Main Street
                <br />City, State 12345
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-base font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-300 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} QuickMart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};