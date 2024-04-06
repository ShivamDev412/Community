import Divider from "./Divider";
import GoogleSignUpButton from "./GoogleSignUpButton";

const SocialSignupSection = () => {
  return (
    <section className="mt-4 flex w-full xs:w-full sm:w-3/4 xl:w-8/12 2xl:w-6/12 flex-col gap-4">
      <Divider />
      <GoogleSignUpButton />
    </section>
  );
};

export default SocialSignupSection;
