import "./App.css";
import { useState } from "react";
import List from "./component/list";

function App() {


  return (
    <>
      <div className="app">
        <div className="heading">
          <h1>[todo list]</h1>
        </div>
        <List />
      </div>
    </>
  );
}

export default App;
