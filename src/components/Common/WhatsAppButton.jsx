const WhatsAppButton = ({ phoneNumber = '919876543210', message = 'Hello! I would like to order Vashudha Ghee.' }) => {
  const encodedMessage = encodeURIComponent(message)
  const href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
      aria-label="Order on WhatsApp"
    >
      {/* WhatsApp SVG Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-6 h-6 flex-shrink-0"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M16 0C7.163 0 0 7.163 0 16c0 2.833.737 5.49 2.027 7.8L0 32l8.44-2.012A15.93 15.93 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm8.184 22.184c-.347.977-2.017 1.869-2.782 1.987-.733.114-1.66.162-2.678-.168-.617-.2-1.41-.466-2.426-.913-4.264-1.844-7.053-6.137-7.272-6.422-.22-.285-1.794-2.39-1.794-4.558s1.136-3.23 1.54-3.674c.404-.444.882-.556 1.175-.556.294 0 .588.003.845.016.27.013.635-.103.993.757.37.887 1.257 3.065 1.368 3.29.11.223.184.485.037.778-.147.294-.22.476-.44.733-.22.257-.463.574-.66.77-.22.22-.448.458-.193.9.256.441 1.138 1.88 2.445 3.047 1.677 1.494 3.09 1.957 3.532 2.177.441.22.697.184.953-.11.256-.294 1.1-1.283 1.393-1.724.294-.44.588-.367.993-.22.404.147 2.566 1.21 3.007 1.43.44.22.734.33.844.514.11.184.11 1.064-.237 2.04z" />
      </svg>
      <span className="text-sm font-semibold hidden sm:inline whitespace-nowrap">Order on WhatsApp</span>
    </a>
  )
}

export default WhatsAppButton
