import { Button, Popup, Icon } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { delete_option, load_list } from '../store/actions/listmaker';
import { connect } from 'react-redux';

function DeleteOption ( { delete_option, load_list, option, list}) {
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const handleDeleteConfirm = (optionID) => {
        setDeleteConfirm(optionID);
    };

    const handleDelete = async (optionID, list) => {
        await delete_option(optionID, list.id);
        load_list(list.id);
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
                    position="left center"
                    size="tiny"
                    className='!text-red-700 !font-black'
                    trigger={
                        <button
                            type="submit"
                            className="p-3 bg-red-600 text-white rounded-lg mr-2 hover:bg-red-800"
                            onClick={() => handleDelete(option.id, list)}
                        >
                            <i className="trash alternate icon !-mr-1 !-ml-1"></i>
                        </button>
                    }
                />
            ) : (
                <div>
                    <button onClick={() => handleDeleteConfirm(option.id)} className="p-3 bg-[#2d2d2e] text-white rounded-lg mr-2 hover:bg-red-600">
                        <i className="trash alternate icon !-mr-1 !-ml-1"></i>
                    </button>
                </div>
            )}
        </>
    )


}

const mapStateToProps = (state) => ({
    error: state.auth.error,
    options: state.listmaker.options,
    list: state.listmaker.list,
});

export default connect(mapStateToProps, { delete_option, load_list })(DeleteOption);
