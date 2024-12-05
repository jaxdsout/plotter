import { Button, Popup } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { delete_deal, load_deals } from '../actions/agent';
import { connect } from 'react-redux';

function DeleteDeal({ delete_deal, load_deals, deal, handleCloseModal, user }) {
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    console.log(deal, "deal")
    console.log(deal.id, "dealID")
    const handleDeleteConfirm = (dealID) => {
        setDeleteConfirm(dealID);
    };

    const handleDelete = async (dealID, userID) => {
        await delete_deal(dealID);
        await load_deals(userID);
        setDeleteConfirm(null);
        handleCloseModal();
    
    };

    useEffect(() => {
        if (deleteConfirm) {
            const timer = setTimeout(() => setDeleteConfirm(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [deleteConfirm]);

    return (
        <>
        {deleteConfirm === deal.id ? (
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
                        onClick={() => handleDelete(deal.id, user.id)}
                    >
                        <i class="trash alternate icon"></i>
                    </Button>
                }
            />
        ) : (
            <Button type="submit" color="red" onClick={() => handleDeleteConfirm(deal.id)}>
                <i class="trash alternate icon"></i>
            </Button>
        )
    }
</>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
    user: state.auth.user,
});

export default connect(mapStateToProps, { delete_deal, load_deals })(DeleteDeal); 
