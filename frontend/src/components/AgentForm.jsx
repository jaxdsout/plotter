import { Link } from "react-router-dom"

function AgentForm () {

    return (
        <div>
            <h3> sign up to use the platform </h3>
            <form>
                <label htmlFor='first_name'>First Name:</label>
                <input type='text' id='first_name' name='first_name' />   
                <label htmlFor='last_name'>Last Name:</label>
                <input type='text' id='last_name' name='last_name'/>   
                <label htmlFor='email'>Email:</label>
                <input type='email' id='email' name='email' />
                <label htmlFor='phone_number'>Phone Number:</label>
                <input type='tel' id='phone_number' name='phone_number' />     
                <label htmlFor='trec_id'>TREC ID:</label>
                <input type='number' id='trec_id' name='trec_id' />  
                <label htmlFor='password'>Password:</label>
                <input type='password' id='password' name='password' />   
                <button type="submit">SUBMIT</button>                
            </form>
            <h3>Already have an account? <Link to={"/login/"}>Login</Link></h3>
        </div>
    )
}

export default AgentForm