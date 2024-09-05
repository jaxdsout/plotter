import { connect } from "react-redux";
import { Form, FormField, Input } from "semantic-ui-react";

function ShareURL ({ list }) {

    console.log(list.uuid, "list")
    const link = `localhost:3000/list/${list.uuid}`
    return (
        <>
            <Form>
                <FormField inline>
                    <label>Shareable URL</label>
                    <Input value={link} readOnly />
                </FormField>
            </Form>
        </>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    error: state.auth.error,
    list: state.listmaker.list
});

export default connect(mapStateToProps, {  })(ShareURL);