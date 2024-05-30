import { useState } from "react";
import axios from "axios";
const api_url = process.env.REACT_APP_APIURL

function ClientForm () {

    // console.log(agent.id)

    const [newClient, setNewClient] = useState({
        name: '',
        email: '',
        phone_number: '',
        // agent: agent.id,
      }); 

    const handleChange = (e) => {
        setNewClient({ ...newClient, [e.target.name]: e.target.value });
    };

    const handleNewClient = async (e) => {
        e.preventDefault();
        console.log("apiurl", api_url)
        console.log("newclient",newClient)
        try {
          const response = await axios.post(`${api_url}/plotter/clients/`, newClient, {
              headers: {
                  'Content-Type': 'application/json'
              }
          });
          if (response.status === 201) {
              console.log('Client registered successfully');
          } else {
              console.error('Error:', response.data);
          }
      } catch (error) {
          console.error('Error:', error.message);
      }
    }
    
    return (
        <div className="form_shell">
            <p>WE MAKING CLIENTS</p>
            <form onSubmit={handleNewClient} method="POST" className="new_client">
                <label htmlFor='name'>Name:</label>
                <input type='text' id='name' name='name' value={newClient.name} onChange={handleChange} />
                <label htmlFor='email'>Email:</label>
                <input type='email' id='email' name='email' value={newClient.email} onChange={handleChange} />
                <label htmlFor='phone_number'>Phone Number:</label>
                <input type='tel' id='phone_number' name='phone_number' value={newClient.phone_number} onChange={handleChange}/>
                <button className="nav_button" type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default ClientForm