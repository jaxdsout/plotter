

function PropDetail ({ propSel }) {
    return (
        <div className="text-black">
            <p>{propSel.name}</p>
            <p className="text-xs text-gray-500 text-nowrap">{propSel.address} | {propSel.neighborhood}</p>
            <p>Last Updated: {propSel.commission.updated_date}</p>
            <table>
                <thead className="text-gray-500 bg-[#1f2124] text-xs">
                    <th className="text-left p-2">
                        Send
                    </th>
                    <th className="text-left p-2">
                        Escort 
                    </th>
                    <th className="text-left text-wrap sm:text-nowrap p-2">
                        Flat Fee
                    </th>
                </thead>
                <tbody>
                    <tr className="font-bold text-black bg-gray-100 transition text-center ">
                        <td className="p-1 text-[0.7rem] sm:text-base">{propSel.commission.send}%</td>
                        <td className="p-1 text-[0.7rem] sm:text-base">{propSel.commission.escort}%</td>
                        <td className="p-1 text-[0.7rem] sm:text-base">${propSel.commission.flat_fee}</td>
                    </tr>
                </tbody>
            </table>
            <a href={`${propSel.website}`} >Website</a>
        </div>
    )
}

export default PropDetail