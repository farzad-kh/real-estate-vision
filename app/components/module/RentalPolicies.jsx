 
import { MdFiberManualRecord } from "react-icons/md";

const RentalPolicies = () => {
  return (
    <>
      <h3 className=" text-lg font-semibold mb-3">Payment Conditions</h3>
      <ul className="flex flex-col  gap-2">
        <li className="flex gap-1">
          <div className=" text-gray-800 self-center">
            <MdFiberManualRecord className="w-2" />
          </div>
          The down payment to secure this home is 20%
        </li>
        <li className="flex gap-1">
          <div className=" text-gray-800 self-center">
            <MdFiberManualRecord className="w-2" />
          </div>
          The final balance is due 60 days prior to arrival
        </li>
        <li className="flex gap-1">
          <div className=" text-gray-800 self-center">
            <MdFiberManualRecord className="w-2" />
          </div>
          The balance is due at the time of booking, if your reservation is
          within 60 days of arrival
        </li>
        <li className="flex gap-1">
          <div className=" text-gray-800 self-center">
            <MdFiberManualRecord className="w-2"  />
          </div>
          We accept all major credit/debit cards, bank transfer, check or cash
        </li>
      </ul>
    </>
  );
};

export default RentalPolicies;
