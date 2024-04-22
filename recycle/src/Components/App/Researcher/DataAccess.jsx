import { useQuery } from "react-query";
import { fetchPDF, fetchUser } from "../../Hooks/useFetch";
import PageLoader from "../../Animations/PageLoader";
import { useState } from "react";

import HeaderGoBack from "../../Custom/HeaderGoBack";

import { Worker } from "@react-pdf-viewer/core";
// Import the main component
import { Viewer } from "@react-pdf-viewer/core";

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";

import axios from "axios";
import ButtonLoad from "../../Animations/ButtonLoad";

const serVer = `https://recycle-app-backend.vercel.app`;

const DataAccess = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [result, setResult] = useState("");
  const [deleteBtnId, setDeleteBtnId] = useState(null); // Track the ID of the item whose delete button is clicked

  const { data, isLoading, isError } = useQuery("user", fetchUser);
  const {
    data: pdf,
    isLoading: pdfLoading,
    isError: pdfError,
    refetch,
  } = useQuery("PDF", fetchPDF);

  if (isLoading || pdfLoading) return <PageLoader />;

  if (isError || pdfError) {
    // Handle error state
    return <div>Error fetching data</div>;
  }

  const { name } = data;

  const hasData = pdf && pdf.length > 0;

  // show pdf function
  const showFile = async (file) => {
    try {
      const { filename, _id } = file;
      const pdfUrl = filename;
      setPdfFile(pdfUrl);
      setSelectedFileId(_id);
    } catch (error) {
      console.error(error);
    }
  };

  // delete PDF
  const deleteFile = async (researchId) => {
    setDeleteBtnId(researchId); // Set the ID of the item whose delete button is clicked

    try {
      const res = await axios.delete(`${serVer}/deleteResearch/${researchId}`);

      const { data } = res;

      setResult(data);
      refetch();
    } catch (error) {
      setResult(error.response.data);
    } finally {
      setTimeout(() => {
        setResult("");
      }, 3000);
    }
  };
  return (
    <div className="admin-users">
      <HeaderGoBack h1="View Research" />
      <ul>
        {hasData ? (
          pdf.map((file) => (
            <li key={file._id}>
              <h2>{file.authorName}</h2>
              <p>{file.description}</p>
              <button onClick={() => showFile(file)}>Show PDF</button>
              {name === file.authorName && (
                <button onClick={() => deleteFile(file._id)}>
                  {/* Render "Delete Research" or ButtonLoad based on whether the delete button is clicked for this item */}
                  {deleteBtnId === file._id ? (
                    <ButtonLoad />
                  ) : (
                    "Delete Research"
                  )}
                </button>
              )}
            </li>
          ))
        ) : (
          <div>No research yet? Upload a file and view it here</div>
        )}
      </ul>
      <p className="error-p">{result}</p>
      {selectedFileId && pdfFile && (
        <div className="pdf-view">
          <Viewer fileUrl={pdfFile} className="pdf-main" />
          <button onClick={() => setSelectedFileId(null)}>Close</button>
        </div>
      )}
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js"></Worker>
    </div>
  );
};

export default DataAccess;
