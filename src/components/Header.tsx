import React from "react";

// Update the interface - change onLogin to addUser
interface HeaderProps {
  title: string;
  showNav?: boolean;
  addUser?: () => void;  // ← Changed from onLogin
}

const Header: React.FC<HeaderProps> = ({ title, showNav = true, addUser }) => {
  return (
    <header className="bg-linear-to-r/oklch from-gray-700 to-gray-400
 text-[#d6d3d1] px-4 sm:px-6 py-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <h1 className="text-xl sm:text-2xl font-bold text-center sm:text-left">
          {title}
        </h1>
        
        {showNav && (
          <nav className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center w-full sm:w-auto">
            
            {addUser && (
              <button
  onClick={addUser}
  className="relative inline-flex items-center justify-start overflow-hidden px-6 py-3 font-bold rounded-full group w-full sm:w-auto text-sm sm:text-base"
>
  {/* animated overlay */}
  <span className="absolute left-0 top-0 w-32 h-32 rotate-45 translate-x-12 -translate-y-2 bg-white opacity-3"></span>
  <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>

  {/* button text */}
  <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">
    + Add Card
  </span>

  {/* outer border */}
  <span className="absolute inset-0 border-2 border-white rounded-full"></span>
</button>

            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
