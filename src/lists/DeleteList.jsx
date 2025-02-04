import { Button, Popup } from 'semantic-ui-react';
import { useState } from 'react';
import { delete_list } from '../store/actions/listmaker';
import { load_lists } from '../store/actions/agent';
import { load_user } from '../store/actions/auth';
import { connect } from 'react-redux';

function DeleteList ( { delete_list, load_lists, list, handleCloseModal, user, load_user }) {
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const handleDeleteConfirm = (listID) => {
        setDeleteConfirm(listID);
    };

    const handleDelete = async (listID, userID) => {
        console.log(listID, "listID")
        await delete_list(listID)
        await load_user();
        setDeleteConfirm(null);
        handleCloseModal()
    }

    return (
        <>
            {deleteConfirm === list?.id ? (
                <Popup
                    content="CONFIRM DELETE"
                    open
                    position="top center"
                    size="tiny"
                    className='!text-red-700 !font-black text-center'
                    trigger={
                        <Button
                            type="submit"
                            color="red"
                            onClick={() => handleDelete(list.id, user.id)}
                        >
                            <i class="trash alternate icon !-mr-1"></i>
                        </Button>
                    }
                />
            ) : (
                <Button type="submit" color="red" onClick={() => handleDeleteConfirm(list.id)}>
                    <i class="trash alternate icon !-mr-1"></i>
                </Button>
            )
        }
    </>
    )


}

const mapStateToProps = (state) => ({
    error: state.auth.error,
    options: state.listmaker.options,
    user: state.auth.user
});

export default connect(mapStateToProps, { delete_list, load_lists, load_user })(DeleteList);
