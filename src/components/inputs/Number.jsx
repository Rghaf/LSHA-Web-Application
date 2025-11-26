export default function Number({ title, value, placeholder, min, max }) {
  return (
    <input
      type="number"
      id={title}
      value={value}
      name={title}
      placeholder={placeholder}
      min={min}
      max={max}
      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
      //   value="75"
    />
  );
}
