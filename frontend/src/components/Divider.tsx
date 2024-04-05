
const Divider = () => {
  return (
    <div className="flex items-center sm:w-3/4 xl:w-8/12 2xl:w-6/12 mx-auto justify-center">
      <span className="bg-gray-600 flex-grow h-[1px] w-10/12"></span>
      <span className="mx-2 flex justify-center text-lg text-gray-600">OR</span>
      <span className="bg-gray-600 flex-grow h-[1px] w-10/12"></span>
    </div>
  );
};

export default Divider;
