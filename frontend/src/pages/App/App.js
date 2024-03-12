import { Route, Routes } from "react-router-dom";
import SignIn from '../SignInPage/SignIn';
import SignUp from '../SignUpPage/SignUp';

const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<SignUp/>}/> // Define the sign-up page as the root URL
                <Route path='/sign-in' element={<SignIn/>}/>
                {/* You can keep other routes for different pages */}
            </Routes>
        </div>
    );
}

export default App;