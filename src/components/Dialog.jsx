import { useState } from "react";
import Alert from "./Alert";
import Button from "./Button";

export default function Dialog({ show = true, dialogAction }) {
  const [showDialog, setShowDialog] = useState(show);

  //   function openDialog() {
  //     setShowDialog(true);
  //   }
  function closeDialog() {
    setShowDialog(false);
  }
  return (
    <>
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 backdrop-blur-xs transition-opacity"
            onClick={closeDialog}
          />
          <div className="relative mx-4 w-full max-w-md bg-white rounded-2x border rounded-2xl border-blue-600 shadow-2xl p-6">
            <button
              onClick={closeDialog}
              aria-label="Close"
              className="absolute right-4 top-4 text-black hover:text-gray-800 dark:hover:text-gray-200">
              ×
            </button>

            <div className="flex items-start gap-4 text-center">
              <div className="min-w-0">
                <h3 className="text-3xl font-semibold text-gray-900 p-5">
                  Save your progress!
                </h3>
                <p className="mt-1 text-lg">
                  Do you want continue with your previous progeress, or you want
                  start a new case study?
                </p>
                <p className="p-5 text-s">
                  If you start from zero, you can't restore what you did before
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-3">
              {dialogAction && (
                <Button
                  text="Cancel & Restart"
                  handleClick={dialogAction}
                  classes="text-white bg-red-600 hover:bg-red-700"
                />
              )}

              <Button
                text="Continue"
                handleClick={closeDialog}
                classes="text-white bg-blue-600 hover:bg-blue-700"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
