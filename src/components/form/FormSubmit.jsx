import { useContext, useEffect, useState } from "react";
import Button from "../Button";
import { MdArrowForward } from "@react-icons/all-files/md/MdArrowForward";
import { FaUpload } from "@react-icons/all-files/fa/FaUpload";
import { PageContext } from "../../contexts/PageContext";
import { usePost } from "../../hooks/usePost";
import { CustomCsContext } from "../../contexts/CustomCsContext";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function FormSubmit() {
  const { customCsState, customCsDispatch } = useContext(CustomCsContext);
  const { pageState, nextPage, prevPage, active } = useContext(PageContext);
  const [submitted, setSubmitted] = useState(false);
  // const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { postData, isLoading, error, response } = usePost(
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
    if (s.uppaalModelFile) fd.append("uppaal_model_file", s.uppaalModelFile);
    if (s.uppaalQueryFile) fd.append("uppaal_query_file", s.uppaalQueryFile);
    if (s.csvFile) fd.append("csv_file", s.csvFile);
    // fd.append(
    //   "uppaal_query",
    //   s.uppaalQuery ? JSON.stringify(s.uppaalQuery) : "",
    // );
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
      console.log("API Response:", result.response);
      if (result && result.id) {
        console.log("Success! Server returned Case Study ID:", result.id);
        customCsDispatch({
          type: "UPDATE_FIELD",
          payload: { key: "id", value: result.id },
        });

        setSubmitted(true);
        toast.success(`Success! Server returned Case Study ID: ${result.id}`, {
          theme: "colored",
        });
        runAlgorithm(result.id);
        navigate("/results");
      } else {
        console.error(
          "Server responded, but no ID was found:",
          result.response,
        );
        // Optionally show an error message to the user here
        toast.error(
          `Server responded, but no ID was found: ${result.response}`,
          {
            theme: "colored",
          },
        );
      }
    } catch (err) {
      console.error("Failed to post data to the server:", err);
      toast.error(`Failed to post data to the server: ${err.message}`, {
        theme: "colored",
      });
    }
    // customCsDispatch({
    //   type: "RESET",
    // });
    console.log("S:", s);
    console.log("FD", fd);
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
