import { Link } from "react-router-dom"

function LoginForm ({ handleChange, handleSubmit}) {

    return (
        <div className="loginsignup_shell">
            <h3> sign into the platform </h3>
            <div className="loginsignup_form">
                <form onSubmit={handleSubmit}>
                    <label htmlFor='email'>Email:</label>
                    <input type='email' id='email' name='email' onChange={handleChange}/>
                    <label htmlFor='password'>Password:</label>
                    <input type='password' id='password' name='password' onChange={handleChange}/> 
                    <button className="nav_button" type="submit">LOGIN</button>     
                    <h3>Don't have an account? <Link to={"/signup/"}>Signup</Link></h3>           
                </form>
            </div>
        </div>
    )
}

export default LoginForm