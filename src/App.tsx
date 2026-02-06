import { Footer, NavBar, TaskList } from "./components";
import "./App.css";
import "./DefaultColors.css";
import "react-datepicker/dist/react-datepicker.css";
export function App() {
  
  return (
    <>
      <div className="AppPage" >
        <NavBar/>
        <div className="AppRightPanel">
          <TaskList/>
          <Footer/>
        </div>
      </div>
    </>
  );
}
