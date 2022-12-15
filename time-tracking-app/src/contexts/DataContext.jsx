import { createContext, useState } from "react";
import axios from "axios";

export const DataContext = createContext({});

export function DataProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  async function getProjects() {
    await axios
      .get("http://localhost:4000/projects")
      .then(function (res) {
        setProjects(res.data);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }

  async function getTasks() {
    await axios
      .get("http://localhost:4000/tasks")
      .then(function (res) {
        setTasks(res.data);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }

  const dataValue = {
    getProjects,
    projects,
    getTasks,
    tasks,
  };

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}
