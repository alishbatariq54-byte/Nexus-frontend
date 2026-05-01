// import { useState, useRef } from "react";
// import SignatureCanvas from "react-signature-canvas";

// export default function DocumentChamber() {
//   const [file, setFile] = useState(null);
//   const [status, setStatus] = useState("Draft");
//   const sigRef = useRef();

//   // Upload file
//   const handleFile = (e) => {
//     setFile(URL.createObjectURL(e.target.files[0]));
//   };

//   // Save signature
//   const saveSignature = () => {
//     const img = sigRef.current.toDataURL();
//     alert("Signature Saved!");
//     console.log(img);
//   };

//   return (
//     <div className="p-5 border rounded-xl mt-5">
//       <h2 className="text-xl font-bold mb-3">Document Chamber</h2>

//       {/* Upload */}
//       <input type="file" onChange={handleFile} />

//       {/* Preview */}
//       {file && (
//         <iframe
//           src={file}
//           className="w-full h-60 mt-3 border"
//           title="preview"
//         />
//       )}

//       {/* Signature */}
//       <h3 className="mt-4 font-semibold">E-Signature</h3>

//       <SignatureCanvas
//         ref={sigRef}
//         penColor="black"
//         canvasProps={{
//           width: 400,
//           height: 150,
//           className: "border",
//         }}
//       />

//       <button
//         onClick={saveSignature}
//         className="bg-green-500 text-white px-3 py-1 mt-2"
//       >
//         Save Signature
//       </button>

//       {/* Status */}
//       <h3 className="mt-4 font-semibold">Status</h3>

//       <select
//         value={status}
//         onChange={(e) => setStatus(e.target.value)}
//         className="border p-2"
//       >
//         <option>Draft</option>
//         <option>In Review</option>
//         <option>Signed</option>
//       </select>

//       <p className="mt-2">Current Status: {status}</p>
//     </div>
//   );
// }



























import { useState, useRef, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function DocumentChamber() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState("Draft");
  const sigRef = useRef();

  // handle file upload with validation
  const handleFile = (e) => {
    const uploaded = e.target.files[0];

    if (!uploaded) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(uploaded.type)) {
      alert("Only PDF or DOC files allowed!");
      return;
    }

    const url = URL.createObjectURL(uploaded);
    setFile(url);
    setFileName(uploaded.name);
  };

  // cleanup object URL
  useEffect(() => {
    return () => {
      if (file) URL.revokeObjectURL(file);
    };
  }, [file]);

  // save signature
  const saveSignature = () => {
    if (sigRef.current.isEmpty()) {
      alert("Please draw signature first!");
      return;
    }

    const img = sigRef.current.getTrimmedCanvas().toDataURL("image/png");
    console.log("Signature Image:", img);
    alert("Signature Saved!");
  };

  // clear signature
  const clearSignature = () => {
    sigRef.current.clear();
  };

  // download signature
  const downloadSignature = () => {
    if (sigRef.current.isEmpty()) {
      alert("No signature to download!");
      return;
    }

    const img = sigRef.current.getTrimmedCanvas().toDataURL("image/png");
    const link = document.createElement("a");
    link.href = img;
    link.download = "signature.png";
    link.click();
  };

  // reset document
  const resetDocument = () => {
    setFile(null);
    setFileName("");
  };

  return (
    <div className="p-5 border rounded-xl mt-5">
      <h2 className="text-xl font-bold mb-3">Document Chamber</h2>

      {/* Upload */}
      <input type="file" onChange={handleFile} />

      {fileName && <p className="text-sm mt-1">File: {fileName}</p>}

      {/* Preview */}
      {file && (
        <iframe
          src={file}
          className="w-full h-60 mt-3 border"
          title="preview"
        />
      )}

      {file && (
        <button
          onClick={resetDocument}
          className="bg-red-500 text-white px-3 py-1 mt-2"
        >
          Remove Document
        </button>
      )}

      {/* Signature */}
      <h3 className="mt-4 font-semibold">E-Signature</h3>

      <SignatureCanvas
        ref={sigRef}
        penColor="black"
        canvasProps={{
          width: 400,
          height: 150,
          className: "border mt-2",
        }}
      />

      <div className="flex gap-2 mt-2">
        <button
          onClick={saveSignature}
          className="bg-green-500 text-white px-3 py-1"
        >
          Save
        </button>

        <button
          onClick={clearSignature}
          className="bg-gray-500 text-white px-3 py-1"
        >
          Clear
        </button>

        <button
          onClick={downloadSignature}
          className="bg-blue-500 text-white px-3 py-1"
        >
          Download
        </button>
      </div>

      {/* Status */}
      <h3 className="mt-4 font-semibold">Status</h3>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2"
      >
        <option>Draft</option>
        <option>In Review</option>
        <option>Signed</option>
      </select>

      <p className="mt-2">Current Status: {status}</p>
    </div>
  );
}
