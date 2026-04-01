import { useRef } from "react";

type UploadProps = {
  fieldName: string;
};

const Upload = ({ fieldName }: UploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <div className="upload-drop">
        <p>Click to upload</p>
        <small>JPG/PNG, 2MB limit — optional, default art if empty.</small>
        <input ref={inputRef} style={{ display: "none" }} type="file" name={fieldName} accept="image/*" />
      </div>
    </>
  );
};

export default Upload;
