import { useEffect, useState } from "react";
import Input from "../../inputs/Input";
import { useContext } from "react";
import { CustomCsContext } from "../../../contexts/CustomCsContext";
import { PageContext } from "../../../contexts/PageContext";
import { MdDeleteForever } from "@react-icons/all-files/md/MdDeleteForever";
import Button from "../../Button";

export default function EventFields({ index, event = {} }) {
  const { customCsState, customCsDispatch } = useContext(CustomCsContext);
  const [channel, setChannel] = useState("");
  const [condition, setCondition] = useState("");
  const [symbol, setSymbol] = useState("");

  //   useEffect(() => {
  //     setChannel(event.channel ?? "");
  //     setCondition(event.condition ?? "");
  //     setSymbol(event.symbol ?? "");
  //   }, []);

  //   useEffect(() => {
  //     customCsDispatch({
  //       type: "UPDATE_EVENT_FIELD",
  //       payload: { index, key: "channel", value: channel },
  //     });
  //   }, [channel, index, customCsDispatch]);

  //   useEffect(() => {
  //     customCsDispatch({
  //       type: "UPDATE_EVENT_FIELD",
  //       payload: { index, key: "condition", value: condition },
  //     });
  //   }, [condition, index, customCsDispatch]);

  //   useEffect(() => {
  //     customCsDispatch({
  //       type: "UPDATE_EVENT_FIELD",
  //       payload: { index, key: "symbol", value: symbol },
  //     });
  //   }, [symbol, index, customCsDispatch]);

  const handleChange = (key, value) => {
    customCsDispatch({
      type: "UPDATE_EVENT_FIELD",
      payload: { index, key, value },
    });
  };
  return (
    <div className="flex justify-between">
      <div className="m-1">
        <Input
          title="Channel"
          description="name"
          type="text"
          value={event.channel || ""}
          handleChange={(e) => handleChange("channel", e.target.value)}
        />
      </div>
      <div className="m-1">
        <Input
          title="Condition"
          type="text"
          value={event.condition || ""}
          handleChange={(e) => handleChange("condition", e.target.value)}
        />
      </div>
      <div className="m-1">
        <Input
          title="Symbol"
          type="text"
          value={event.symbol || ""}
          handleChange={(e) => handleChange("symbol", e.target.value)}
        />
      </div>

      <div className="mt-8">
        <Button
          handleClick={() =>
            customCsDispatch({
              type: "REMOVE_EVENT",
              payload: { index },
            })
          }
          text="Remove"
          icon={<MdDeleteForever />}
          classes="bg-red-500 text-white mt-1 hover:bg-red-700"
        />
      </div>
    </div>
  );
}
