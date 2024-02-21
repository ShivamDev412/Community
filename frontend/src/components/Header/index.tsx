import LogoSection from "./LogoSection";
import SearchSection from "./SearchSection";

const Header = () => {
  return (
    <header className="bg-white w-screen py-4 border-b border-gray-200">
      <div className="w-11/12 flex items-center mx-auto">
        <div className="flex items-center gap-4 w-full">
          <LogoSection />
          <SearchSection />
        </div>
      </div>
    </header>
  );
};

export default Header;
