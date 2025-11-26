import { useContext, useEffect } from "react";
import Button from "../Button";
import { MdArrowForward } from "@react-icons/all-files/md/MdArrowForward";
import { PageContext } from "../../contexts/PageContext";

export default function FormFooter() {
  const { pageState, nextPage, prevPage, active } = useContext(PageContext);

  return (
    <div className="flex justify-center mt-12 space-x-6">
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
    </div>
  );
}
