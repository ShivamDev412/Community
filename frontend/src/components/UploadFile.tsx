import { InputProps } from "@/Types";
import { FC, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const FileUpload: FC<InputProps> = ({ id, register, errors }) => {
  const [previewURL, setPreviewURL] = useState<string | null>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e?.target?.files[0];
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center mb-2 w-full">
        <label
          htmlFor="file-upload"
          className="w-full h-[2in] border-dashed border-2 border-gray-300 flex justify-center items-center relative"
        >
          {previewURL ? (
            <img
              src={previewURL}
              alt="Preview"
              className="absolute inset-0 object-contain w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center flex-col">
              <FaCloudUploadAlt className="w-20 h-20 fill-gray-500" />
              <span className="text-center text-gray-500">Click to upload</span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            id={id}
            multiple={false}
            {...register(id, {
              onChange: handleFileChange,
            })}
            className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
          />
        </label>
      </div>
      {typeof errors[id] === "string" ? (
        <p className="text-red-700 my-2">{errors[id]}</p>
      ) : (
        errors[id] && <p className="text-red-700 my-2">{errors[id].message}</p>
      )}
    </div>
  );
};

export default FileUpload;
