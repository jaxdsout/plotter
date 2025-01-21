import { Button } from "semantic-ui-react"
import { connect } from "react-redux";
import { update_list } from "../store/actions/listmaker";
import { set_send_mode } from "../store/actions/ui";

function SendList ({ user, client, list, update_list, set_send_mode, options }) {

    const handleSendList = async (e) => {
        e.preventDefault();
        await update_list(user.id, client.id, list, options);
        set_send_mode();
    }

    return (
        <>
            <Button className="drop-shadow" type='submit' color='green' onClick={handleSendList}>SEND LIST</Button>
        </>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user,
    error: state.auth.error,
    client: state.listmaker.client,
    list: state.listmaker.list,
    options: state.listmaker.options,
});

export default connect(mapStateToProps, { update_list, set_send_mode })(SendList);