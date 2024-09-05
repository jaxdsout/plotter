import { Button, Form } from "semantic-ui-react"
import { connect } from "react-redux";
import { add_list_uuid, set_send_mode } from "../actions/listmaker";

function SendList ({ user, client, list, add_list_uuid, set_send_mode }) {

    const handleSendList = async (e) => {
        e.preventDefault();
        console.log(user.id, client.id, list.id)
        await add_list_uuid(user.id, client.id, list.id);
        set_send_mode();
    }

    return (
        <>
            <Form onSubmit={handleSendList}>
                <Button type='submit' color='green'>SEND LIST</Button>
            </Form>
        </>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    error: state.auth.error,
    client: state.listmaker.client,
    list: state.listmaker.list
});

export default connect(mapStateToProps, { add_list_uuid, set_send_mode })(SendList);