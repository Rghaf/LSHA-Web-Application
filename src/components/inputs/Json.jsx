export default function Json({ placeholder, value, handleChange }) {
  return (
    <textarea
      className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
}
