export default function InputLabel({ title, description, type }) {
  return (
    <label
      htmlFor={title}
      className={`${
        type === "number" ? "block mb-2" : ""
      } font-medium text-gray-700 ${
        type === "select" ? "text-xl" : "text-xl"
      }`}>
      {title}
      {description && (
        <span className="text-sm text-gray-500">({description})</span>
      )}
    </label>
  );
}
