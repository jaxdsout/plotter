import { connect } from "react-redux";
import { Form, FormField, Input, Message } from "semantic-ui-react";
import { useState } from "react";

function ShareURL ({ list, isSendMode }) {
    const [copied, setCopied] = useState(false)
    const link = `localhost:3000/list/${list.uuid}`

    const handleCopy = () => {
        navigator.clipboard.writeText(link)
            .then(() => {
                setCopied(true)
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(err => {
                console.error('Failed to copy: ', err)
            })
    }

    return (
        <>
            {isSendMode ? (
                <Form>
                    { copied && (
                        <Message positive>
                            <Message.Header>Link copied to clipboard!</Message.Header>
                        </Message>
                    )}
                    <FormField>
                        <label>Shareable URL</label>
                        <Input value={link} readOnly onClick={handleCopy} />
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

export default connect(mapStateToProps, {})(ShareURL);