export default function UploadBox() {
  return (
    <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl h-60 flex items-center justify-center p-6 text-gray-500 hover:border-blue-400 hover:bg-gray-100 transition-all duration-300 cursor-pointer">
      <div className="text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <h3 className="mt-2 text-2xl font-semibold">
          Drag and drop your files here
        </h3>
        <p className="mt-1 text-lg">
          or
          <a href="#" className="text-blue-600 hover:underline">
            browse
          </a>{" "}
          to upload
        </p>
      </div>
    </div>
  );
}
