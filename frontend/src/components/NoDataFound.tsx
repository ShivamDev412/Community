import NoData from "../assets/no_data.png";
const NoDataFound = ({text}:{text:string}) => {
  return (
    <div className="flex justify-center w-fit flex-col gap-2 items-center mx-auto">
      <div className="h-auto w-auto">
        <img src={NoData} alt="no_data_image" className="w-full h-full " />
      </div>
      <h4 className="font-semibold text-lg">{text}</h4>
    </div>
  );
};

export default NoDataFound;
