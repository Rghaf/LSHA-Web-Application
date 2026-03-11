import { useContext, useEffect, useState, useCallback } from "react";
import { MdAdd } from "@react-icons/all-files/md/MdAdd";
import { CustomCsContext } from "../../../contexts/CustomCsContext";
import { PageContext } from "../../../contexts/PageContext";
import Button from "../../Button";
import Input from "../../inputs/Input";

export default function FormPage4({ handleBtnDisabled }) {
  const [variables, setVariables] = useState([]);
  const { customCsState, customCsDispatch } = useContext(CustomCsContext);
  const { pageState } = useContext(PageContext);

  // useEffect(() => {

  // }, [])

  function handleNoise(e) {
    const value = e.target.value;
    customCsDispatch({
      type: "UPDATE_FIELD",
      payload: { key: "noise", value },
    });
  }

  function handlePValue(e) {
    const value = e.target.value;
    customCsDispatch({
      type: "UPDATE_FIELD",
      payload: { key: "pValue", value },
    });
  }

  function handleMiQuery(e) {
    const value = e.target.checked;
    customCsDispatch({
      type: "UPDATE_FIELD",
      payload: { key: "miQuery", value },
    });
  }

  function handlePlotDdtw(e) {
    const value = e.target.checked;
    customCsDispatch({
      type: "UPDATE_FIELD",
      payload: { key: "plotDdtw", value },
    });
  }

  function handleHtQuery(e) {
    const value = e.target.checked;
    customCsDispatch({
      type: "UPDATE_FIELD",
      payload: { key: "htQuery", value },
    });
  }

  function handleHtQueryType(e) {
    const value = e.target.value;
    customCsDispatch({
      type: "UPDATE_FIELD",
      payload: { key: "htQueryType", value },
    });
  }

  function handleEqCondition(e) {
    const value = e.target.value;
    customCsDispatch({
      type: "UPDATE_FIELD",
      payload: { key: "eqCondition", value },
    });
  }

  function handleIsStochastic(e) {
    const value = e.target.checked;
    console.log("IS STOCHASTIC VALUE:", value);
    console.log(value);
    customCsDispatch({
      type: "UPDATE_FIELD",
      payload: { key: "isStochastic", value },
    });
  }

  return (
    <>
      <div className="grid grid-cols-[1fr_auto_1fr] gap-8">
        <div className="flex flex-col gap-8">
          <Input
            type="number"
            title="Noise"
            value={customCsState.noise ?? ""}
            handleChange={(e) => handleNoise(e)}
          />
          <Input
            type="select"
            title="HT Query Type"
            options={["D", "S"]}
            value={customCsState.handleHtQueryType}
            handleChange={(e) => handleHtQueryType(e)}
          />
          <Input
            type="checkbox"
            title="MI Query"
            checked={customCsState.miQuery ?? false}
            handleChange={(e) => handleMiQuery(e)}
          />
          <Input
            type="checkbox"
            title="Plot DDTW"
            checked={customCsState.plotDdtw ?? false}
            handleChange={(e) => handlePlotDdtw(e)}
          />
        </div>

        <div className="w-px bg-gray-300"></div>

        <div className="flex flex-col gap-8">
          <Input
            type="number"
            title="P-value"
            value={customCsState.pValue ?? ""}
            handleChange={(e) => handlePValue(e)}
          />

          <Input
            type="select"
            title="Eq Condition"
            options={["S", "W"]}
            value={customCsState.eqCondition ?? ""}
            handleChange={(e) => handleEqCondition(e)}
          />

          <Input
            type="checkbox"
            title="HT Query"
            checked={customCsState.htQuery ?? false}
            handleChange={(e) => handleHtQuery(e)}
          />

          <Input
            type="checkbox"
            title="Is Stochastic"
            checked={customCsState.isStochastic ?? false}
            handleChange={(e) => handleIsStochastic(e)}
          />
        </div>
      </div>
    </>
  );
}
