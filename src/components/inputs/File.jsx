import { useRef, useState } from "react";
import { MdCloudUpload } from "@react-icons/all-files/md/MdCloudUpload";

export default function File({ title, max = 5, onFileSelect }) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState(null);

  function handleFileSelect(file) {
    if (file && file.size <= max * 1024 * 1024) {
      setFileName(file.name);
      onFileSelect?.(file);
    } else {
      alert(`File must be smaller than ${max}MB`);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      console.log("Dropped file:", file);
      handleFileSelect(file);
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }

  function handleInputChange(e) {
    const file = e.target.files[0];
    console.log("Selected file:", file);
    handleFileSelect(file);
  }

  function handleBrowseClick() {
    fileInputRef.current?.click();
  }

  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleBrowseClick}
        className={`bg-white border-2 border-dashed rounded-xl h-48 flex items-center justify-center p-6 transition-all duration-300 cursor-pointer ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-blue-400 hover:bg-gray-100"
        }`}>
        <div className="text-center pointer-events-none">
          {" "}
          <MdCloudUpload className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-semibold text-gray-700">
            Drag and drop your {title} here
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            or
            <button
              type="button"
              className="text-blue-600 hover:underline ml-1 pointer-events-auto" // Re-enable pointer events for the button text
              onClick={(e) => {
                e.stopPropagation(); // Stop button click from bubbling to div
                handleBrowseClick();
              }}>
              browse
            </button>
            to upload (Max {max}MB)
          </p>
          {fileName && (
            <p className="mt-2 text-sm text-green-600">✓ {fileName}</p>
          )}
          <input
            ref={fileInputRef}
            id={title}
            type="file"
            accept=".csv,.json"
            className="sr-only"
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
}
