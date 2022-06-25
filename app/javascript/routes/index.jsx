import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Home} from "../components/Home";
import SignIn from "../components/SignIn/SignIn";

export const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<SignIn/>} />        


      </Routes>
    </BrowserRouter>
  )
}


//<Route path="/signup" element={SignUp}/>
//<Route path="/dashboard" element={Dashboard}/>
//<Route path="/dashboard/addFriend" element={AddFriend}/>
//<Route path="/dashboard/chat" element={Chat}/>
//<Route path="/badAuth" element={BadAuthError}/>
