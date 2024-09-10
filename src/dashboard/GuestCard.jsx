import { Search, Form, FormField, Modal, Button } from "semantic-ui-react";
import { useState } from "react";


/*
first search for client
then set client
then search for property
then set property
then open large input form with preloaded guest card info from client AND email from property
allow user to edit input
then submit to property using backend request
*/


function GuestCard () {
    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return(
        <>

            <div>
                <Button onClick={handleOpenModal}>SEND GUEST CARD</Button>
            </div>
            <div className="bg-body-secondary">
                <Modal open={showModal} onClose={handleCloseModal}>
                    <Modal.Header>Send Guest Card</Modal.Header>
                    <Modal.Content>
            <Form>
                <Search />
                <FormField>

                </FormField>
            </Form>
            </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={handleCloseModal}>CLOSE</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        </>
    )
}

export default GuestCard;
