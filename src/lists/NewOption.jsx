function NewOption () {
    return(
        <>
          <div className="list_assigner">
                <form>
                    {/* VERSION: LOGIC (if version > 0... +1) */}
                    {/* CREATION DATE: LOGIC inherit */}
                    {/* AGENT: RETRIEVE FROM TOKEN */}
                    <label htmlFor="client">Client:</label>
                        <select id="client" name="client">
                            <option value="">Select Client</option>
                            <option value="client1">Client 1</option>
                        </select>       
                    <button className='nav_button' type='submit'>SET</button>         
                </form> 
            </div>
            <div className="mapbox_search">
                <form>
                    <label htmlFor="property_search">Property Search  <input type='search' id='property_search' name='property_search' /></label>
                    {/* PROPERTY_NAME:  */}
                    {/* ADDRESS */}
                    {/* GEO LOCATION */}
                    <button className='nav_button' type='submit'>SEARCH</button>         
                </form> 
            </div>
            <div className="option_details">
                <form>
                    <label htmlFor="price">Price  <input id='price' name='price' /></label>
                    <label htmlFor="unit_number">Unit #  <input id='unit_number' name='unit_number' /></label>
                    <label htmlFor="layout">Layout  <input id='layout' name='layout' /></label>
                    <label htmlFor="sq_ft">Square Feet  <input id='sq_ft' name='sq_ft' /></label>
                    <label htmlFor="date_available">Date Available  <input id='date_available' name='date_available'/></label>
                    <label htmlFor="notes_specials">Notes / Specials  <input id='notes_specials' name='notes_specials'/></label>
                    {/* LIST: LOGIC comes from above */}
                    <button className='nav_button' type='submit'>ADD OPTION</button>         
                </form> 
            </div>
        </>
    )
}

export default NewOption();