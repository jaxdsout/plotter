import { ReactComponent as Trash } from '../components/trash.svg';
import { Button, Popup } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { delete_option, load_options } from '../actions/listmaker';
import { connect } from 'react-redux';

function DeleteOption ( { delete_option, load_options, option, list}) {
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const handleDeleteConfirm = (optionID) => {
        setDeleteConfirm(optionID);
    };

    const handleDelete = async (optionID, list) => {
        await delete_option(optionID, list.id);
        load_options(list.id);
        setDeleteConfirm(null);
    };

    useEffect(() => {
        if (deleteConfirm) {
            const timer = setTimeout(() => setDeleteConfirm(null), 7000);
            return () => clearTimeout(timer);
        }
    }, [deleteConfirm]);

    return (
        <>
            {deleteConfirm === option.id ? (
                <Popup
                    content="CONFIRM DELETE"
                    open
                    position="top center"
                    size="tiny"
                    style={{ color: 'red', fontWeight: '700' }}
                    trigger={
                        <Button
                            type="submit"
                            color="red"
                            onClick={() => handleDelete(option.id, list)}
                        >
                            <Trash />
                        </Button>
                    }
                />
            ) : (
                <Button type="submit" onClick={() => handleDeleteConfirm(option.id)}>
                    <Trash />
                </Button>
            )}
        </>
    )


}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
    options: state.listmaker.options,
    list: state.listmaker.list,
});

export default connect(mapStateToProps, { delete_option, load_options })(DeleteOption);
