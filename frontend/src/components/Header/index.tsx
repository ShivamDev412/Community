import LogoSection from "./LogoSection";
import NotificationLogoSection from "./NotificationLogoSection";
import ProfileSection from "./ProfileSection";
import ResponsiveHeader from "./ResponsiveHeader";
import SearchSection from "./SearchSection";

const Header = () => {
  return (
    <header className="bg-white w-screen sm:py-4 sm:border-b border-gray-200 font-display">
      <div className="xs:hidden w-11/12 sm:flex items-center mx-auto justify-between">
        <div className="flex items-center gap-4 w-1/2">
          <LogoSection />
          <SearchSection />
        </div>
        <div className="flex items-center gap-4 w-1/2 justify-end">
          <NotificationLogoSection />
          <ProfileSection />
        </div>
      </div>
      <ResponsiveHeader />
    </header>
  );
};

export default Header;
