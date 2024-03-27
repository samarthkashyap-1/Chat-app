import React, { useState, useEffect, useRef } from "react";

import { uploadFile } from "../Apis/api";

const Upload = () => {
  const [file, setFile] = useState(null);

  const fileInput = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (!file) return;
    const uploading = async () => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", file.name);
      const response = await uploadFile(formData);
    };

    uploading();
  }, [file]);

  return (
    <div>
      <input type="file" ref={fileInput} onChange={handleFileChange} />
      {/* <button}>Upload</button> */}
    </div>
  );
};

export default Upload;
