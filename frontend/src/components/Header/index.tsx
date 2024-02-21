import LogoSection from "./LogoSection";
import NotificationLogoSection from "./NotificationLogoSection";
import ProfileSection from "./ProfileSection";
import SearchSection from "./SearchSection";

const Header = () => {
  return (
    <header className="bg-white w-screen py-4 border-b border-gray-200">
      <div className="w-11/12 flex items-center mx-auto justify-between">
        <div className="flex items-center gap-4 w-1/2">
          <LogoSection />
          <SearchSection />
        </div>
        <div className="flex items-center gap-4 w-1/2 justify-end">
          <NotificationLogoSection />
          <ProfileSection />
        </div>
      </div>
    </header>
  );
};

export default Header;
