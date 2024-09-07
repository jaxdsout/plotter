import { Button, Form } from "semantic-ui-react"
import { connect } from "react-redux";
import { add_list_uuid } from "../actions/listmaker";
import { set_send_mode } from "../actions/ui";

function SendList ({ user, client, list, add_list_uuid, set_send_mode, options }) {

    const handleSendList = async (e) => {
        e.preventDefault();
        console.log(user.id, client.id, list.id)
        await add_list_uuid(user.id, client.id, list, options);
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
    list: state.listmaker.list,
    options: state.listmaker.options,
});

export default connect(mapStateToProps, { add_list_uuid, set_send_mode })(SendList);