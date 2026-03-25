import { useContext, useMemo } from "react";
import { PageContext } from "../../../contexts/PageContext";
import { CustomCsContext } from "../../../contexts/CustomCsContext";
import Button from "../../Button";
import { usePost } from "../../../hooks/usePost";
import { MdDone } from "@react-icons/all-files/md/MdDone";
import { MdClear } from "@react-icons/all-files/md/MdClear";

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
    return <>{JSON.stringify(val, null, 2)}</>;
  }
  return <span>{String(val)}</span>;
}

export default function FormPage5() {
  const { customCsState } = useContext(CustomCsContext);

  return (
    <section className="space-y-4">
      {/* {Object.entries(customCsState || {})
        .filter(([key, value]) => key !== "uppaalQuery" && value === null)
        .map(([key, value]) => (
          <h1 key={key}>{renderValue(value)}</h1>
        ))} */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(customCsState || {})
          .filter(([key, value]) => key !== "uppaalQuery" && value !== null)
          .map(([key, value]) => (
            <div key={key} className="p-3">
              <div className="m-2 text-2xl font-bold text-gray-800">
                {prettyKey(key)}
              </div>
              <div className="m-4 text-xl text-black-700 rounded-2xl border border-gray-200 p-5 bg-blue-100">
                {value === true ? (
                  <span className="flex space-x-3">
                    {renderValue(value)}
                    <div className="bg-green-500 rounded-2xl p-1">
                      <MdDone className="text-green-800 text-2xl text-semibold" />
                    </div>
                  </span>
                ) : value === false ? (
                  <span className="flex space-x-3">
                    {renderValue(value)}
                    <div className="bg-red-500 rounded-2xl p-1">
                      <MdClear className="text-red-800 text-2xl text-semibold" />
                    </div>
                  </span>
                ) : value !== null ? (
                  renderValue(value)
                ) : null}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
