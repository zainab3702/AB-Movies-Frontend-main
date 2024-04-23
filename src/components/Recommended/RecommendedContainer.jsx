import { useSelector } from "react-redux";
import RecommendedCard from "./RecommendedCard";
const RecommendedContainer = () => {
  const recomendedData = useSelector((state) => state.recommended);
  const media_type = recomendedData.type;
  return (
    <>
      {/* heading */}
      <h1 className="my-4 place-self-start text-2xl font-extralight sm:text-4xl">
        Recommended For You
      </h1>

      <div className="grid grid-cols-1 gap-8 gap-x-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 2xl:gap-x-6">
        <RecommendedCard data={recomendedData.data} type={media_type} />
      </div>
    </>
  );
};

export default RecommendedContainer;
