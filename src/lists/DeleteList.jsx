import { ReactComponent as Trash } from '../components/trash.svg';
import { Button, Popup } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { delete_list } from '../actions/listmaker';
import { load_lists } from '../actions/agent';
import { connect } from 'react-redux';

function DeleteList ( { delete_list, load_lists, list, handleCloseModal}) {
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const handleDeleteConfirm = (optionID) => {
        setDeleteConfirm(optionID);
    };

    const handleDelete = async (list) => {
        if (list) {
            const listID = list.id;
            await delete_list(listID)
            await load_lists(listID)
            setDeleteConfirm(null);
            handleCloseModal()
        }
    }

    useEffect(() => {
        if (deleteConfirm) {
            const timer = setTimeout(() => setDeleteConfirm(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [deleteConfirm]);

    return (
        <>
            {deleteConfirm === list.id ? (
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
                            onClick={() => handleDelete(list.id, list)}
                        >
                            <Trash />
                        </Button>
                    }
                />
            ) : (
                <Button type="submit" color="red" onClick={() => handleDeleteConfirm(list.id)}>
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

export default connect(mapStateToProps, { delete_list, load_lists })(DeleteList);
