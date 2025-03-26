import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/971522172300" // Replace with your WhatsApp number
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[50px] right-4 z-20 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all"
    >
      <FaWhatsapp size={30} />
    </a>
  );
};

export default WhatsAppButton;
