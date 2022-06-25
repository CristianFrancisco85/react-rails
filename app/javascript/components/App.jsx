import React, { useState } from "react";
import {RoutesComponent} from "../routes/index";
import {GlobalContext} from '../contexts/globalContext'

export const App = () =>  {

    let auxuser = JSON.parse(sessionStorage.getItem('user'))
    const [user,setUser] = useState(auxuser?auxuser:{})
  
    const globalState = {
      loggedUser : [user,setUser]
    }
  
    return (
      <>

        <GlobalContext.Provider value={globalState}>
            <RoutesComponent/>
        </GlobalContext.Provider>
  
      </>
    )
  
  }
  