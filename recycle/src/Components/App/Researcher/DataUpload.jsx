import HeaderGoBack from "../../Custom/HeaderGoBack";
import { useState } from "react";
import axios from "axios";

const serVer = `https://recycle-app-backend.vercel.app/`;

const token = localStorage.getItem("recycle-users");

const DataUpload = () => {
  const [file, setFile] = useState(null);
  const [researchName, setResearchName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleResearchNameChange = (event) => {
    setResearchName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);
    setResultMessage("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("researchName", researchName);
    formData.append("description", description);

    try {
      await axios.post(`${serVer}/upload-files`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setResultMessage("File uploaded successfully.");

      setFile("");
      setResearchName("");
      setDescription("");
    } catch (error) {
      console.error(error);
      setResultMessage("Failed to upload file. Please try again.");
    } finally {
      setIsSubmitting(false);

      setTimeout(() => {
        setResultMessage("");
      }, 3000);
    }
  };

  return (
    <div className="feedback">
      <HeaderGoBack h1="Upload your research" />

      <form onSubmit={onSubmit} encType="multipart/form-data">
        <label>
          File
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            required
          />
        </label>
        <label>
          Research Name
          <input
            type="text"
            value={researchName}
            onChange={handleResearchNameChange}
            required
          />
        </label>
        <label>
          Description
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        </label>
        <button type="submit" disabled={isSubmitting}>
          Upload
        </button>
      </form>
      <p className="error-p">{resultMessage}</p>
    </div>
  );
};

export default DataUpload;
