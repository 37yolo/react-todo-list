import { createContext, useContext, useEffect, useState } from "react";
import Button from "../button";
import Select from "../select";
import Form from "../form";
import "./style.css";
import Toast from "../toast/toast";

export default function List() {
  const [toaster, setToaster] = useState({
    isOpen: false,
    message: "",
    className: "",
  });
  const [values, setValues] = useState({ task: "", status: "" });
  const [openForm, setOpenForm] = useState(false);
  const [taskData, setTaskData] = useState([]);
  const [buttonType, setButtonType] = useState("submit");
  const [editingIndex, setEditingIndex] = useState();
  const [filter, setFilter] = useState("all");
  const options = ["all", "incomplete", "completed"];

  const handleOpenClose = (e) => {
    if (e.target.classList.contains("toggleForm"))setOpenForm(!openForm);
    if(!openForm){
      document.body.classList.add("diable-scroll")
      setButtonType("submit");
      setValues({ task: "", status: "" });
    }else{
      document.body.classList.remove("diable-scroll");
    }
  };

  const handleSubmit = () => {
    if (values.task === "") {
      setToaster({
        ...toaster,
        ["isOpen"]: true,
        ["message"]: "please enter your task",
        ["className"]: "red",
      });
    } else {
      if (buttonType === "submit") {
        setTaskData((prev) => [...prev, values]);
        setToaster({
          ...toaster,
          ["isOpen"]: true,
          ["message"]: "your task has been added",
          ["className"]: "blue",
        });
      } else {
        setTaskData((prev) =>
          prev.map((item, index) =>
            index === editingIndex ? { ...values } : item
          )
        );
        setToaster({
          ...toaster,
          ["isOpen"]: true,
          ["message"]: "your task has been edited",
          ["className"]: "blue",
        });
      }
    }
  };

  const handleAction = (e) => {
    const me = Number(e.currentTarget.id);

    if (e.target.className === "delete") {
      setTaskData((perv) => perv.filter((item, index) => index !== me));
      setToaster({
        ...toaster,
        ["isOpen"]: true,
        ["message"]: "your task has been deleted",
        ["className"]: "red",
      });
    }
    if (e.target.className === "edit") {
      setEditingIndex(Number(e.currentTarget.id));
      setButtonType("button");
      setOpenForm(true);
      setValues(taskData.filter((item, index) => index === me)[0]);
    }

    if (e.target.type === "checkbox") {
      e.target.checked === true
        ? setTaskData((prev) =>
            prev.map((item, index) =>
              index === me ? { ...item, ["status"]: "completed" } : item
            )
          )
        : setTaskData((prev) =>
            prev.map((item, index) =>
              index === me ? { ...item, ["status"]: "incomplete" } : item
            )
          );
    }
  };

  const filteredData =
    filter === "all"
      ? taskData
      : taskData.filter((item) => item.status === filter);

  useEffect(() => {
    const data = localStorage.getItem("todoList");
    if (data !== null) setTaskData(JSON.parse(data));
  }, []);

  useEffect(() => {
    setOpenForm(false);
    setTimeout(() => {
      localStorage.setItem("todoList", JSON.stringify(taskData));
    }, 1000);
  }, [taskData]);

  useEffect(() => {
    setTimeout(() => {
      toaster.isOpen && setToaster({ ...toaster, ["isOpen"]: false });
    }, 3000);
  }, [toaster]);
  return (
    <>
      {toaster.isOpen && (
        <div onClick={() => setToaster({ ...toaster, ["isOpen"]: false })}>
          <Toast toaster={toaster} />
        </div>
      )}
      <div className="container">
        <div className="top">
          <div>
            <Button
              onClick={handleOpenClose}
              type="button"
              className="toggleForm"
              text="add"
            />
          </div>
          <Select options={options} className="filter" setFilter={setFilter} />
        </div>
        <div className="mid">
          <div className="display">
            {taskData.length ? (
              filteredData.map((item, index) => (
                <div
                  key={index}
                  id={index}
                  className="card"
                  onClick={handleAction}
                >
                  <div>
                    <input
                      type="checkbox"
                      checked={item.status === "completed" && true}
                      readOnly
                    ></input>
                    <p className={item.status}>{item.task}</p>
                  </div>

                  <div className="actionBtn">
                    <Button type="button" className="edit" text="edit" />
                    <Button type="button" className="delete" text="del" />
                  </div>
                </div>
              ))
            ) : (
              <div className="card empty">no task</div>
            )}
          </div>
          {openForm && (
            <div className="overlay">
              <div className="modal toggleForm" onClick={handleOpenClose}>
                <Form
                  buttonType={buttonType}
                  handleSubmit={handleSubmit}
                  setValues={setValues}
                  values={values}
                  onClick={handleOpenClose}
                  setTaskData={setTaskData}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
