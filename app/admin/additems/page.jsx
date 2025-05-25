import React from "react";
import LeftLaptoSideNav from "../LeftLaptoSideNav";
import MobileAdminNav from "../MobileAdminNav";
import RightAddItem from "./RightAddItem";


const page = () => {
  return (
    <div>

      
      <div>
        <MobileAdminNav />
      </div>

      <div className="flex">
        <LeftLaptoSideNav />{" "}{/* left side admin panel which changes right side component */}

{/* Below add componet with lg:w-[83%]  w-full */}
          <RightAddItem/>
      </div>
    </div>
  );
};

export default page;
