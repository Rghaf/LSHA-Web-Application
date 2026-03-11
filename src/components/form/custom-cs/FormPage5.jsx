import { useContext, useMemo } from "react";
import { PageContext } from "../../../contexts/PageContext";
import { CustomCsContext } from "../../../contexts/CustomCsContext";
import Button from "../../Button";
import { usePost } from "../../../hooks/usePost";

function prettyKey(key) {
  return key
    .replace(/_/g, " ")
    .replace(/([A-Z])/g, " $1")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^\w/g, (c) => c.toUpperCase());
}

function renderValue(val) {
  if (val === null || val === undefined || val === "") return <span>—</span>;
  if (typeof File !== "undefined" && val instanceof File) {
    const sizeKb = (val.size / 1024).toFixed(1);
    return (
      <span>
        {val.name} ({sizeKb} KB)
      </span>
    );
  }
  if (Array.isArray(val) || (typeof val === "object" && val)) {
    return (
      <pre className="whitespace-pre-wrap break-words bg-gray-50 p-2 rounded border border-gray-200">
        {JSON.stringify(val, null, 2)}
      </pre>
    );
  }
  return <span>{String(val)}</span>;
}

export default function FormPage5() {
  const { customCsState } = useContext(CustomCsContext);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Summary</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(customCsState || {}).map(([key, value]) => (
          <div key={key} className="p-3 rounded border border-gray-200">
            <div className="text-sm font-semibold text-gray-600">
              {prettyKey(key)}
            </div>
            <div className="mt-1 text-gray-800">{renderValue(value)}</div>
          </div>
        ))}
      </div>
      {/* <div className="pt-4">
        <Button
          text={isLoading ? "Submitting..." : "Submit"}
          classes="bg-green-600 text-white hover:bg-green-700"
          handleClick={handleSubmitToApi}
        />
        {error && <div className="text-red-600 text-sm">{String(error)}</div>}
        {response && <div className="text-green-600 text-sm">Submitted.</div>}
      </div> */}
    </section>
  );
}
