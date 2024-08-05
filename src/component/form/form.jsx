import { useEffect, useState } from "react";
import Button from "../button";
import Input from "../input";
import Select from "../select";
import "./style.css";
export default function Form({
  onClick,
  handleSubmit,
  values,
  setValues,
  buttonType,
}) {
  const onChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };
  const options = ["incomplete", "completed"];
  useEffect(() => {
    !values.status && setValues({ ...values, ["status"]: options[0] });
  }, []);

  return (
    <>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="form-heading">
          <h1>[add task]</h1>
        </div>
        <div className="form-content">
          <h3>title</h3>
          <Input
            type="text"
            name="task"
            placeholder="enter you task"
            value={values.task}
            onChange={onChange}
          />
        </div>

        <div className="form-content">
          <h3>status</h3>
          <Select
            options={options}
            name="status"
            setValues={setValues}
            values={values}
            status={values.status}
          />
        </div>
        <div className="form-btn">
          <Button type={buttonType} text="add task" onClick={handleSubmit} />
          <Button
            type="button"
            text="cancel"
            className="delete toggleForm"
            onClick={onClick}
          />
        </div>
      </form>
    </>
  );
}
