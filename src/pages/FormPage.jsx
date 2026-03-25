import { useContext, useState } from "react";

import Form from "../components/form/Form";
import FormFooter from "../components/form/FormFooter";
import FormHeader from "../components/form/FormHeader";
import { PageContext } from "../contexts/PageContext";
import { FormHeaderData } from "../data/FormHeaderData";

export default function FormPage() {
  const { pageState, nextPage, prevPage, active, disable } =
    useContext(PageContext);
  // const [inputData, setInputData] = useState([
  //   {
  //     title: "Plot Distribution",
  //     description: "PLOT_DISTR",
  //     type: "checkbox",
  //     page: 1,
  //     value: null,
  //   },
  //   {
  //     title: "Plot Dynamic Time Warping",
  //     description: "(PLOT_DDTW)",
  //     type: "checkbox",
  //     page: 1,
  //     value: null,
  //   },
  //   {
  //     title: "Equivalence Condition",
  //     description: "(EQ_CONDITION)",
  //     type: "checkbox",
  //     page: 1,
  //     value: null,
  //   },
  //   {
  //     title: "Membership Query",
  //     description: "(MI_QUERY)",
  //     type: "checkbox",
  //     page: 1,
  //     value: null,
  //   },
  //   {
  //     title: "Hypothesis Test Query",
  //     description: "(HT_QUERY)",
  //     type: "checkbox",
  //     page: 1,
  //     value: null,
  //   },
  //   {
  //     title: "Type of Hypothesis Test Query",
  //     description: "(HT_QUERY_TYPE)",
  //     type: "checkbox",
  //     page: 1,
  //     value: null,
  //   },
  //   {
  //     title: "Minimum number of samples",
  //     description: "(N_MIN)",
  //     type: "number",
  //     page: 1,
  //     value: null,
  //   },
  //   {
  //     title: "Confidence Threshold (%)",
  //     description: "(DELTA)",
  //     type: "number",
  //     page: 1,
  //     value: null,
  //   },
  //   {
  //     title: "Case Study",
  //     description: null,
  //     type: "select",
  //     page: 2,
  //     value: null,
  //   },
  //   {
  //     title: "Resample Strategy",
  //     description: null,
  //     type: "select-rs",
  //     page: 2,
  //     value: null,
  //   },
  //   {
  //     title: "Version",
  //     description: "CS version",
  //     type: "number",
  //     page: 2,
  //     value: null,
  //   },
  //   {
  //     title: "UPPAAL Model",
  //     description: "Upload your UPPAAL model file",
  //     type: "file",
  //     page: 3,
  //     value: null,
  //   },
  // ]);

  // function handleInput(event, dataIdentifier) {}
  return (
    <section className="py-16 mt-30 bg-white shadow-lg rounded-lg max-w-5xl mx-auto my-10 px-8 md:px-12">
      <FormHeader
        header={FormHeaderData[pageState.pageNum - 1].header}
        description={FormHeaderData[pageState.pageNum - 1].description}
      />
      <Form />
      <FormFooter />
    </section>
  );
}
