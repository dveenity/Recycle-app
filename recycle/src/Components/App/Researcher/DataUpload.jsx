import HeaderGoBack from "../../Custom/HeaderGoBack";
import { useState } from "react";
import axios from "axios";
import { FaCamera } from "react-icons/fa";
import ButtonLoad from "../../Animations/ButtonLoad";

const serVer = `https://recycle-app-backend.vercel.app`;

const token = localStorage.getItem("recycle-users");

const DataUpload = () => {
  const [researchName, setResearchName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitBtn, setSubmitBtn] = useState("Upload");
  const [resultMessage, setResultMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [fileName, setFileName] = useState(""); // State to store file name

  // handle file upload
  const handleFileChange = (event) => {
    setLoading(true);
    const file = event.target.files[0];
    setImageFile(file);

    if (file) {
      setFileName(file.name); // Set file name
      const reader = new FileReader();

      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setLoading(false);
      };

      reader.readAsDataURL(file);
    }
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
    setSubmitBtn(<ButtonLoad />);
    setResultMessage("");

    const formData = new FormData();
    formData.append("file", imageFile);
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

      setImageFile("");
      setResearchName("");
      setDescription("");
      setFileName(""); // Clear file name after successful upload
    } catch (error) {
      console.error(error);
      setResultMessage("Failed to upload file. Please try again.");
    } finally {
      setIsSubmitting(false);

      setTimeout(() => {
        setResultMessage("");
      }, 3000);

      setSubmitBtn("Upload");
    }
  };

  return (
    <div className="feedback">
      <HeaderGoBack h1="Upload your research" />

      <form onSubmit={onSubmit} encType="multipart/form-data">
        <div className="fileBox">
          <label htmlFor="file">
            {loading ? ( // Display loading indicator while file is uploading
              <div>
                <ButtonLoad />
              </div>
            ) : imagePreview ? (
              fileName && <p>{fileName}</p>
            ) : (
              <>
                Add PDF
                <FaCamera />
              </>
            )}
            <input required type="file" id="file" onChange={handleFileChange} />
          </label>
        </div>
        <div>
          <label>Research Name</label>
          <input
            type="text"
            value={researchName}
            onChange={handleResearchNameChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {submitBtn}
        </button>
      </form>
      <p className="error-p">{resultMessage}</p>
    </div>
  );
};

export default DataUpload;
