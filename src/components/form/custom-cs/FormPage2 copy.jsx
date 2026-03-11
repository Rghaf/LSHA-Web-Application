import { useContext, useEffect, useState } from "react";
import { MdAdd } from "@react-icons/all-files/md/MdAdd";
import { CustomCsContext } from "../../../contexts/CustomCsContext";
import { PageContext } from "../../../contexts/PageContext";
import Button from "../../Button";
import AddMultipleFields from "../../inputs/AddMultipleFields";

export default function FormPage2({ handleBtnDisabled }) {
  const [addManual, setAddManual] = useState(false);
  const [data, setData] = useState(null);
  const { customCsState, customCsDispatch } = useContext(CustomCsContext);
  const { pageState, pageDispatch, loadingOn, loadingOff } =
    useContext(PageContext);

  // check if the fields are all filled, to enable the next button
  useEffect(() => {
    let dis = true;
    for (let i = 0; i < customCsState.realValuedVars.length; i++) {
      if (
        customCsState.realValuedVars[i].name === null ||
        customCsState.realValuedVars[i].label === null ||
        customCsState.realValuedVars[i].driverSignal === null ||
        !customCsState.realValuedVars[i].name.trim() ||
        !customCsState.realValuedVars[i].label.trim() ||
        !customCsState.realValuedVars[i].driverSignal.trim()
      ) {
        dis = false;
      }
    }
    handleBtnDisabled(dis);
  }, [customCsState]);

  return (
    <>
      {(customCsState.realValuedVars || []).map((item, index) => (
        <AddMultipleFields
          key={index}
          index={index}
          item={item}
          fields={[
            { key: "name", title: "Name", type: "text" },
            { key: "label", title: "Label", type: "text" },
            { key: "driverSignal", title: "Driver Signal", type: "text" },
          ]}
          handleChange={(idx, key, value) =>
            customCsDispatch({
              type: "UPDATE_REAL_VALUED_VAR_FIELD",
              payload: { index: idx, key, value },
            })
          }
          handleRemove={(idx) =>
            customCsDispatch({
              type: "REMOVE_REAL_VALUED_VAR",
              payload: { index: idx },
            })
          }
        />
      ))}
      <Button
        text="Add more"
        handleClick={() => customCsDispatch({ type: "ADD_REAL_VALUED_VAR" })}
        icon={<MdAdd />}
        classes="text-white bg-blue-600 hover:bg-blue-700 hover:scale-101"
      />
    </>
  );
}
