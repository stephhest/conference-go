import Nav from "./Nav";
import AttendeesList from './AttendeesList'
import LocationForm from "./LocationForm";
import ConferenceForm from "./ConferenceForm";
import AttendeeForm from "./AttendConferenceForm";
import PresentationForm from "./PresentationForm";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AttendConferenceForm from "./AttendConferenceForm";
import MainPage from "./MainPage";

function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route index element={<MainPage />} />
          <Route path='/attendees/new' element={<AttendConferenceForm />}></Route>
          <Route path='/locations/new' element={<LocationForm />}></Route>
          <Route path='/conferences/new' element={<ConferenceForm />}></Route>
          <Route path='/presentations/new' element={<PresentationForm />}></Route>
          <Route path='/attendees' element={<AttendeesList attendees={props.attendees}/>}></Route>
          <Route path="*" element={<p>No page here!</p>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
