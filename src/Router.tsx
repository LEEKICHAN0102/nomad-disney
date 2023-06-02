import { createBrowserRouter } from "react-router-dom";
import App from "./App"
import Home from "./routes/Home";
import Detail from "./routes/Detail";

const Router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
    children:[
      {
        path:"",
        element:<Home />
      },
      {
        path:"character/:id",
        element:<Detail />
      }
    ]
  }
]);

export default Router;
