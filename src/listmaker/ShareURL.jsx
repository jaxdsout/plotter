import { connect } from "react-redux";
import { Form, FormField, Input } from "semantic-ui-react";

function ShareURL ({ list, isSendMode }) {

    const link = `localhost:3000/list/${list.uuid}`

    return (
        <>
        {isSendMode ? (
            <Form>
                <FormField>
                    <label>Shareable URL</label>
                    <Input value={link} readOnly />
                </FormField>
            </Form>
        ) : (
            <></>
        )}
        </>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    error: state.auth.error,
    list: state.listmaker.list,
    isSendMode: state.ui.isSendMode
});

export default connect(mapStateToProps, {  })(ShareURL);