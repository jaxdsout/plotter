import { Divider, Button, Input, TextArea } from "semantic-ui-react";
import { useState, useEffect } from "react";
import PropertySearch from "../listmaker/PropertySearch";
import ClientSearch from "../listmaker/ClientSearch";
import { connect } from "react-redux";
import { new_guest_card } from "../store/actions/agent";
import { reset_guest_card } from "../store/actions/ui";

function GuestCard ({ client, property, user, new_guest_card, reset_guest_card }) {
    const [msgHover, setMsgHover] = useState(false);
    const [formData, setFormData] = useState({
        agent: null,
        client: null,
        property: null,
        msg: null,
        interested: '',
        move_by: ''
    });

    const { msg, interested, move_by } = formData;

    
    useEffect(() => {
        if (user) {
            setFormData(prevFormData => ({
                ...prevFormData,
                agent: user.id
            }));
        }

        if (property) {
            setFormData(prevFormData => ({
                ...prevFormData,
                property: property.id
            }));
        }

        if (client) {
            setFormData(prevFormData => ({
                ...prevFormData,
                client: client.id
            }));
        }
    }, [user, property, client]);


    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (client && property) {
            console.log("Submitting guest card with:", formData);  // Debugging log
            await new_guest_card(property.id, user.id, client.id, msg, interested, move_by);
            handleResetCard();
        } else {
            console.error("Client or property not selected.");
        }
    };

    const handleResetCard = () => {
        setFormData({
            agent: user.id,
            property: null,
            client: null, 
            msg: null,
            interested: '',
            move_by: ''
        });
        reset_guest_card();

    };

    return (
        <div className="w-11/12 mt-5 mb-10 flex flex-col items-center justify-center bg-[#26282B] rounded-lg shadow-md shadow-inner">
            <div className="mt-4 mb-2 flex flex-col items-center">
                <h4 className='text-center text-white'>Send Guest Card</h4>
            </div>
            <div className="flex flex-col lg:flex-row justify-center">
                <div className="p-3 text-center">
                    <ClientSearch />
                    <div className="mt-5">
                        {formData.client !== null && client !== null ? (
                            <Button size="tiny" color="black" disabled>CLIENT SELECTED</Button>
                        ) : (
                            <>
                            </>
                        )}
                    </div>
                </div>
                <div className="p-3 text-center">
                    <PropertySearch />
                    <div className="mt-5">
                        {formData.property !== null && property !== null ? (
                            <Button size="tiny" color="black" disabled>PROPERTY SELECTED</Button>
                        ) : (
                            <>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Divider />
            {formData.property && formData.client ? (
                <>
                    <div className="text-white">
                        <div className="text-black p-7 rounded-lg bg-gradient-to-b from-[#FFFFFF] to-[#fbfbfb] shadow-inner shadow-md">
                            <p>Hey team,</p>
                            <div
                                onMouseOver={() => setMsgHover(true)} 
                                onMouseOut={() => setMsgHover(false)}
                                className="w-[300px]"
                            >
                                {msgHover ? (
                                    <TextArea
                                        name='msg'
                                        value={msg}
                                        onChange={handleChange}
                                        size="huge"
                                        placeholder="Enter custom message here."
                                        className="ms-3 !w-[290px]"
                                    />
                                ) : (
                                    <>
                                        {!msg ? (
                                            <p>Below is the guest card info for my client. Please let me know if there are any issues.</p>
                                        ) : (
                                            <p>{msg}</p>
                                        )}
                                    </>

                                )}
                            </div>
                    
                            <div className="indent-5">
                                <ul>
                                    <li className="mt-3"><strong>Name:</strong> {client?.name} </li>
                                    <li className="mt-3"><strong>Phone:</strong> {client?.phone_number}</li>
                                    <li className="mt-3"><strong>Email:</strong> {client?.email}</li>
                                    <li className="mt-3">
                                        <label htmlFor="interested"><strong>Interested In:</strong></label>
                                        <Input
                                            name="interested"
                                            value={interested}
                                            onChange={handleChange}
                                            size="small"
                                            className="ms-3 !w-[100px] !h-[30px]"
                                        />
                                    </li>
                                    <li className="mt-3">
                                        <label htmlFor="move_by"><strong>Move By:</strong></label>
                                        <Input
                                            name="move_by"
                                            value={move_by}
                                            onChange={handleChange}
                                            size="small"
                                            className="ms-3 !w-[125px] !h-[30px]"
                                        />
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-5">
                                <p>Best,</p>
                                <p>{user?.first_name} {user?.last_name}</p>
                                <p>{user?.profile?.phone_number}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end mt-6 mb-3">
                        <Button color="green" onClick={handleSubmit}>SEND TO {property?.name.toUpperCase()}</Button>
                    </div>
                    <div className="flex justify-end mt-3 mb-6">
                        <Button color="red" onClick={handleResetCard} size="tiny" inverted>RESET</Button>
                    </div>
                </>
            ) : (
                <div className="text-center text-white mb-6">
                    <p>Please select both client and property to proceed.</p>

                </div>   
            )}
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user,
    error: state.auth.error,
    property: state.listmaker.property,
    client: state.listmaker.client
});

export default connect(mapStateToProps, { new_guest_card, reset_guest_card })(GuestCard);
