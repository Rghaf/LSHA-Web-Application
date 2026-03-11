import { useState, useContext, useEffect } from "react";
import Input from "../../inputs/Input";
import { CustomCsContext } from "../../../contexts/CustomCsContext";
import { parseUppaalQuery } from "../../../functions/ParseUppaal";

export default function FormPage1({ handleBtnDisabled }) {
  const [reset, setReset] = useState(false);
  const [csName, setCsName] = useState("");
  const [email, setEmail] = useState("");
  const [resampleStrategy, setResampleStrategy] = useState("");
  const [uppaalModelFile, setUppaalModelFile] = useState(null);
  const [uppaalQueryFile, setUppaalQueryFile] = useState(null);
  const [dataFile, setDataFile] = useState(null);
  const { customCsState, customCsDispatch } = useContext(CustomCsContext);

  useEffect(() => {
    if (customCsState.name) {
      setCsName(customCsState.name);
    } else setCsName("");
    if (customCsState.email) {
      setEmail(customCsState.email);
    } else setEmail("");
    if (
      customCsState.resampleStrategy === "SIM" ||
      customCsState.resampleStrategy === "UPPAAL"
    ) {
      setResampleStrategy(customCsState.resampleStrategy);
    } else setResampleStrategy("");
    if (customCsState.uppaalModelFile) {
      setUppaalModelFile(customCsState.uppaalModelFile);
    } else setUppaalModelFile(null);
    if (customCsState.uppaalQueryFile) {
      setUppaalQueryFile(customCsState.uppaalQueryFile);
    } else setUppaalQueryFile(null);
    if (customCsState.dataFile) {
      setDataFile(customCsState.dataFile);
    } else setDataFile(null);
  }, [customCsState.name, customCsState.email, customCsState.resampleStrategy]);

  useEffect(() => {
    let dis = true;
    if (
      customCsState.name === null ||
      customCsState.resampleStrategy === null ||
      !customCsState.name.trim() ||
      !customCsState.resampleStrategy.trim() ||
      customCsState.resampleStrategy ===
        "----please select a resample strategy----"
    ) {
      dis = false;
    }
    if (
      customCsState.resampleStrategy === "UPPAAL" &&
      (customCsState.uppaalModelFile === null ||
        customCsState.uppaalQueryFile === null)
    ) {
      dis = false;
    }
    if (
      customCsState.resampleStrategy === "SIM" &&
      customCsState.dataFile === null
    ) {
      dis = false;
    }
    handleBtnDisabled(dis);
  }, [customCsState]);

  function handleCsName(e) {
    const value = e.target.value;
    setCsName(value);
    customCsDispatch({
      type: "UPDATE_FIELD",
      payload: { key: "name", value },
    });
  }

  function handleEmail(e) {
    const value = e.target.value;
    setEmail(value);
    customCsDispatch({
      type: "UPDATE_FIELD",
      payload: { key: "email", value },
    });
  }

  function handleStrategy(e) {
    const value = e.target.value;
    setResampleStrategy(value);
    customCsDispatch({
      type: "UPDATE_FIELD",
      payload: { key: "resampleStrategy", value },
    });
  }

  // File handlers - save File object to context
  function handleUppaalModelFile(file) {
    const value = file;
    setUppaalModelFile(value);
    customCsDispatch({
      type: "UPDATE_FIELD",
      payload: { key: "uppaalModelFile", value: file },
    });
  }

  function handleUppaalQueryFile(file) {
    const value = file;
    setUppaalQueryFile(value);
    customCsDispatch({
      type: "UPDATE_FIELD",
      payload: { key: "uppaalQueryFile", value: file },
    });

    // Read the file content and parse it
    if (file && file.name.toLowerCase().endsWith(".q")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target.result || "";
          const variables = parseUppaalQuery(text); // Pass text, not file
          console.log("UPPAAL Query Variables:", variables);

          // Optionally save parsed variables to context
          customCsDispatch({
            type: "UPDATE_FIELD",
            payload: { key: "uppaalQuery", value: variables },
          });
        } catch (err) {
          console.error("Failed to parse UPPAAL query:", err);
        }
      };
      reader.onerror = (err) => {
        console.error("Failed to read UPPAAL query file:", err);
      };
      reader.readAsText(file);
    }
  }

  function handleDataFile(file) {
    const value = file;
    setDataFile(value);
    customCsDispatch({
      type: "UPDATE_FIELD",
      payload: { key: "dataFile", value: file },
    });

    // Read CSV and log headers
    if (file && file.name.toLowerCase().endsWith(".csv")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target.result || "";
          // Get first non-empty line
          const firstLine =
            text.split(/\r?\n/).find((line) => line.trim().length > 0) || "";
          // Split by comma (basic CSV; adjust if you need quoted fields)
          const headers = firstLine.split(",").map((h) => h.trim());
          console.log("CSV Headers:", headers);
          customCsDispatch({
            type: "UPDATE_FIELD",
            payload: { key: "csvHeaders", value: headers },
          });
        } catch (err) {
          console.error("Failed to parse CSV headers:", err);
        }
      };
      reader.onerror = (err) => {
        console.error("Failed to read CSV file:", err);
      };
      reader.readAsText(file);
    }
  }

  return (
    <>
      <Input
        type="text"
        title="Custom Case Study Name*"
        placeholder="Enter case study name"
        handleChange={(e) => handleCsName(e)}
        value={csName}
        required={true}
      />
      <Input
        type="select"
        value={resampleStrategy}
        title="Resample Strategy of your case study"
        options={["----please select a resample strategy----", "SIM", "UPPAAL"]}
        required={true}
        handleChange={(e) => handleStrategy(e)}
      />
      <Input
        type="text"
        title="Enter your email"
        placeholder="your@mail.com"
        value={email}
        handleChange={(e) => handleEmail(e)}
      />
      {resampleStrategy.toLowerCase() === "uppaal" && (
        <>
          <h1 className="text-3xl text-center text-blue-700 font-bold m-5">
            Upload UPPAAL Files
          </h1>
          <Input
            type="file"
            title="UPPAAL Model file"
            value={uppaalModelFile}
            accept=".xml"
            onFileSelect={(e) => handleUppaalModelFile(e)}
          />
          <Input
            type="file"
            title="UPPAAL Query file"
            accept=".q"
            value={uppaalQueryFile}
            onFileSelect={(e) => handleUppaalQueryFile(e)}
          />
        </>
      )}
      {resampleStrategy.toLowerCase() === "sim" && (
        <>
          <h1 className="text-3xl text-center text-blue-700 font-bold m-5">
            Upload CSV file
          </h1>
          <Input
            type="file"
            title="CSV file"
            accept=".csv"
            value={dataFile}
            onFileSelect={(e) => handleDataFile(e)}
          />
        </>
      )}
    </>
  );
}
