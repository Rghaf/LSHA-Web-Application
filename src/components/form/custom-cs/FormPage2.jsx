import File from "../../inputs/File";
import Alert from "../../Alert";
import Button from "../../Button";
import Input from "../../inputs/Input";
import { useContext, useEffect, useState } from "react";
import { MdAdd } from "@react-icons/all-files/md/MdAdd";
import { CustomCsContext } from "../../../contexts/CustomCsContext";
import EventFields from "./EventFields";
import { ClipLoader } from "react-spinners";
import { PageContext } from "../../../contexts/PageContext";
import { parseCSV } from "../../../functions/ParseCSV";
export default function FormPage2({ handleBtnDisabled }) {
  const [addManual, setAddManual] = useState(false);
  const [data, setData] = useState(null);
  const { customCsState, customCsDispatch } = useContext(CustomCsContext);
  const { pageState, pageDispatch, loadingOn, loadingOff } =
    useContext(PageContext);
  useEffect(() => {
    console.log("LOAFING>>", pageState.loading);
    let dis = true;
    for (let i = 0; i < customCsState.events.length; i++) {
      if (
        customCsState.events[i].channel === null ||
        customCsState.events[i].condition === null ||
        customCsState.events[i].symbol === null ||
        !customCsState.events[i].channel.trim() ||
        !customCsState.events[i].condition.trim() ||
        !customCsState.events[i].symbol.trim()
      ) {
        dis = false;
      }
    }
    console.log("ALL ARE FILLED", dis);
    handleBtnDisabled(dis);
  }, [customCsState]);

  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  const handleFileProcess = async (fileObj) => {
    loadingOn();
    try {
      console.log("Reading file in Parent...");

      // 1. Read raw text
      const text = await readFileContent(fileObj);
      let finalData = null;

      // 2. Check Extension and Parse accordingly
      if (fileObj.name.toLowerCase().endsWith(".json")) {
        console.log("Parsing JSON...");
        finalData = JSON.parse(text);
      } else if (fileObj.name.toLowerCase().endsWith(".csv")) {
        console.log("Parsing CSV...");
        finalData = parseCSV(text);
      } else {
        throw new Error("Unsupported file type. Please use .json or .csv");
      }

      console.log("Parsed Data:", finalData);

      // 3. Dispatch
      setTimeout(() => {
        customCsDispatch({
          type: "LOAD_EVENTS",
          payload: finalData,
        });
        pageDispatch({
          type: "MANUAL",
        });
        loadingOff();
      }, 2000);
    } catch (error) {
      console.error("Error processing file:", error);
      alert("Error reading file. Check format.");
      loadingOff();
    }
  };

  return (
    <>
      <div className="text-center">
        <ClipLoader
          // color={color}
          loading={pageState.loading}
          // cssOverride={override}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
      {!pageState.isManual && !pageState.loading && (
        <>
          <Button
            text="Add manualy"
            classes="text-white font-bold bg-blue-600 hover:bg-blue-700 hover:scale-101"
            handleClick={() =>
              pageDispatch({
                type: "MANUAL",
              })
            }
          />
          <h1 className="text-center font-bold text-xl text-gray-600">OR</h1>
          <File title="Events JSON" onFileSelect={handleFileProcess} />
          <h1>{pageState.loading}</h1>
          <Alert text="The file should be in CSV or Json format." />
        </>
      )}
      {pageState.isManual && (
        <>
          {customCsState.events.map((item, index) => (
            <EventFields key={index} index={index} event={item} />
          ))}
          <Button
            text="Add more"
            handleClick={() =>
              customCsDispatch({
                type: "ADD_EVENT",
              })
            }
            icon={<MdAdd />}
            classes="text-white bg-blue-600 hover:bg-blue-700 hover:scale-101"
          />
        </>
      )}
      {/* {customCsState.events.length > 1 && (
        <>
          {customCsState.events.map((item, index) => (
            <EventFields key={index} index={index} event={item} />
          ))}
          <Button
            text="Add more"
            handleClick={() =>
              customCsDispatch({
                type: "ADD_EVENT",
              })
            }
            icon={<MdAdd />}
            classes="text-white bg-blue-600 hover:bg-blue-700 hover:scale-101"
          />
        </>
      )} */}
    </>
  );
}
