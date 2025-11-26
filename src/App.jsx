import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Container from "./components/Container";
import Home from "./pages/Home";
import FormPage from "./pages/FormPage";
import { PageProvider } from "./contexts/PageContext";
import { CustomCsProvider } from "./contexts/CustomCsContext";

function App({ children }) {
  return (
    <BrowserRouter>
      <PageProvider>
        <CustomCsProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form" element={<FormPage />} />
          </Routes>
          <Container>{children}</Container>
        </CustomCsProvider>
      </PageProvider>
    </BrowserRouter>
  );
}

export default App;
