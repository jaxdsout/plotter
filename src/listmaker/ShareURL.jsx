import { connect } from "react-redux";
import { Form, FormField, Input, Message, Button } from "semantic-ui-react";
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

    const handleOpenURL = () => {
        if (list.uuid) {
            const fullURL = `${window.location.origin}/list/${list.uuid}`;
            window.open(fullURL, '_blank');
        }
    };

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
                        <Input 
                            value={link} readOnly onClick={handleCopy} 
                            className="!w-[20rem] !border-none pr-4" />
                        <Button onClick={handleOpenURL}>
                            <i class="external alternate icon !-mr-1"></i>
                        </Button>
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