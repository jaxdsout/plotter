
function LoginForm () {

    return (
        <div>
            <form>
                <label htmlFor='email'>Email:</label>
                <input type='email' id='email' name='email' />
                <label htmlFor='password'>Password:</label>
                <input type='password' id='password' name='password' /> 
                <button type="submit">LOGIN</button>                
            </form>
        </div>
    )
}

export default LoginForm