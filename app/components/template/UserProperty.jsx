import UserCard from "../UI/UserCard";

import { GoPlus } from "react-icons/go";
import Link from "next/link";
import { HomeOutlined } from "@ant-design/icons";
import PaginationUI from "../UI/PaginationUI";
const UserProperty = ({ userProperty, userPropertyTotal ,pageSize}) => {
  if (userProperty.length === 0) return <UserPropertyNotFound />;
 
  return (
    <section className="w-full ">
      <div className="w-full relative">
        <div className="flex justify-start gap-9 flex-col">
          <div className="mt-1">
            <h2 className=" text-xl font-semibold mb-3 ">My Propperty</h2>
          </div>
          <div className="flex justify-end mb-6">
            <Link
              href={"properties/new"}
              className=" flex items-center py-3 px-5 border text-[#191919] hover:border-blue-500 border-zinc-600  hover:bg-bluePrimery hover:text-white  max-md:text-sm rounded-md  transition-all"
            >
              <GoPlus className="mr-2 text-xl self-center " />
              Add new property
            </Link>
          </div>
          {userProperty && (
            <div className="  flex  flex-col gap-4   ">
              {userProperty?.map((item) => (
                <UserCard key={item.id} property={item} />
              ))}
            </div>
          )}
          <PaginationUI
            propertiesTotal={userPropertyTotal}
            pageSize={pageSize}
          />
        </div>
      </div>
    </section>
  );
};

export default UserProperty;

export const UserPropertyNotFound = () => (
  <div className="w-full justify-center items-center flex max-md:mt-11">
    <div className="flex flex-col gap-4 items-center">
      <div>
        <HomeOutlined className="text-xl" />
      </div>
      <p>You haven't posted any property!</p>
      <div className="flex justify-end">
        <Link
          href={"properties/new"}
          className="flex items-center py-3 px-5 border text-[#191919] hover:border-blue-500 border-zinc-600 hover:bg-bluePrimery hover:text-white max-md:text-sm rounded-md transition-all"
        >
          <GoPlus className="mr-2 text-xl self-center" />
          Add new property
        </Link>
      </div>
    </div>
  </div>
);
