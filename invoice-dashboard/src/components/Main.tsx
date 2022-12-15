import { Routes, Route } from "react-router-dom";
import Overview from "../pages/overview/Overview";
import Invoices from "../pages/invoices/Invoices";
import Tasks from "../pages/tasks/Tasks";
import Timekeeping from "../pages/timekeeping/Timekeeping";
import Projects from "../pages/projects/Projects";
import NoMatch from "./NoMatch";

export default function Main({ onToggle }: Toggle) {
  return (
    <Routes>
      <Route index element={<Overview onToggle={onToggle} />} />
      <Route path="invoices" element={<Invoices onToggle={onToggle} />} />
      <Route path="tasks" element={<Tasks onToggle={onToggle} />} />
      <Route path="timekeeping" element={<Timekeeping onToggle={onToggle} />} />
      <Route path="projects" element={<Projects onToggle={onToggle} />} />
      <Route path="*" element={<NoMatch onToggle={onToggle} />} />
    </Routes>
  );
}
