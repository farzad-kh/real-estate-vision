import Link from "next/link";
import DeletePropertyBtn from "../module/DeletePropertyBtn";
import Image from "next/image";

import EditPropertyBtn from "../module/EditPropertyBtn";

const UserCard = ({ property }) => {
  return (
    <div className="  w-full border-b last:border-none animate-fadeIn ">
      <div className="flex gap-4  w-full max-lg:flex-col flex-row  py-4">
        <div className="flex   max-lg:min-w-full max-w-[40%] w-full  max-md:justify-center cursor-pointer ">
          <Link
            className=" h-full overflow-hidden rounded-md w-full max-md:w-[80%] max-sm:w-full cursor-pointer "
            href={`/property/${property.id}`}
          >
            <Image
              width={400}
              height={400}
              sizes="100vw"
              className="aspect-[16/10]  bg-loader  overflow-hidden h-full w-full"
              alt="user card"
              src={property.images[0]}
            />
          </Link>
        </div>
        <div className="w-full flex justify-between  flex-col">
          <div className="w-full space-y-1">
            <Link href={`/property/${property.id}`} className="cursor-pointer">
              <h3 className="text-lg font-semibold ">{property.name}</h3>
            </Link>
            <p className="text-sm capitalize ">
              {property.type} | {property.location.street}
            </p>
            <p className="text-sm capitalize">
              {property.bedrooms} bedrooms ∙ {property.bathrooms} bathrooms ∙{" "}
              {property.square_cm} m² ∙ {property.sleeps} sleeps
            </p>
            <p className="text-ellipsis-vertical text-gray-500 !my-2 text-sm">
              {property?.description}
            </p>
          </div>
          <div className="flex gap-2 mt-2">
            <div className="w-full">
              <EditPropertyBtn id={property.id} />
            </div>
            <div className="w-full">
              <DeletePropertyBtn id={property.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
