import LogoSection from "./LogoSection";
import NotificationLogoSection from "./NotificationLogoSection";
import ProfileSection from "./ProfileSection";
import ResponsiveHeader from "./ResponsiveHeader";
import SearchSection from "./SearchSection";

const Header = () => {
  return (
    <header className="bg-white w-screen sm:py-4 sm:border-b border-gray-200 font-display fixed top-0 left-0 z-10">
      <div className="xs:hidden w-11/12 sm:flex items-center mx-auto justify-between">
        <div className="flex items-center gap-4 w-[80%] lg:w-[60%] xl:w-1/2">
          <LogoSection />
          <SearchSection />
        </div>
        <div className="flex items-center gap-4 w-fit justify-end">
          <NotificationLogoSection />
          <ProfileSection />
        </div>
      </div>
      <ResponsiveHeader />
    </header>
  );
};

export default Header;
