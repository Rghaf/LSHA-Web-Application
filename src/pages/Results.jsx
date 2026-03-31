import React, { useState, useEffect, useContext } from "react";
import { ClipLoader } from "react-spinners";
import { CustomCsContext } from "../contexts/CustomCsContext";
import Alert from "../components/Alert";
import { toast, ToastContainer } from "react-toastify";
import ButtonWithIcon from "../components/ButtonWithIcon";
import { MdFileDownload } from "@react-icons/all-files/md/MdFileDownload";

export default function Results() {
  const { customCsState, customCsDispatch } = useContext(CustomCsContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  useEffect(() => {
    // 1. If we don't have an ID yet, do nothing.
    if (!customCsState?.id) return;

    let pollInterval; // We need a variable to hold our timer

    const fetchResults = async () => {
      try {
        console.log("Fetching results from API...");
        const response = await fetch(
          `http://127.0.0.1:8000/api/case-study/${customCsState.id}/`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setResults(data);

        // 2. THE STOP CONDITION
        // Check if the files are there OR if you added a status field (data.status === 'COMPLETED')
        if (data.final_result_pdf && data.final_result_txt) {
          setIsLoaded(true);

          // STOP THE TIMER! We have the data, no need to ask the server anymore.
          clearInterval(pollInterval);

          toast.success(`Success! Results are ready`, {
            theme: "colored",
          });
        }
      } catch (error) {
        console.error("Error fetching results:", error);
        setError(error.message);
        // Optional: clearInterval(pollInterval) here if you want it to stop polling on errors
      }
    };

    // 3. Fetch immediately the first time the page loads
    fetchResults();

    // 4. Start the loop: Run fetchResults every 3000 milliseconds (3 seconds)
    pollInterval = setInterval(fetchResults, 3000);

    // 5. CRITICAL CLEANUP: If the user navigates to a different page before
    // the algorithm finishes, this destroys the timer so it doesn't run forever in the background.
    return () => clearInterval(pollInterval);
  }, [customCsState.id]);

  // useEffect(() => {
  //   const fetchResults = async () => {
  //     try {
  //       console.log("Fetching results from API...");
  //       const response = await fetch(
  //         `http://127.0.0.1:8000/api/case-study/${customCsState.id}/`,
  //       );
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       console.log(`response from API: ${response.body}`);
  //       const data = await response.json();
  //       console.log("Results data:", data);
  //       setResults(data);
  //       if (data.final_result_pdf || data.final_result_txt) {
  //         setIsLoaded(true);
  //       }
  //       toast.success(`Success! Results are ready`, {
  //         theme: "colored",
  //       });
  //     } catch (error) {
  //       console.error("Error fetching results:", error);
  //       setError(error.message);
  //     }
  //   };

  //   fetchResults();
  //   console.log(results);
  // }, [isLoaded, customCsState.id]);

  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          {isLoaded ? (
            <div className="mt-20">
              <ToastContainer />
              <h1 className="text-4xl font-bold my-10">
                The results Are ready!
              </h1>
              <Alert
                text={`Case study: ${results.name}, ID: ${results.id},`}
                m="my-10"
              />
              <Alert text={`Created at: ${results.created_at}`} />
              <hr className="my-10" />
              <h2 className="text-3xl font-bold">Case Study Results:</h2>
              <iframe
                src={results.final_result_pdf}
                width="100%"
                height="600px"
                title="Automaton PDF"></iframe>
              <ButtonWithIcon
                classes="bg-blue-600 text-white hover:bg-blue-700"
                text="Download PDF"
                href={results.final_result_pdf}
                target="_blank"
                icon={<MdFileDownload />}
              />
              <ButtonWithIcon
                classes="bg-blue-600 text-white hover:bg-blue-700"
                text="Download txt"
                href={results.final_result_txt}
                target="_blank"
                icon={<MdFileDownload />}
              />
            </div>
          ) : (
            <>
              <h2 className="text-4xl font-bold text-gray-800 mt-50 mb-6">
                Waiting for Results...
              </h2>
              <h2 className="text-2xl text-gray-800 mb-6">
                it may take a few minutes, don't close this page until your
                results be ready!
              </h2>
              <ClipLoader />
            </>
          )}
          {/* <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Dive into the world of L*sha by customizing the algorithm or easily
            uploading your data.
          </p>

          <p className="text-xl font-medium text-gray-600 mb-8">OR</p> */}
        </div>
      </section>
    </>
  );
}
