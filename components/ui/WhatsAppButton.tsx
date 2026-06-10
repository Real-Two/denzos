import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/91XXXXXXXXXX"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:scale-105 hover:bg-[#20B858] transition-all duration-300 group"
    >
      <MessageCircle size={20} className="fill-white" />
      <span className="font-inter text-xs font-medium overflow-hidden max-w-0 group-hover:max-w-[80px] transition-all duration-300 whitespace-nowrap">
        WhatsApp
      </span>
    </a>
  );
}
