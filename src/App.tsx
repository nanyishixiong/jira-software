import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ProjectListScreen } from "./screens/project-list";
import { TestTSHook } from "test_hook";
import { LoginScreen } from "screens/login/login-screen";

function App() {
  return (
    <div className="App">
      <LoginScreen></LoginScreen>
    </div>
  );
}

export default App;
