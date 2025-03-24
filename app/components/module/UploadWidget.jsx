import { CldUploadWidget } from "next-cloudinary";
 

const UploadWidget = ({ onUpload }) => {
  return (
    <CldUploadWidget
      options={{ folder: "properties" }}
      uploadPreset="ml_default"
      onUpload={(result) => {
        const uploadedUrl = result.info.secure_url;
        if (onUpload) {
          onUpload(uploadedUrl);
        }
      }}
    >
      {({ open }) => (
        <button type="button" onClick={() => open()} className="bg-blue-500 text-white px-4 py-2 rounded">
          Upload an Image
        </button>
      )}
    </CldUploadWidget>
  );
};

export default UploadWidget;
