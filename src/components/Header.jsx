export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <a className="text-4xl font-extrabold text-blue-700 tracking-tight">
            POLMI
          </a>
          <span className="ml-2 text-xl font-medium text-gray-600">
            L*sha Framework
          </span>
        </div>
        <div className="flex items-center space-x-8">
          <a
            href="#"
            className="text-lg font-medium text-gray-600 hover:text-blue-700 transition-colors duration-200">
            Documents
          </a>
          <a
            href="#"
            className="text-lg font-medium text-gray-600 hover:text-blue-700 transition-colors duration-200">
            Dark Mode
          </a>
          <a
            href="#"
            className="text-lg font-medium text-gray-600 hover:text-blue-700 transition-colors duration-200">
            GitHub
          </a>
        </div>
      </nav>
    </header>
  );
}
