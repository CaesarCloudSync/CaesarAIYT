import React from 'react'
import {
    HashRouter,
    Route,Routes
  } from "react-router-dom";
import Home from './components/Home';

import "./index.css"
import PlaylistSongs from './components/playlistsongs';
export default function App(){
  
    return(
        <HashRouter>
            <Routes>
                <Route path="/" element={ <Home/> } />
                <Route path="/playlistsongs" element={ <PlaylistSongs/> } />


            </Routes>
        
        </HashRouter>
    )

}

/**
 *            
 */