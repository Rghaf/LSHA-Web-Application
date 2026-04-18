import { useContext, useEffect } from "react";
import Button from "../Button";
import { MdArrowForward } from "@react-icons/all-files/md/MdArrowForward";
import { FaUpload } from "@react-icons/all-files/fa/FaUpload";
import { PageContext } from "../../contexts/PageContext";
// import { usePost } from "../../../hooks/usePost";
import { usePost } from "../../hooks/usePost";
import { CustomCsContext } from "../../contexts/CustomCsContext";
import { ClipLoader } from "react-spinners";
import FormSubmit from "./FormSubmit";

export default function FormFooter() {
  const { pageState, nextPage, prevPage, active } = useContext(PageContext);
  const { customCsState } = useContext(CustomCsContext);

  const { postData, isLoading, error, response } = usePost(
    "http://127.0.0.1:8000/api/case-study/",
  );

  function handleSubmitToApi() {
    const s = customCsState || {};
    const fd = new FormData();

    function appendFiles(key, files) {
      if (!files) return;
      const fileList = Array.isArray(files) ? files : [files];
      fileList.forEach((file) => {
        if (file) fd.append(key, file);
      });
    }

    fd.append("name", s.name || "");
    fd.append("email", s.email || "");
    fd.append("resample_strategy", s.resampleStrategy || "");
    fd.append("driver_signal", s.driverSignal || "");
    fd.append("main_variable", s.mainVariable || "");
    fd.append(
      "context_variables",
      s.contextVariables ? JSON.stringify(s.contextVariables) : "",
    );
    appendFiles("uppaal_model_file", s.uppaalModelFile);
    appendFiles("uppaal_query_file", s.uppaalQueryFile);
    appendFiles("csv_file", s.csvFile || s.dataFile);
    fd.append(
      "uppaal_query",
      s.uppaalQuery ? JSON.stringify(s.uppaalQuery) : "",
    );
    fd.append("user_json", s.userJson ? JSON.stringify(s.userJson) : "");
    postData(fd);
    fd.append("noise", s.noise);
    fd.append("p_value", s.pValue);
    fd.append("mi_query", s.miQuery);
    fd.append("plot_ddtw", s.plotDdtw);
    fd.append("ht_query", s.htQuery);
    fd.append("ht_query_type", s.htQueryType);
    fd.append("eq_condition", s.eqCondition);
    fd.append("is_stochastic", s.isStochastic);
  }
  return (
    <div className="flex justify-center mt-12 space-x-6">
      {pageState.pageNum < 5 ? (
        <>
          <Button
            text="Back"
            handleClick={prevPage}
            classes="font-bold bg-gray-200 text-gray-700 hover:bg-gray-300"
          />
          <Button
            text="Continue to next step"
            icon={<MdArrowForward />}
            handleClick={nextPage}
            classes={
              pageState.disabled
                ? "font-bold bg-gray-200 text-gray-700"
                : "text-white font-bold bg-blue-600 hover:bg-blue-700 hover:scale-103"
            }
            disabled={pageState.disabled}
          />
        </>
      ) : (
        <FormSubmit />
      )}
    </div>
  );
}
