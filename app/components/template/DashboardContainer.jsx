 
 
import Image from 'next/image';

const DashboardContainer = ({user}) => {
    return (
        <div className="flex justify-center items-center  p-5 sm:text-xl text-base flex-col gap-y-1 font-semibold text ">
      <Image
        className="rounded-full"
        alt="profile"
        width={60}
        height={60}
        src={user.image}
      />
      <div className="flex gap-1 ">
        <p>welcome</p>
        <h4 className="">{user?.name}</h4>
      </div>
      <p className="text-slate-600 ">{user?.email}</p>
    </div>
    );
};

export default DashboardContainer;