export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4">
      {/* Logo */}
      <div className="flex items-center gap-3">
        {/* Leaf icon */}
        <div className="w-10 h-10 bg-brand rounded-full flex items-center justify-center shadow-md">
          <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20 32C20 32 8 24 8 14C8 9.58 11.58 6 16 6C18.12 6 20 6.84 21.42 8.2C22.84 6.84 24.72 6 27 6C31.42 6 35 9.58 35 14C35 24 20 32 20 32Z"
              fill="white"
            />
            <path d="M20 32V12" stroke="#1a6b3c" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <div className="text-brand font-bold text-lg leading-tight">Nagorik Bhumi</div>
          <div className="text-gray-500 text-xs">Land Services for a Better Bangladesh</div>
        </div>
      </div>

      {/* Language switcher */}
      <nav className="flex items-center gap-2 text-sm text-gray-600">
        <button className="hover:text-brand transition-colors font-medium">বাংলা</button>
        <span className="text-gray-300">|</span>
        <button className="hover:text-brand transition-colors font-medium text-brand">English</button>
      </nav>
    </header>
  );
}
