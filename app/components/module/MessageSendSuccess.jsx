
import successAnime from "@/public/success-contact.json";
import Lottie from "lottie-react";
const MessageSendSuccess = () => {
  return (
    <div className="flex justify-center flex-col  items-center   p-6 rounded border-t">
      <Lottie
        className="w-[20%] h-[20%]"
        animationData={successAnime}
        loop={false}
      />
      <div className=" font-bold text-xl text-center mb-1">
        Message sent successfully!
      </div>
      <p  className="text-center text-gray-500" >
        Your message was sent successfully. The owner will contact you after
        reviewing your message.
      </p>
    </div>
  );
};

export default MessageSendSuccess;
