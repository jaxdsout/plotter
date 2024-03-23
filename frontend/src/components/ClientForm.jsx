

function ClientForm ({ clientForm, handleChange, handleSubmit }) {

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