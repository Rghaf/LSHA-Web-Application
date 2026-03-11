import { useContext, useEffect, useState } from "react";
import { MdAdd } from "@react-icons/all-files/md/MdAdd";
import { CustomCsContext } from "../../../contexts/CustomCsContext";
import { PageContext } from "../../../contexts/PageContext";
import Button from "../../Button";
import AddMultipleFields from "../../inputs/AddMultipleFields";
import Input from "../../inputs/Input";

export default function FormPage2({ handleBtnDisabled }) {
  const [driverSignal, setDriverSignal] = useState();
  const [variables, setVariables] = useState([]);
  const { customCsState, customCsDispatch } = useContext(CustomCsContext);
  const { pageState, pageDispatch, loadingOn, loadingOff } =
    useContext(PageContext);

  useEffect(() => {
    let dis = true;
    if (
      customCsState.driverSignal === null ||
      customCsState.driverSignal === "select"
    ) {
      dis = false;
    }
    for (let i = 0; i < customCsState.variables.length; i++) {
      if (
        customCsState.variables[i].name === null ||
        customCsState.variables[i].symbol === null ||
        customCsState.variables[i].data_column === null ||
        !customCsState.variables[i].name.trim() ||
        !customCsState.variables[i].symbol.trim() ||
        !customCsState.variables[i].data_column.trim() ||
        customCsState.variables[i].data_column === "select"
      ) {
        dis = false;
      }
    }
    handleBtnDisabled(dis);
  }, [customCsState]);

  // check if the fields are all filled, to enable the next button
  // useEffect(() => {
  //   let dis = true;
  //   for (let i = 0; i < customCsState.realValuedVars.length; i++) {
  //     if (
  //       customCsState.realValuedVars[i].name === null ||
  //       customCsState.realValuedVars[i].label === null ||
  //       customCsState.realValuedVars[i].driverSignal === null ||
  //       !customCsState.realValuedVars[i].name.trim() ||
  //       !customCsState.realValuedVars[i].label.trim() ||
  //       !customCsState.realValuedVars[i].driverSignal.trim()
  //     ) {
  //       dis = false;
  //     }
  //   }
  //   handleBtnDisabled(dis);
  // }, [customCsState]);

  function handleDriverSignal(e) {
    setDriverSignal(e.target.value);
    customCsDispatch({
      type: "UPDATE_FIELD",
      payload: { key: "driverSignal", value: e.target.value },
    });
  }

  return (
    <>
      <Input
        type="select"
        title="Driver Signal"
        options={[
          "----please select an option----",
          ...customCsState.csvHeaders,
        ]}
        value={driverSignal}
        handleChange={(e) => handleDriverSignal(e)}
      />
      {customCsState.variables.map((variable, index) => (
        <AddMultipleFields
          key={index}
          index={index}
          item={variable}
          options={["select", ...customCsState.csvHeaders]}
          fields={[
            { key: "name", title: "Name", type: "text" },
            { key: "symbol", title: "Symbol", type: "text" },
            { key: "data_column", title: "Data Column", type: "select" },
          ]}
          handleChange={(idx, key, value) =>
            customCsDispatch({
              type: "UPDATE_VAR_FIELD",
              payload: { index: idx, key, value },
            })
          }
          handleRemove={(idx) =>
            customCsDispatch({
              type: "REMOVE_VAR",
              payload: { index: idx },
            })
          }
        />
      ))}
      <Button
        text="Add more"
        handleClick={() => customCsDispatch({ type: "ADD_VAR" })}
        icon={<MdAdd />}
        classes="text-white bg-blue-600 hover:bg-blue-700 hover:scale-101"
      />
    </>
  );
}
