import { useContext, useState } from "react";
import Button from "../Button";
import { FaUpload } from "@react-icons/all-files/fa/FaUpload";
import { PageContext } from "../../contexts/PageContext";
import { usePost } from "../../hooks/usePost";
import { CustomCsContext } from "../../contexts/CustomCsContext";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function FormSubmit() {
  const { customCsState, customCsDispatch } = useContext(CustomCsContext);
  const { prevPage } = useContext(PageContext);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  // Hook for the main Case Study creation
  const { postData, isLoading } = usePost(
    "http://127.0.0.1:8000/api/case-study/",
  );

  async function runAlgorithm(id) {
    console.log("Running algorithm for Case Study ID:", id);
    const url = "http://127.0.0.1:8000/run/";
    try {
      const run = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ case_study_id: id }),
      });
      if (!run.ok) {
        throw new Error(`HTTP ${run.status}`);
      }
      console.log("Algorithm triggered successfully!");
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async function handleSubmitToApi() {
    const s = customCsState || {};
    const fd = new FormData();

    async function getErrorDetails(response) {
      try {
        const data = await response.json();
        return JSON.stringify(data);
      } catch {
        try {
          return await response.text();
        } catch {
          return "No response body";
        }
      }
    }

    async function uploadSingleCsv(file, caseStudyId) {
      const uploadStrategies = [
        { caseKey: "case_study", fileKey: "csv_file" },
        { caseKey: "case_study_id", fileKey: "csv_file" },
        { caseKey: "case_study", fileKey: "file" },
        { caseKey: "case_study_id", fileKey: "file" },
      ];

      const failures = [];

      for (const { caseKey, fileKey } of uploadStrategies) {
        const csvFormData = new FormData();
        csvFormData.append(caseKey, caseStudyId);
        csvFormData.append(fileKey, file, file.name);

        const csvResponse = await fetch(
          "http://127.0.0.1:8000/api/csv-files/",
          {
            method: "POST",
            body: csvFormData,
          },
        );

        if (csvResponse.ok) {
          const csvData = await csvResponse.json();
          console.log(
            `CSV upload succeeded for ${file.name} using ${caseKey} + ${fileKey}`,
          );
          return csvData;
        }

        const details = await getErrorDetails(csvResponse);
        failures.push(
          `${caseKey}+${fileKey} => HTTP ${csvResponse.status}: ${details}`,
        );
      }

      throw new Error(
        `CSV Upload Failed for ${file.name}. Tried strategies: ${failures.join(" | ")}`,
      );
    }

    fd.append("name", s.name || "");
    fd.append("email", s.email || "");
    fd.append("resample_strategy", s.resampleStrategy || "");
    fd.append(
      "driver_signal",
      s.driverSignal ? JSON.stringify(s.driverSignal) : "",
    );
    fd.append("main_variable", s.mainVariable || "");
    fd.append(
      "context_variables",
      s.contextVariables ? JSON.stringify(s.contextVariables) : "",
    );

    // Keep UPPAAL files in the main payload if they exist
    if (s.uppaalModelFile) fd.append("uppaal_model_file", s.uppaalModelFile);
    if (s.uppaalQueryFile) fd.append("uppaal_query_file", s.uppaalQueryFile);

    fd.append("user_json", s.userJson ? JSON.stringify(s.userJson) : "");
    fd.append("noise", s.noise);
    fd.append("p_value", s.pValue);
    fd.append("mi_query", s.miQuery);
    fd.append("plot_ddtw", s.plotDdtw);
    fd.append("ht_query", s.htQuery);
    fd.append("ht_query_type", s.htQueryType);
    fd.append("eq_condition", s.eqCondition);
    fd.append("is_stochastic", s.isStochastic);
    fd.append("is_aggregation", s.isAggregation);
    fd.append("n_min", s.nMin);

    try {
      const result = await postData(fd);
      console.log("Main API Response:", result);

      if (result && result.id) {
        console.log("Success! Server returned Case Study ID:", result.id);

        customCsDispatch({
          type: "UPDATE_FIELD",
          payload: { key: "id", value: result.id },
        });

        let csvArray = [];
        if (s.csvFile) {
          csvArray = Array.isArray(s.csvFile)
            ? s.csvFile
            : s.csvFile instanceof FileList
              ? Array.from(s.csvFile)
              : [s.csvFile];
        }

        if (csvArray.length > 0) {
          console.log(`Uploading ${csvArray.length} CSV files...`);
          const uploadedCsvRows = [];

          for (const file of csvArray) {
            if (!file) continue;
            const csvData = await uploadSingleCsv(file, result.id);
            uploadedCsvRows.push(csvData);
          }

          console.log("CSV API Responses:", uploadedCsvRows);
        }
        toast.success(
          `The case study submitted successfully, waiting for results...`,
          {
            theme: "colored",
          },
        );
        setSubmitted(true);

        runAlgorithm(result.id);
        setTimeout(() => {
          navigate("/results");
        }, 1200);
      } else {
        console.error("Server responded, but no ID was found");
        toast.error(`Server responded, but no ID was found.`, {
          theme: "colored",
        });
      }
    } catch (err) {
      console.error("Failed during the submission sequence:", err);
      toast.error(`Submission failed: ${err.message}`, { theme: "colored" });
    }
  }

  return (
    <>
      {isLoading ? (
        <ClipLoader />
      ) : (
        <>
          <Button
            text="Back"
            handleClick={prevPage}
            classes="font-bold bg-gray-200 text-gray-700 hover:bg-gray-300"
          />
          <Button
            text="Run The Algorithm"
            icon={<FaUpload />}
            handleClick={handleSubmitToApi}
            classes={
              "text-white font-bold bg-green-800 hover:bg-green-700 hover:scale-103"
            }
          />
        </>
      )}
    </>
  );
}
