import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { DocumentForm } from "./components/DocumentForm";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { PrivateRoute } from "./components/PrivateRoute";
import axios from "axios";

// axios configuration
axios.defaults.baseURL = "http://localhost:3001";

axios.interceptors.request.use(function (config) {
  config.headers.Authorization = localStorage.token;
  return config;
});

function App() {
  return (
    <div className="container p-2">
      <div className="mb-4">
        <Navbar heading="Xendit Trial" />
      </div>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <PrivateRoute path="/add" component={DocumentForm} />
          <PrivateRoute
            path="/edit/:id"
            component={DocumentForm}
            isEdit={true}
          />
          <PrivateRoute path="/" component={Home} />
        </Switch>
      </Router>
      {/* <SignUp /> */}
      {/* <DocumentForm /> */}
      {/* <DocumentTable
        documents={[
          {
            name: "John",
            email: "johndoe@email.com",
            address: "Street 5",
            phone: "7799987",
            ktpNumber: 1223,
            npwpNumber: 2232,
            passportNumber: "A8332389",
          },
          {
            name: "John",
            email: "johndoe@email.com,",
            address: "Street 5",
            phone: "7799987",
            ktpNumber: 1223,
            npwpNumber: 2232,
            passportNumber: "A8332389",
          },
        ]}
      /> */}
    </div>
  );
}

export default App;
