import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ProjectListScreen } from "./screens/project-list";
import { TestTSHook } from "test_hook";

function App() {
  return (
    <div className="App">
      <TestTSHook></TestTSHook>
    </div>
  );
}

export default App;
