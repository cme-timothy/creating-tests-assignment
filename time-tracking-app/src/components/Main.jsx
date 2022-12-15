import { Routes, Route } from "react-router-dom";
import Overview from "../pages/overview/Overview";
import Timer from "../pages/timer/Timer";
import History from "../pages/history/History";

function Main() {
  return (
    <Routes>
      <Route path="/Timer" element={<Timer />} />
      <Route path="/History" element={<History />} />
      <Route path="/" element={<Overview />} />
    </Routes>
  );
}

export default Main;
