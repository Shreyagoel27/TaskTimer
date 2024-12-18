import { useEffect, useState } from "react";
import "./App.css";
import BasicModal from "./Components/Modal/Modal";
import { Button } from "@mui/material";
import { getCurrentTimeInSeconds, subtractTimes } from "./utils";

function App() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedTable, setSelectedTable] = useState("onGoing");

  const [data, setData] = useState({
    onGoing: [
      {
        id: 1,
        name: "John Doe",
        time: "10:00:00 PM",
        day: "Monday",
        status: "onGoing",
      },
      {
        id: 2,
        name: "Jane Doe",
        time: "05:00:00 PM",
        day: "Monday",
        status: "onGoing",
      },
    ],
    showData: [],
  });

  // Update time only for "onGoing" tasks
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const updatedOnGoing = prev.onGoing.map((item) => {
          const currentTimeInSeconds = getCurrentTimeInSeconds();
          const updatedTime = subtractTimes(currentTimeInSeconds, item?.time);
          return { ...item, time: updatedTime };
        });
        console.log(updatedOnGoing);
        return { ...prev, showData: updatedOnGoing };
      });
    }, 1000);

    return () => clearInterval(interval); // Clear interval on unmount
  }, []);

  const handleSelect = (type) => {
    setSelectedTable(type);
  };

  // Handle task actions (Resolve or Reopen)
  const handleAction = (task) => {
    setData((prev) => {
      // Remove the task from its current table
      let updatedOnGoing = prev.onGoing.filter((item) => item.id !== task.id);
      let updatedResolved = prev.resolved.filter((item) => item.id !== task.id);
      let updatedUnresolved = prev.unresolved.filter(
        (item) => item.id !== task.id,
      );

      // Determine the new table for the task based on its action
      if (task.status === "onGoing") {
        updatedResolved = [...prev.resolved, { ...task, status: "resolved" }];
      } else if (task.status === "resolved") {
        updatedOnGoing = [...prev.onGoing, { ...task, status: "onGoing" }];
      } else if (task.status === "unresolved") {
        updatedOnGoing = [...prev.onGoing, { ...task, status: "onGoing" }];
      }

      return {
        ...prev,
        onGoing: updatedOnGoing,
        resolved: updatedResolved,
        unresolved: updatedUnresolved,
      };
    });
  };

  return (
    <>
      <BasicModal
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
        type="add"
      />

      <div>
        <div>
          <Button onClick={() => handleSelect("onGoing")}>On Going</Button>
          <Button onClick={() => handleSelect("resolved")}>Resolved</Button>
          <Button onClick={() => handleSelect("unresolved")}>Unresolved</Button>
        </div>

        <div>
          {data["showData"]?.map((item, index) => {
            if (selectedTable === "showData" && item.status === "onGoing") {
              return (
                <div className="item" key={index}>
                  <div>{item.name}</div>
                  <div>{item.time}</div>
                  <div>{item.day}</div>
                  <Button onClick={() => handleAction(item)}>Resolve</Button>
                </div>
              );
            }

            if (selectedTable === "resolved" && item.status === "resolved") {
              return (
                <div className="item" key={index}>
                  <div>{item.name}</div>
                  <div>{item.time}</div>
                  <div>{item.day}</div>
                  <Button onClick={() => handleAction(item)}>Reopen</Button>
                </div>
              );
            }

            if (
              selectedTable === "unresolved" &&
              item.status === "unresolved"
            ) {
              return (
                <div className="item" key={index}>
                  <div>{item.name}</div>
                  <div>{item.time}</div>
                  <div>{item.day}</div>
                  <Button onClick={() => handleAction(item)}>Reopen</Button>
                </div>
              );
            }

            return null; // Return null if the condition is not met
          })}
        </div>
      </div>
    </>
  );
}

export default App;
