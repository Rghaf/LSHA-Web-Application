import { useContext, useEffect } from "react";
import Button from "../Button";
import { MdArrowForward } from "@react-icons/all-files/md/MdArrowForward";
import { FaUpload } from "@react-icons/all-files/fa/FaUpload";
import { PageContext } from "../../contexts/PageContext";
// import { usePost } from "../../../hooks/usePost";
import { usePost } from "../../hooks/usePost";
import { CustomCsContext } from "../../contexts/CustomCsContext";
import { ClipLoader } from "react-spinners";

export default function FormSubmit() {
  const { customCsState, customCsDispatch } = useContext(CustomCsContext);
  const { pageState, nextPage, prevPage, active } = useContext(PageContext);

  const { postData, isLoading, error, response } = usePost(
    "http://127.0.0.1:8000/api/case-study/",
  );

  function handleSubmitToApi() {
    const s = customCsState || {};
    const fd = new FormData();
    fd.append("name", s.name || "");
    fd.append("email", s.email || "");
    fd.append("resample_strategy", s.resampleStrategy || "");
    fd.append("driver_signal", s.driverSignal || "");
    fd.append("main_variable", s.mainVariable || "");
    fd.append(
      "context_variables",
      s.contextVariables ? JSON.stringify(s.contextVariables) : "",
    );
    if (s.uppaalModelFile) fd.append("uppaal_model_file", s.uppaalModelFile);
    if (s.uppaalQueryFile) fd.append("uppaal_query_file", s.uppaalQueryFile);
    if (s.dataFile) fd.append("csv_file", s.dataFile);
    fd.append(
      "uppaal_query",
      s.uppaalQuery ? JSON.stringify(s.uppaalQuery) : "",
    );
    fd.append("user_json", s.userJson ? JSON.stringify(s.userJson) : "");
    fd.append("noise", s.noise);
    fd.append("p_value", s.pValue);
    fd.append("mi_query", s.miQuery);
    fd.append("plot_ddtw", s.plotDdtw);
    fd.append("ht_query", s.htQuery);
    fd.append("ht_query_type", s.htQueryType);
    fd.append("eq_condition", s.eqCondition);
    fd.append("is_stochastic", s.isStochastic);
    postData(fd);
    // customCsDispatch({
    //   type: "RESET",
    // });
    console.log("S:", s);
    console.log("FD", fd);
    nextPage();
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
