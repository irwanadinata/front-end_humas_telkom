import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/62811303128"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-8 lg:right-16 bg-green-500 rounded-full p-4 text-white shadow-lg animate-bounce hover:scale-110 transition-transform duration-2000"
    >
      <MessageCircle size={32} />
    </a>
  );
}
