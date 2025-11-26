import { useState, useContext, useEffect } from "react";
import Input from "../../inputs/Input";
import Button from "../../Button";
import { CustomCsContext } from "../../../contexts/CustomCsContext";
import Dialog from "../../Dialog";

// export default function FormPage1({ handleSubmit, handleBtnDisabled }) {
export default function FormPage1({ handleBtnDisabled }) {
  const [reset, setReset] = useState(false);
  const [csName, setCsName] = useState("");
  const [email, setEmail] = useState("");
  const [resampleStrategy, setResampleStrategy] = useState("");
  const { customCsState, customCsDispatch } = useContext(CustomCsContext);

  useEffect(() => {
    if (customCsState.name) {
      setCsName(customCsState.name);
    } else setCsName("");
    if (customCsState.email) {
      setEmail(customCsState.email);
    } else setEmail("");
    if (customCsState.resampleStrategy) {
      setResampleStrategy(customCsState.resampleStrategy);
    } else setResampleStrategy("");
  }, [customCsState.name, customCsState.email, customCsState.resampleStrategy]);

  useEffect(() => {
    if (!csName.trim() || resampleStrategy === "") handleBtnDisabled(false);
    else handleBtnDisabled(true);
  }, [csName, resampleStrategy]);

  function handleCsName(e) {
    const value = e.target.value;
    setCsName(value);
    customCsDispatch({
      type: "CREATED",
      payload: {
        ...customCsState,
        name: value,
      },
    });
  }

  function handleEmail(e) {
    const value = e.target.value;
    setEmail(value);
    customCsDispatch({
      type: "CREATED",
      payload: {
        ...customCsState,
        email: value,
      },
    });
  }

  function handleStrategy(e) {
    const value = e.target.value;
    setResampleStrategy(value);
    customCsDispatch({
      type: "CREATED",
      payload: {
        ...customCsState,
        resampleStrategy: value,
      },
    });
  }

  function handleSubmit() {
    console.log("Submitted!!");
    customCsDispatch({
      type: "CREATED",
      payload: {
        name: csName,
        email: email,
        resampleStrategy: resampleStrategy,
      },
    });
  }

  return (
    <>
      <Input
        type="text"
        title="Custom Case Study Name*"
        placeholder="Enter case study name"
        handleChange={handleCsName}
        // disabled={created}
        value={csName}
        required={true}
      />
      <Input
        type="select"
        value={resampleStrategy}
        title="Resample Strategy of your case study"
        options={[
          "----please select a resample strategy----",
          "SIM",
          "UPPAAL",
          "SKG",
          "REAL",
        ]}
        required={true}
        handleChange={handleStrategy}
      />
      <Input
        type="text"
        title="Enter your email"
        placeholder="your@mail.com"
        // disabled={created}
        value={email}
        handleChange={handleEmail}
      />
      {/* <Button
        text="Create New Case Study"
        classes="text-white font-bold bg-blue-600 hover:bg-blue-700 hover:scale-101"
        onClick={handleSubmit}
      /> */}
    </>
  );
}
