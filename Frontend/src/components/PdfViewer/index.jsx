import React, { useState } from "react";

import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export const ViewPdf = (url) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const path =
    "http://localhost:8000/resources/resumes/Resume_of_Takinur_qxsUJQs.pdf";

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  return (
    <>
      <Document
        file={path}
        onLoadSuccess={console.log("success")}
        onLoadError={console.error}
        className="flex h-screen w-full flex-wrap bg-red-500"
      >
        <Page pageNumber={pageNumber} />
      </Document>
      waddaad pak
    </>
  );
};
