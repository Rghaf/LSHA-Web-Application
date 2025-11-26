export default function Alert({ text, style = "info", m = "m-5" }) {
  let alertStyle;

  if (style === "danger") alertStyle = "bg-red-100 text-red-600 border-red-600";
  if (style === "info")
    alertStyle = "bg-blue-100 text-blue-600 border-blue-600";
  if (style === "success")
    alertStyle = "bg-green-100 text-green-600 border-green-600";

  return (
    <div className={`text-center ${m}`}>
      <span
        className={`text-lg ${alertStyle} text-center border-1 rounded-xl border w-sm p-3`}>
        {text}
      </span>
    </div>
  );
}
