import React from "react";
import Skeleton from "react-loading-skeleton";
import "../../scss/skeleton.scss";
const PostSkeleton = () => {
  return (
    <div className="container-fluid skeletonsWrap">
      {Array(3)
        .fill()
        .map((item, index) => {
          return (
            <div key={index} className=" mb-3 skeletonMain  ">
              <Skeleton ducration={1} height={250} width={`100%`} />
              <div className="skelotonBody">
                <Skeleton
                  className="skeletonText mt-1"
                  height={30}
                  width={90}
                />

                <Skeleton
                  className="skeletonText mt-1"
                  height={30}
                  width={70}
                />

                <Skeleton
                  className="skeletonText mt-1 "
                  height={30}
                  width={150}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default PostSkeleton;
