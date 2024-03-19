import { RouteEndpoints } from "@/utils/Endpoints";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";

const Links = ({ link, title }: { link: string; title: string }) => {
  return (
    <li className="mb-2 text-gray-300 text-[0.9rem]">
      <Link to={link}>{title}</Link>
    </li>
  );
};
const Footer = () => {
  return (
    <footer className="w-full bg-zinc-800 py-10 overflow-hidden">
      <section className="w-11/12 sm:w-10/12 lg:w-9/12 2xl:w-6/12 mx-auto">
        <section className="flex flex-wrap justify-between">
          <div className="text-white">
            <h3 className="text-lg font-semibold">Your Account</h3>
            <ul className="mt-4">
              <Links link={RouteEndpoints.SETTINGS} title="Settings" />
              <Links link={RouteEndpoints.LOGOUT} title="Log Out" />
            </ul>
          </div>
          <div className="text-white">
            <h3 className="text-lg font-semibold">Discover</h3>
            <ul className="mt-4">
              <Links link={RouteEndpoints.HOME} title="Groups" />
              <Links link={RouteEndpoints.HOME} title="Online Events" />
            </ul>
          </div>
          <div className="text-white">
            <h3 className="text-lg font-semibold">Meetup</h3>
            <ul className="mt-4">
              <Links link={RouteEndpoints.HOME} title="About" />
              <Links link={RouteEndpoints.HOME} title="Blog" />
              <Links link={RouteEndpoints.HOME} title="Community Pro" />
              <Links link={RouteEndpoints.HOME} title="Apps" />
              <Links link={RouteEndpoints.HOME} title="Podcast" />
            </ul>
          </div>
        </section>
        <section>
          <h3 className="text-lg font-semibold text-white">Follow Us</h3>
          <ul className="mt-4 flex gap-8">
            <li>
              <FaFacebook className="fill-white h-6 w-6" />
            </li>
            <li>
              <FaXTwitter className="fill-white h-6 w-6" />
            </li>
            <li>
              <FaInstagramSquare className="fill-white h-6 w-6" />
            </li>
            <li>
              <IoLogoYoutube className="fill-white h-6 w-6" />
            </li>
          </ul>
        </section>
        <section>
          <ul className="mt-8 text-white flex gap-4 sm:gap-8 flex-wrap">
            <li className="font-semibold">&copy; Community 2024</li>
            <li>
              {" "}
              <Link to={RouteEndpoints.HOME}>Terms & Conditions</Link>
            </li>
            <li>
              {" "}
              <Link to={RouteEndpoints.HOME}>Privacy Policy</Link>
            </li>
          </ul>
        </section>
      </section>
    </footer>
  );
};

export default Footer;
