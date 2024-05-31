import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import HistoryPage from "../HistoryPage/HistoryPage";
import HomePage from "../HomePage/HomePage";
import ChatPdfPage from "../ChatPdfPage/ChatPdfPage";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import GroupsPage from "../GroupsPage/GroupsPage";


const App = () => {
  return (
    <div className="App">
      <Routes>
      <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/chatpdf" element={<ChatPdfPage />} /> 
        <Route path="/groups" element={<GroupsPage />} /> 
      </Routes>
    </div>
  );
};

export default App;