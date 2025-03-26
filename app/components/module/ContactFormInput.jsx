import { Form } from "antd";
import React, { useState } from "react";
import TextInput from "./TextInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextAreaInput from "./TextAreaInput";
import axios from "axios";
import { useRouter } from "next/navigation";
import HasSentMessageSuccessfully from "./HasSentMessageSuccessfully";
import { contactFormSchema } from "@/zodvalidation/validationSchemas";
import MessageSendSuccess from "./MessageSendSuccess";

const ContactFormInput = ({ id, hasSentMessage }) => {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(contactFormSchema),
  });
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const requestData = { ...data, propertyId: id };
      const res = await axios.post("/api/messages", { requestData });
      if (res.status === 201) {
        setLoading(false);
        setIsSuccess(true);
        reset();
        router.refresh();
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  
 

  if (hasSentMessage && !isSuccess)
    return (
      <HasSentMessageSuccessfully hasSentMessage={hasSentMessage} id={id} />
    );

  if (isSuccess) return <MessageSendSuccess />;

  return (
    <Form
      className=" w-full max-w-[860px] p-2   rounded"
      onFinish={handleSubmit(onSubmit)}
      layout="vertical"
    >
      <div className="form_input">
        <TextInput
          control={control}
          name={"name"}
          errors={errors?.name}
          label={"name"}
          placeholder={"Enter your name"}
        />

        <span className="max-sm:block hidden  h-[1px] w-full  bg-gray-100"></span>
      </div>
      <div className="form_input">
       
        <TextInput
          control={control}
          name="phone.number"
          label="Phone"
          placeholder="123 123 1234"
          errors={errors?.phone?.number}
          phoneName={"phone.code"}
          errorsPhone={errors?.phone?.code}
          phone
        />

        <span className="max-sm:block hidden  h-[1px] w-full  bg-gray-100"></span>
      </div>
      <div className="form_input">
        <TextInput
          control={control}
          name={"email"}
          errors={errors?.email}
          label={"email"}
          placeholder={"Enter your email"}
        />

        <span className="max-sm:block hidden  h-[1px] w-full  bg-gray-100"></span>
      </div>
      <div className="form_input">
        <TextAreaInput
          optional
          control={control}
          name={"text"}
          errors={errors?.text}
          label={"text"}
          placeholder={"Enter your email"}
        />

      
      </div>

      <button
        disabled={loading}
        className="max-md:w-full w-full p-[10px] font-semibold bg-bluePrimery text-white hover:bg-[#2866be] disabled:bg-[#8f9198e5] disabled:cursor-not-allowed rounded-md transition duration-300 ease-in-out"
        type="submit"
      >
        {loading ? (
          <div className="flex gap-1 items-center justify-center">
            SENDING
            <div className="mt-[2px]">
              {" "}
              <div className="loader-dots"></div>
            </div>
          </div>
        ) : (
          "Submit"
        )}
      </button>
    </Form>
  );
};

export default ContactFormInput;
