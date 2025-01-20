import UpdateOption from "./UpdateOption";
import DeleteOption from "./DeleteOption";
import { List, Popup } from "semantic-ui-react";

function OptionDetail ({ option }) {
    const formatDate = (datetimeStr) => {
        const dateObj = new Date(datetimeStr);
        return dateObj.toLocaleString('default', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
        }).replace(',', '/');
    };
    
    return (
        <div key={option.id} className="flex justify-between items-center">
        <div className="flex flex-row items-center justify-center">
            <Popup
                content={
                    <List>
                        {option.price === null ? (
                            <p>No details added yet.</p>
                        ) : (
                            <>
                                <List.Item>${option.price}</List.Item>
                                <List.Item>Unit {option.unit_number}</List.Item>
                                <List.Item>{option.layout}; {option.sq_ft} sq. ft.</List.Item>
                                <List.Item>Available: {formatDate(option.available)}</List.Item>
                                <List.Item>{option.notes}</List.Item>
                            </>
                        )}
                    </List>
                }
                trigger={<i className="ellipsis horizontal icon text-center"></i>}
            />
            <h4 className="pl-2 mt-1">{option.prop_name}</h4>
        </div>
        <div className="flex justify-center">
            <UpdateOption option={option} />
            <DeleteOption option={option} />
        </div>
    </div>
    )
}

export default OptionDetail