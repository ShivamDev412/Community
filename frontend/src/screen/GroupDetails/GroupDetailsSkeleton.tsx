import Skeleton from "@mui/material/Skeleton";
import { Box } from "@mui/material";

const GroupDetailHeaderSkeleton = () => {
  return (
    <Box className="pb-4 border-b border-gray-300 overflow-x-hidden">
      <Box className="w-11/12 sm:w-10/12 lg:w-9/12 2xl:w-6/12 mx-auto h-full mt-5">
        <Box className="flex flex-wrap justify-between">
          <Skeleton
            variant="rounded"
            className="w-1/2 h-[3in] mr-5"
            animation="wave"
          />
          <Box className="h-full w-[48%] flex-col mt-10">
            <Skeleton
              variant="rectangular"
              className="w-full h-10 mb-4"
              animation="wave"
            />
            <Skeleton
              variant="rectangular"
              className="w-full h-5 mb-4"
              animation="wave"
            />
            <Skeleton
              variant="rectangular"
              className="w-8/12 h-5 mb-4"
              animation="wave"
            />
            <Skeleton
              variant="rectangular"
              className="w-full h-5 mb-4"
              animation="wave"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
const GroupDetailsSkeleton = () => {
  return (
    <>
      <GroupDetailHeaderSkeleton />
      <Box className="w-11/12 sm:w-10/12 lg:w-9/12 2xl:w-6/12 mx-auto mt-5">
        <Skeleton
          variant="rectangular"
          className="w-1/2 h-10 mb-4"
          animation="wave"
        />
        <Box className="flex gap-6">
          <Skeleton
            variant="rectangular"
            className="w-1/2 h-[3.5in] mb-4"
            animation="wave"
          />
          <Box className="w-1/2">
            <Skeleton
              variant="rectangular"
              className="w-full h-10 mb-4"
              animation="wave"
            />
            <Skeleton
              variant="circular"
              className="w-[0.8in] h-[0.8in] mb-4"
              animation="wave"
            />
            <Skeleton
              variant="rectangular"
              className="w-full h-[1in] mb-4"
              animation="wave"
            />
            <Skeleton
              variant="rectangular"
              className="w-full h-[1in] mb-4"
              animation="wave"
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default GroupDetailsSkeleton;
