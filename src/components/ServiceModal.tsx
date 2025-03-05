import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    title: string;
    icon: React.ReactNode;
    description: string;
    details: string;
    benefits: string[];
  };
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, service }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 modal-overlay">
      <div 
        ref={modalRef}
        className="relative max-w-2xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 modal-content"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={24} />
        </button>
        
        <div className="flex items-center mb-4">
          <div className="mr-4 p-2 bg-amber-100 dark:bg-amber-900 rounded-full">
            {service.icon}
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{service.title}</h3>
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 mb-6">{service.description}</p>
        
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Detalhes do Serviço</h4>
          <p className="text-gray-700 dark:text-gray-300">{service.details}</p>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Benefícios</h4>
          <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
            {service.benefits.map((benefit, index) => (
              <li key={index} className="mb-1">{benefit}</li>
            ))}
          </ul>
        </div>
        
        <div className="mt-8 text-center">
          <button 
            onClick={onClose}
            className="mr-2 px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md text-gray-800 dark:text-white transition-colors"
          >
            Fechar
          </button>
          <button 
            className="px-6 py-2 bg-amber-500 hover:bg-amber-600 rounded-md text-white transition-colors"
            onClick={() => {
              onClose();
              const contactSection = document.getElementById('contato');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Solicitar Orçamento
          </button>
        </div>
      </div>
    </div>
  );
}; 