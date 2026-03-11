import { useContext, useEffect, useState, useCallback } from "react";
import { MdAdd } from "@react-icons/all-files/md/MdAdd";
import { CustomCsContext } from "../../../contexts/CustomCsContext";
import { PageContext } from "../../../contexts/PageContext";
import Button from "../../Button";
import Input from "../../inputs/Input";

export default function FormPage2Uppaal({ handleBtnDisabled }) {
  const [variables, setVariables] = useState([]);
  const { customCsState, customCsDispatch } = useContext(CustomCsContext);
  const { pageState } = useContext(PageContext);

  useEffect(() => {
    let dis = true;
    if (
      customCsState.driverSignal === null ||
      customCsState.driverSignal === "----please select an option----" ||
      customCsState.mainVariable === null ||
      customCsState.mainVariable === "----please select an option----"
      // customCsState.contextVariables.length === 0
    ) {
      dis = false;
    }
    // for (let i = 0; i < customCsState.uppaalVariables.length; i++) {
    //   if (
    //     customCsState.uppaalVariables[i] === null ||
    //     !customCsState.uppaalVariables[i].trim()
    //   ) {
    //     dis = false;
    //   }
    // }
    handleBtnDisabled(dis);
  }, [customCsState]);

  function handleDriverSignal(e) {
    const value = e.target.value;
    customCsDispatch({
      type: "UPDATE_FIELD",
      payload: { key: "driverSignal", value },
    });
  }

  function handleMainVariable(e) {
    const value = e.target.value;
    customCsDispatch({
      type: "UPDATE_FIELD",
      payload: { key: "mainVariable", value },
    });
  }

  function handleContextVariables(e) {
    // 1. Get all selected options from the multiple select
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value,
    );

    // 2. Filter out placeholder and restore original case
    const values = selectedOptions
      .filter((val) => val !== "----please select an option----")
      .map((val) => {
        const original = (customCsState.uppaalQuery.variables || []).find(
          (v) => v === val,
        );
        return original || val;
      });

    // 3. Update state with array of strings
    customCsDispatch({
      type: "UPDATE_FIELD",
      payload: { key: "contextVariables", value: values },
    });
  }

  // function addVariableRow() {
  //   customCsDispatch({
  //     type: "ADD_VAR_UPPAAL",
  //     payload: { value: "" },
  //   });
  // }

  return (
    <>
      {/* <Input
        type="text"
        title="Constraint"
        value={customCsState.uppaalQuery.constraints}
        disabled={true}
      /> */}
      <Input
        type="select"
        title="Driver Signal"
        options={[
          "----please select an option----",
          ...customCsState.uppaalQuery.variables,
        ]}
        value={customCsState.driverSignal ?? ""}
        handleChange={(e) => handleDriverSignal(e)}
      />
      <Input
        type="select"
        title="Main Variable"
        options={[
          "----please select an option----",
          ...customCsState.uppaalQuery.variables,
        ]}
        value={customCsState.mainVariable ?? ""}
        handleChange={(e) => handleMainVariable(e)}
      />
      <Input
        type="select"
        title="Context Variable"
        multiple={true}
        options={[
          "----please select one or more options----",
          ...customCsState.uppaalQuery.variables,
        ]}
        value={customCsState.contextVariables ?? []}
        handleChange={(e) => handleContextVariables(e)}
      />

      {/* <Button
        text="Add more"
        handleClick={addVariableRow}
        icon={<MdAdd />}
        classes="text-white bg-blue-600 hover:bg-blue-700 hover:scale-101"
      /> */}
    </>
  );
}
