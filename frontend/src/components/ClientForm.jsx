import { useState } from "react";

function ClientForm () {
    const [clientForm, setClientForm] = useState({
        name: '',
        email: '',
        phone_number: ''
      }); 
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setClientForm(prevState => ({...prevState, [name]: value}));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(clientForm);
    };

    return (
        <div>
            <p>WE MAKING CLIENTS</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor='name'>Name:</label>
                <input type='text' id='name' name='name' value={clientForm.name} onChange={handleChange} autoComplete="off" />
                <label htmlFor='email'>Email:</label>
                <input type='email' id='email' name='email' value={clientForm.email} onChange={handleChange} autoComplete="off" />
                <label htmlFor='phone_number'>Phone Number:</label>
                <input type='tel' id='phone_number' name='phone_number' value={clientForm.phone_number} onChange={handleChange} />
                {/* <input type='hidden' id='agent' name='agent' /> */}
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default ClientForm