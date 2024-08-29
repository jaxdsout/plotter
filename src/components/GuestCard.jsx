import { Search, Form, FormField, Modal, Button } from "semantic-ui-react";
import { useState } from "react";


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
