import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload, Form, message } from "antd";
import { Controller } from "react-hook-form";
import { SlPicture } from "react-icons/sl";
import {
  extractCloudinaryId,
  getBase64,
  resizeImage,
} from "@/app/utils/helpers";
 
import { TiDelete } from "react-icons/ti";
 
const PicturesWall = ({
  control,
  label,
  name,
  setValue,
  errors,
  imgWatch,
  propertyImage,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [maxSize, setMaxSize] = useState(false);

  useEffect(() => {
    if (propertyImage) {
      const editImage = propertyImage.map((item) => {
        const publicId = extractCloudinaryId(item);
console.log(publicId);

        return {
          name: publicId,
          status: "done",
          url: item,
        };
      });
      setFileList(editImage);
    } else return;
  }, []);

 

  // const doneImages = fileList?.filter(img=>img?.url && img?.url.includes("res.cloudinary.com") );

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/webp";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
      setMaxSize(true);
      return;
    }

    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error("Image must be smaller than 5MB!");
      setMaxSize(true);
      return;
    }

    setMaxSize(false);
  };

  const handleChange = async ({ fileList: newFileList }) => {
    if (maxSize) return;
    const cloudinaryLinks = newFileList
      ?.filter(
        (img) => img?.url && img?.url.startsWith("https://res.cloudinary.com")
      )
      .map((src) => src.url);

    const updatedFiles = await Promise.all(
      newFileList.map(async (file) => {
        if (file.originFileObj && !file.thumbUrl) {
          const thumb = await resizeImage(file.originFileObj);
          return {
            ...file,
            thumbUrl: thumb,
          };
        }
        return file;
      })
    );

    setFileList(updatedFiles);

    const originFileObj = updatedFiles.map((item) => item.originFileObj);
    const validFileObjects = originFileObj.filter(Boolean);

    const files = [...cloudinaryLinks, ...validFileObjects];

    setValue("images", files);
  };

  const handleRemove = async (file) => {
    setFileList(fileList.filter((item) => item.uid !== file.uid));
    //   const imageDone =
    //  file?.url && file?.url.startsWith("https://res.cloudinary.com");

    //   // if (propertyImage && imageDone) {
    //   //   const cloudinaryId=file?.url.split("/").pop().split(".")[0]
    //   //   try {
    //   //     const res = await axios.delete(`/api/cloudinary/${cloudinaryId}`);
    //   //     console.log(res);

    //   //   } catch (error) {
    //   //     console.error(error);
    //   //   }

    //   // }
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <SlPicture />
        Upload
      </div>
    </button>
  );

  return (
    <Form.Item
      required
      validateStatus={
        errors && (!imgWatch?.length || errors?.images?.message) && "error"
      }
      help={
        (errors?.message && !imgWatch?.length && errors?.message) ||
        errors?.images?.message
      }
      label={
        <div>
          {label}
          <span className="text-[#818181] italic text-[12.7px] ml-1">
            ( Photo limit is 12 images, each less than 5 MB )
          </span>
        </div>
      }
    >
      <Controller
        name={name}
        control={control}
        render={({ field: { ref, ...field } }) => (
          <Upload
            showUploadList={{
              showRemoveIcon: true,
              removeIcon: (
                <span>
                  <TiDelete className="text-[20px] self-center text-white" />
                </span>
              ),
            }}
            {...field}
            listType="picture-card"
            fileList={fileList}
            innerRef={ref}
            onPreview={handlePreview}
            onChange={handleChange}
            onRemove={handleRemove}
            beforeUpload={beforeUpload} // for validation //
          >
            {fileList.length >= 12 ? null : uploadButton}
          </Upload>
        )}
      />

      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </Form.Item>
  );
};

export default PicturesWall;

// import React, { useEffect, useState } from "react";
// import { PlusOutlined } from "@ant-design/icons";
// import { Image, Upload, Form, message } from "antd";
// import { Controller } from "react-hook-form";
// import { SlPicture } from "react-icons/sl";
// import { getBase64 } from "@/app/utils/helpers";

// const PicturesWall = ({
//   control,
//   label,
//   name,
//   setValue,
//   errors,
//   imgWatch,
//   propertyImage,
// }) => {
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [previewImage, setPreviewImage] = useState("");
//   const [fileList, setFileList] = useState([]);
//   const [maxSize, setMaxSize] = useState(false);

//   useEffect(() => {
//     if (propertyImage) {
//       const editImage = propertyImage.map((item) => {
//         const publicId = item.split("/").pop().split(".")[0];
//         return {
//           name: publicId,
//           status: "done",
//           url: item,
//         };
//       });
//       setFileList(editImage);
//     } else return;
//   }, []);

//   const resizeImage = (file) =>
//     new Promise((resolve) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = (event) => {
//         const img = document.createElement("img");
//         img.src = event.target.result;
//         img.onload = () => {
//           const canvas = document.createElement("canvas");
//           const ctx = canvas.getContext("2d");

//           canvas.width = 240;
//           canvas.height = 240;
//           ctx.drawImage(img, 0, 0, 240, 240);

//           resolve(canvas.toDataURL(file.type));
//         };
//       };
//     });

//   const handlePreview = async (file) => {
//     if (!file.url && !file.preview) {
//       file.preview = await getBase64(file.originFileObj);
//     }
//     setPreviewImage(file.url || file.preview);
//     setPreviewOpen(true);
//   };

//   const beforeUpload = (file) => {
//     const isJpgOrPng =
//       file.type === "image/jpeg" ||
//       file.type === "image/png" ||
//       file.type === "image/webp";
//     if (!isJpgOrPng) {
//       message.error("You can only upload JPG/PNG file!");
//       setMaxSize(true);
//       return;
//     }

//     const isLt2M = file.size / 1024 / 1024 < 5;
//     if (!isLt2M) {
//       message.error("Image must be smaller than 5MB!");
//       setMaxSize(true);
//       return;
//     }

//     setMaxSize(false);
//   };

//   const handleChange = async ({ fileList: newFileList }) => {
//     if (maxSize) return;
//     const doneImages = fileList?.filter(
//       (img) => img?.url && img?.url.includes("res.cloudinary.com")
//     );

//     const updatedFiles = await Promise.all(
//       newFileList.map(async (file) => {
//         if (file.originFileObj && !file.thumbUrl) {
//           const thumb = await resizeImage(file.originFileObj);
//           return {
//             ...file,
//             thumbUrl: thumb,
//           };
//         }
//         return file;
//       })
//     );

//     setFileList(updatedFiles);
//   const originFileObj=  updatedFiles.map((item) =>  item.originFileObj );
//   const validFileObjects=originFileObj.filter(Boolean)

//     const files = [...doneImages,...bb]
//  console.log(files);

//     setValue("images", files);
//   };

//   const uploadButton = (
//     <button
//       style={{
//         border: 0,
//         background: "none",
//       }}
//       type="button"
//     >
//       <PlusOutlined />
//       <div
//         style={{
//           marginTop: 8,
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           gap: "6px",
//         }}
//       >
//         <SlPicture />
//         Upload
//       </div>
//     </button>
//   );

//   return (
//     <Form.Item
//       required
//       validateStatus={
//         errors && (!imgWatch?.length || errors?.images?.message) && "error"
//       }
//       help={
//         (errors?.message && !imgWatch?.length && errors?.message) ||
//         errors?.images?.message
//       }
//       label={
//         <div>
//           {label}
//           <span className="text-[#818181] italic text-[12.7px] ml-1">
//             ( Photo limit is 12 images, each less than 5 MB )
//           </span>
//         </div>
//       }
//     >
//       <Controller
//         name={name}
//         control={control}
//         render={({ field: { ref, ...field } }) => (
//           <Upload
//             {...field}
//             listType="picture-card"
//             fileList={fileList}
//             innerRef={ref}
//             onPreview={handlePreview}
//             onChange={handleChange}
//             beforeUpload={beforeUpload} // for validation //
//           >
//             {fileList.length >= 12 ? null : uploadButton}
//           </Upload>
//         )}
//       />

//       {previewImage && (
//         <Image
//           wrapperStyle={{
//             display: "none",
//           }}
//           preview={{
//             visible: previewOpen,
//             onVisibleChange: (visible) => setPreviewOpen(visible),
//             afterOpenChange: (visible) => !visible && setPreviewImage(""),
//           }}
//           src={previewImage}
//         />
//       )}
//     </Form.Item>
//   );
// };

// export default PicturesWall;
