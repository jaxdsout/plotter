

function ListDetail({ list }) {

    console.log(list.client_name)
    
    return(
        <>
            <p>{list.client_name}</p>
        </>
    )
}

export default ListDetail