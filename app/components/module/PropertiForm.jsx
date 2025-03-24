"use client";
import React, {  useState } from "react";
import { Form, message } from "antd";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "@/app/components/module/TextInput";
import SelectType from "@/app/components/module/SelectType";

import dynamic from "next/dynamic";
import CheckboxInput from "@/app/components/module/CheckboxInput";
import SelectMultiple from "@/app/components/module/SelectMultiple";
import {
  ratesFields,
  propertyFields,
  locationFields,
  rulesFields,

  checkTimeRulesFields,
  locationFieldsZipCountry,
} from "@/constants/formConstants/formFields";
import PicturesWall from "@/app/components/UI/PicturesWall";
import {
  createPropertiSchema,

} from "@/zodvalidation/validationSchemas";
import axios from "axios";
import { getBase64 } from "@/app/utils/helpers";
import { useRouter } from "next/navigation";
import TimePickerInput from "./TimePickerInput";
import dayjs from "dayjs";

const SimpleMde = dynamic(() => import("@/app/components/module/SimpleMde"), {
  ssr: false,
});
const PropertiForm = ({ property }) => {
  if (property) {
    property.rules.checkIn = dayjs(property.rules.checkIn);
    property.rules.checkOut = dayjs(property.rules.checkOut);
  }

  const [isLoading, setIsloading] = useState(false);

  const defaultVal = {
    rules: {
      pets: false,
      children: false,
      smoking: false,
      events: false,
    },
    rates: {
      night: 0,
      week: 0,
      month: 0,
    },
  };

  const defaultValues = property ? property : defaultVal;
  // let schema = createPropertiSchema;
  // useEffect(() => {
  //   schema = property ? createPropertiSchemaEdit : createPropertiSchema;
  // }, [property]);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,

    formState: { errors, isValid },
  } = useForm({
    defaultValues,
    mode: "onChange",

    resolver: zodResolver(createPropertiSchema),
  });

  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const imgWatch = watch("images");

  const rates = ratesFields(errors);
  const propertyMain = propertyFields(errors);
  const locations = locationFields(errors);
  const ZipCountry = locationFieldsZipCountry(errors);
 
  const checkTime = checkTimeRulesFields(errors);




  const onSubmit = async (data) => {
  
    data.rules.checkIn = new Date(data.rules.checkIn).toISOString();
    data.rules.checkOut = new Date(data.rules.checkOut).toISOString();

    
    if (isValid || data) {
      messageApi.open({
        type: "loading",
        content: "Uploading...",
        duration: 0,
      });
      setIsloading(true);
    }
    const filesOnly = data.images.filter((item) => item instanceof File);

    const base64Images = [];
    try {
      if (filesOnly) {
        const doneImages = data.images?.filter(
          (img) => typeof img === "string" && img.includes("res.cloudinary.com")
        );

        const base64Format = await Promise.all(
          filesOnly.map(async (file) => {
            const base64 = await getBase64(file);
            return base64;
          })
        );
        base64Images.push(...base64Format, ...doneImages);
      } else base64Images.push(data.images);

      let res;
      if (property)
        res = await axios.patch(`/api/properties/${property.id}`, {
          ...data,
          images: base64Images,
        });
      else
        res = await axios.post("/api/properties/create", {
          ...data,
          images: base64Images,
        });

      if (res.status === 201) {
        messageApi.destroy();
        message.success(res?.data.message);

        reset();
        router.push("/dashboard/properties");
        router.refresh();
        // refresh must after the push (always)
      }
    } catch (error) {
      messageApi.destroy();
      setIsloading(false);
      message.error(error?.response?.data.error);
      console.log(error);
    }
  };
  console.log(errors);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full flex justify-center m-auto"
    >
      {contextHolder}
      <Form
        className="max-sm:border-none   bg-[#fcfcfc]  border w-full max-w-[860px] !p-7 rounded"
        onFinish={handleSubmit(onSubmit)}
        layout="vertical"
      >
        <div className="form_input">
          <TextInput
            control={control}
            name={"name"}
            errors={errors?.name}
            label={"name"}
            placeholder={"Enter the name of the property"}
          />
          <SelectType
            control={control}
            name={"type"}
            label={"type"}
            errors={errors?.type}
          />
          <span className="max-sm:block hidden  h-[1px] w-full  bg-[#dde7f5]"></span>
        </div>
        <div className="form_input">
          {propertyMain.map((property) => (
            <TextInput
              key={property.name}
              control={control}
              name={property.name}
              errors={property.errors}
              label={property.label}
              type="number"
              propertyMain
              placeholder={property.placeholder}
            />
          ))}
          <span className="max-sm:block hidden  h-[1px] w-full  bg-[#dde7f5]"></span>
        </div>
        <div className="form_input">
          <SimpleMde
            control={control}
            name={"description"}
            errors={errors?.description}
            label={"description"}
            placeholder={"Provide a detailed description of the property"}
          />
          <span className="max-sm:block hidden  h-[1px] w-full  bg-[#dde7f5]"></span>
        </div>

        <div className="form_input">
          {locations.map((input) => (
            <TextInput
              key={input.name}
              control={control}
              name={input.name}
              errors={input.errors}
              label={input.label}
              placeholder={input.placeholder}
            />
          ))}
          {/* <SelectType
            control={control}
            option={optionCountry}
            name={"location.country"}
            label={"country"}
            errors={errors?.location?.country}
          /> */}
        </div>
        <div className="form_input">
          {ZipCountry.map((input) =>
            input.label === "country" ? (
              <SelectType
                showSearch
                key={input.name}
                control={control}
                name={input.name}
                errors={input.errors}
                label={input.label}
                placeholder={input.placeholder}
              />
            ) : (
              <TextInput
                key={input.name}
                control={control}
                name={input.name}
                errors={input.errors}
                label={input.label}
                placeholder={input.placeholder}
              />
            )
          )}

          <span className="max-sm:block hidden  h-[1px] w-full  bg-[#dde7f5]"></span>
        </div>

        <div className="form_input flex flex-col">
          <div className="grid-cols-autofit10 grid ">
            {rates.map((rate) => (
              <TextInput
                key={rate.name}
                control={control}
                name={rate.name}
                errors={rate.errors}
                label={rate.label}
                type="number"
                placeholder={rate.placeholder}
                optional={rate.optional}
              />
            ))}
          </div>
          <span className="max-sm:block hidden  h-[1px] w-full  bg-[#dde7f5]"></span>
        </div>
        <div className="form_input gap-y-0">
          {rulesFields.map((checkbox) => (
            <CheckboxInput
              key={checkbox.name}
              control={control}
              label={checkbox.label}
              title={checkbox.title}
              name={checkbox.name}
            />
          ))}
          <span className="max-sm:block hidden  h-[1px] w-full  bg-[#dde7f5]"></span>
        </div>
        <div className="form_input">
          {checkTime.map((check) => (
            <TimePickerInput
              key={check.name}
              control={control}
              label={check.label}
              name={check.name}
              errors={check.errors}
            />
          ))}
          <span className="max-sm:block hidden  h-[1px] w-full  bg-[#dde7f5]"></span>
        </div>

        <div className="form_input">
          <SelectMultiple
            control={control}
            name={"amenities"}
            label={"Amenities"}
            errors={errors?.amenities}
          />
          <span className="max-sm:block hidden  h-[1px] w-full  bg-[#dde7f5]"></span>
        </div>

        <div className="form_input">
          <PicturesWall
            control={control}
            label={"upload images"}
            setValue={setValue}
            name={"images"}
            errors={errors?.images}
            imgWatch={imgWatch}
            propertyImage={property?.images}
          />
          <span className="max-sm:block hidden  h-[1px] w-full  bg-[#dde7f5]"></span>
        </div>

   

        <div className="w-full mt-8">
          <button
            disabled={isLoading}
            className="max-md:w-full w-36 p-[10px] font-semibold bg-bluePrimery text-white hover:bg-[#2866be] disabled:bg-[#8f9198e5] disabled:cursor-not-allowed rounded-md transition duration-300 ease-in-out"
            type="submit"
          >
            Submit
          </button>
        </div>
      </Form>
    </motion.section>
  );
};

export default PropertiForm;
