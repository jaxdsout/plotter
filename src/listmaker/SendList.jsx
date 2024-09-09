import { Button, Form } from "semantic-ui-react"
import { connect } from "react-redux";
import { update_list } from "../actions/listmaker";
import { set_send_mode } from "../actions/ui";

function SendList ({ user, client, list, update_list, set_send_mode, options }) {

    const handleSendList = async (e) => {
        e.preventDefault();
        console.log(user.id, client.id, list.id)
        await update_list(user.id, client.id, list, options);
        set_send_mode();
    }

    return (
        <>
            <Button type='submit' color='green' onClick={handleSendList}>SEND LIST</Button>
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

export default connect(mapStateToProps, { update_list, set_send_mode })(SendList);