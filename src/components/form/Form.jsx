import { useContext, useEffect, useState } from "react";
import FormContainer from "./FormContainer";
import FormTitle from "./FromTitle";
import Input from "../inputs/Input";
import Button from "../Button";
import Text from "../inputs/Text";
import useFetch from "../../hooks/useFetch";
import { usePost } from "../../hooks/usePost";
import Alert from "../Alert";
import { useToast } from "../../hooks/useToast";
import FormPage1 from "./custom-cs/FormPage1";
import FormPage2 from "./custom-cs/FormPage2";
import { PageContext, PageProvider } from "../../contexts/PageContext";
import { CustomCsContext } from "../../contexts/CustomCsContext";
import Dialog from "../Dialog";

export default function Form({ data }) {
  const csOptions = ["Thermo", "HRI", "Energy", "Auto Twin", "GR3N"];
  const rsOptions = ["Option 1", "Option 2", "Option 3"];
  const [result, setResult] = useState({});
  const [csCreated, setCsCreated] = useState(false);
  const [lists, setLists] = useState([]);
  // const myData = useFetch("http://127.0.0.1:8000/api/case-study/");

  // Change data according to page
  const [pageData, setPageData] = useState([]);
  const { pageState, pageDispatch, nextPage, prevPage, active, disable } =
    useContext(PageContext);
  const { customCsState, customCsDispatch } = useContext(CustomCsContext);
  const { showSuccess, showError, showInfo } = useToast();
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (
      customCsState.name ||
      customCsState.email ||
      customCsState.resampleStrategy
    ) {
      setShowDialog(true);
      console.log(showDialog);
    }
  }, []);

  useEffect(() => {
    console.log("CS NAME:", customCsState.name);
    console.log("CS EMAIL:", customCsState.email);
    console.log("CS STRATEGY:", customCsState.resampleStrategy);
    customCsState.events.map((event, index) => {
      console.log(
        `EVENT - ${index}`,
        event.channel,
        event.condition,
        event.symbol
      );
    }),
      [customCsState];
  });
  // useEffect(() => {
  //   setPageData(data.filter((d) => d.page === page));
  // }, [page, data]);
  function handleBtnDisabled(dis) {
    if (!dis) disable();
    else active();
  }
  // useEffect(() => {
  //   if (!csName.trim()) disable();
  //   else active();
  //   console.log(pageState.disabled);
  // }, [csName]);

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   if (!csName.trim()) {
  //     showError("Please fill in Case study name", error);
  //     return;
  //   }
  //   const result = await postData({ name: csName, email: email });
  //   if (result) {
  //     setResult(result);
  //     setCsCreated(true);
  //     showSuccess(`The ${result.name} Case Study Successfully created!`);
  //     customCsDispatch({
  //       type: "CREATED",
  //       payload: {
  //         id: result.id,
  //         name: result.name,
  //         email: result.email,
  //       },
  //     });
  //     nextPage();
  //   } else {
  //     showError("ERROR!!!", error);
  //     console.error("Failed to create case study:", error);
  //   }
  // }

  const { postData, isLoading, error, response } = usePost(
    "http://127.0.0.1:8000/api/case-study/"
  );

  return (
    <>
      {showDialog && (
        <Dialog
          show={showDialog}
          dialogAction={() => {
            customCsDispatch({
              type: "RESET",
            });
            pageDispatch({
              type: "RESET",
            });
            setShowDialog(false);
          }}
        />
      )}

      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-gray-50 border border-gray-200 rounded-2xl p-8 md:p-12 shadow-inner">
        <div className="max-w-xl mx-auto space-y-8">
          <FormContainer>
            {pageState.pageNum === 1 && (
              <FormPage1
                // created={csCreated}
                handleBtnDisabled={handleBtnDisabled}
              />
            )}
            {pageState.pageNum === 2 && (
              <FormPage2 handleBtnDisabled={handleBtnDisabled} />
            )}
            {/* {csCreated && <Alert text="Successfully created!" style="success" />} */}
            {/* {myData !== null ? (
            <h1>{myData[0].event_list_name}</h1>
          ) : (
            <h1>Loading...</h1>
          )} */}
          </FormContainer>
          {/* <h2>Current User: {customCsState.name}</h2>
          <h2>Current User: {customCsState.email}</h2>
          <h2>Current User: {customCsState.resampleStrategy}</h2>
          {customCsState.events.map((event, index) => {
            return (
              <>
                <h2 key={`channel-${index}`}>Current User: {event.channel}</h2>
                <h2 key={`event-${index}`}>Current User: {event.condition}</h2>
                <h2 key={`reza-${index}`}>Current User: {event.symbol}</h2>
              </>
            );
          })} */}
        </div>
        {/* {page === 1 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <FormContainer>
            <FormTitle title="Toggle Options" />
            {pageData
              .filter((d) => d.type === "checkbox")
              .map((d, index) => (
                <Input
                  key={index}
                  title={d.title}
                  description={d.description}
                  type={d.type}
                />
              ))}
          </FormContainer>
          <FormContainer>
            {pageData
              .filter((d) => d.type === "number")
              .map((d, index) => (
                <Input
                  key={index}
                  title={d.title}
                  description={d.description}
                  type={d.type}
                />
              ))}
          </FormContainer>
        </div>
      ) : (
        <div className="max-w-xl mx-auto space-y-8">
          <FormContainer>
            {pageData.map((d, index) => (
              <Input
                key={index}
                title={d.title}
                description={d.description}
                type={d.type}
                options={d.type === "select" ? csOptions : rsOptions}
              />
            ))}
          </FormContainer>
        </div>
      )} */}
      </form>
    </>
  );
}
