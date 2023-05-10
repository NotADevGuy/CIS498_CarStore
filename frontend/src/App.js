// Necessary system imports
import {createContext, useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

// Import all the components here
import {Home} from "./Components/Home/Home";
import {NavBar} from "./Components/NavBar/NavBar";
import {Login} from "./Components/Login/Login";
import {Register} from "./Components/Register/Register";
import {Reset} from "./Components/Reset/Reset";
import {Search} from "./Components/Search/Search";
import {AddCar} from "./Components/AddCar/AddCar";

// Create user context
export const UserContext = createContext();

function App() {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user498');
        return storedUser ? JSON.parse(storedUser) : {};
    })

    const [logged, setLogged] = useState(() => {
        const storedLogged = localStorage.getItem('logged498');
        return storedLogged ? JSON.parse(storedLogged) : false;
    })

    useEffect(() => {
        localStorage.setItem('logged498', JSON.stringify(logged));
        localStorage.setItem('user498', JSON.stringify(user));
    }, [user, logged]);


    const loggedInRoutes = (
        <>
            <Route path="/" element={<Home/>}/>
            <Route path="home" element={<Home/>}/>
            <Route path="add_car" element={<AddCar/>}/>
            <Route path="search" element={<Search/>}/>
        </>
    )

    const loggedOutRoutes = (
        <>
            <Route path="/" element={<Login/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="reset" element={<Reset/>}/>
            <Route path="register" element={<Register/>}/>
        </>
    )

    return (
        <UserContext.Provider value={{user, setUser, logged, setLogged}}>
            <BrowserRouter basename="/">
            <div className="App h-100">
                {logged && (
                    <div className="row vh-25">
                        <NavBar/>
                    </div>
                )}
                <div className="row vh-75">
                    <Routes>
                        {logged ? loggedInRoutes : loggedOutRoutes}
                    </Routes>
                </div>
            </div>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;
