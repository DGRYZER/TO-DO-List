import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./todolist.css";

const Todolist = () => {
  const [inputs, setinputs] = useState("");
  const [searchData, setsearchData] = useState("");
  const [zoom, setzoom] = useState(100);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [scheduledTasks, setScheduledTasks] = useState({});

  const additem = () => {
    if (inputs !== "") {
      const dateStr = selectedDate.toDateString();
      const newTasks = { ...scheduledTasks };
      if (!newTasks[dateStr]) {
        newTasks[dateStr] = [];
      }
      newTasks[dateStr].push({ text: inputs, done: false });
      setScheduledTasks(newTasks);
      setinputs("");
    }
  };

  const deleteitem = (date, index) => {
    const newTasks = { ...scheduledTasks };
    newTasks[date].splice(index, 1);
    if (newTasks[date].length === 0) {
      delete newTasks[date];
    }
    setScheduledTasks(newTasks);
  };

  const checkboxhandler = (date, index) => {
    const newTasks = { ...scheduledTasks };
    newTasks[date][index].done = !newTasks[date][index].done;
    setScheduledTasks(newTasks);
  };

  const handleZoomIn = () => {
    setzoom((prevZoom) => Math.min(prevZoom + 10, 200));
  };

  const handleZoomOut = () => {
    setzoom((prevZoom) => Math.max(prevZoom - 10, 50));
  };

  const zoomStyle = {
    transform: `scale(${zoom / 100})`,
  };

  const filteredItems = scheduledTasks[selectedDate.toDateString()]?.filter((item) =>
    item.text.toLowerCase().includes(searchData.toLowerCase())
  ) || [];

  return (
    <div>
      <h1>My TODO LIST</h1>
      <div style={zoomStyle}>
        <div id="zoom-buttons">
          <button onClick={handleZoomIn} id="zoomin">
            Zoom In
          </button>
          <button onClick={handleZoomOut} id="zoomout">
            Zoom Out
          </button>
        </div>
      </div>
      <div id="todolistbody">
        <label htmlFor="todo-input" id="taskenterlevel">
          ENTER THE ITEMS
        </label>
        <input
          id="todo-input"
          type="text"
          value={inputs}
          onChange={(e) => setinputs(e.target.value)}
        />
        <button onClick={additem} id="addbtn">
          ADD
        </button>
        <button onClick={() => setShowCalendar(!showCalendar)} id="calendarbtn">
          CALENDAR
        </button>
        {showCalendar && (
          <Calendar onChange={setSelectedDate} value={selectedDate} />
        )}
        <div>
          <label htmlFor="search-input">SEARCH ITEMS</label>
          <input
            id="search-input"
            type="text"
            value={searchData}
            onChange={(e) => setsearchData(e.target.value)}
          />
          <ul id="filtereddata">
            {filteredItems.map((item, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={() => checkboxhandler(selectedDate.toDateString(), index)}
                />
                <span>{item.text}</span>
                <button onClick={() => deleteitem(selectedDate.toDateString(), index)}>DELETE</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Todolist;
