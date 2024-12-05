import { Button, Popup } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { delete_list } from '../actions/listmaker';
import { load_lists } from '../actions/agent';
import { connect } from 'react-redux';

function DeleteList ( { delete_list, load_lists, list, handleCloseModal, user }) {
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const handleDeleteConfirm = (listID) => {
        setDeleteConfirm(listID);
    };

    const handleDelete = async (listID, userID) => {
        console.log(listID, "listID")
        await delete_list(listID)
        await load_lists(userID)
        setDeleteConfirm(null);
        handleCloseModal()
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
                    className='!text-red-700 !font-black'
                    trigger={
                        <Button
                            type="submit"
                            color="red"
                            onClick={() => handleDelete(list.id, user.id)}
                        >
                            <i class="trash alternate icon"></i>
                        </Button>
                    }
                />
            ) : (
                <Button type="submit" color="red" onClick={() => handleDeleteConfirm(list.id)}>
                    <i class="trash alternate icon"></i>
                </Button>
            )
        }
    </>
    )


}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
    options: state.listmaker.options,
    user: state.auth.user
});

export default connect(mapStateToProps, { delete_list, load_lists })(DeleteList);
