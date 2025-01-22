import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { update_deal, load_deal } from "../store/actions/agent";
import { Button, Form, FormField, Divider, Checkbox } from "semantic-ui-react";
import { reset_deal_mode } from "../store/actions/ui";

function EditDeal ({ dealID, user, load_deal, deal, isDealMode, update_deal, reset_deal_mode }) {
    const [flatFee, setFlatFee] = useState(false);

    const [formData, setFormData] = useState({
        rent: '',
        rate: '',
        commission: '',
        flat_fee: '',
        move_date: '',
        unit_no: '',
        lease_term: '',
    }); 

    const { unit_no, move_date, lease_term, rent, rate, flat_fee, commission } = formData;

    const handleFlatFee = () => {
        if (flatFee) { setFlatFee(false) } else { setFlatFee(true) }
    }

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isDealMode) {
            console.log(deal.id, deal.property, user.id, deal.client, unit_no, move_date, lease_term, rent, rate, flat_fee, commission)
            await update_deal(deal.id, deal.property, user.id, deal.client, unit_no, move_date, lease_term, rent, rate, flat_fee, commission);
            await reset_deal_mode()
            await handleResetDeal();
        }
    };

    const handleResetDeal = async () => {
        setFormData({
            rent: '',
            rate: '',
            commission: '',
            flat_fee: '',
            move_date: '',
            unit_no: '',
            lease_term: '',
        });
        setFlatFee(false);
    }

    useEffect(() => {
        if (user) {
            setFormData(prevFormData => ({
                ...prevFormData,
                agent: user.id
            }));
        }
    }, [user]);


    useEffect(() => {
        if (deal) {
            setFormData({
                rent: deal.rent || '',
                rate: deal.rate || '',
                commission: deal.commission || '',
                flat_fee: deal.flat_fee || '',
                move_date: deal.move_date || '',
                unit_no: deal.unit_no || '',
                lease_term: deal.lease_term || '',
            });
        }
    }, [deal]);


    useEffect(() => {
        if (dealID) {
            load_deal(dealID);
        }
    }, [dealID, load_deal])


    // useEffect(() => {
    //     if (flatFee) {
    //         setFormData((prevFormData) => ({ ...prevFormData, rate: '' }));
    //         setFormData((prevFormData) => ({ ...prevFormData, flat_fee: deal?.flat_fee }));
    //     } else {
    //         setFormData((prevFormData) => ({ ...prevFormData, flat_fee: '' }));
    //         setFormData((prevFormData) => ({ ...prevFormData, rate: deal?.rate }));
    //     }
    // }, [flatFee, rate, rent, flat_fee, deal]);
    
    return (
        <div>
            <Form>
                <div className="flex flex-row items-center justify-center">
                    <FormField className="pr-3">
                        <label htmlFor='client'>Client:</label>
                        <input
                            type='text'
                            className="!bg-[#eeeeee] select-none pointer-events-none"
                            name='client'
                            value={deal.client_name}
                            disabled
                        />
                    </FormField>
                    <FormField className="pr-3">
                        <label htmlFor='pro'>Property:</label>
                        <input
                            type='text'
                            className="!bg-[#eeeeee] select-none pointer-events-none"
                            name='property'
                            value={deal.prop_name}
                            disabled
                        />
                    </FormField>
                    <Button className="drop-shadow-sm !-mb-2 text-nowrap" size="tiny" onClick={handleSubmit} color="green">SAVE DEAL</Button>
                </div>
            </Form>
            <Divider />
            <Form onSubmit={handleSubmit}>
                <div className="flex flex-row items-start">
                    <FormField className="pr-3">
                        <label htmlFor='unit_no'>Unit Number:</label>
                        <input
                            type='text'
                            name='unit_no'
                            value={unit_no}
                            onChange={handleChange}
                            required
                        />
                    </FormField>
                    <FormField className="pr-3">
                        <label htmlFor='move_date'>Move Date:</label>
                        <input
                            type='date'
                            name='move_date'
                            value={move_date}
                            onChange={handleChange}
                            required
                        />
                    </FormField>`
                    <FormField>
                        <label htmlFor='lease_term'>Lease Term:</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-[1rem] font-bold pointer-events-none">mos</span>
                            <input
                                type='text'
                                name='lease_term'
                                value={lease_term}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </FormField>
                </div>
                <div className="flex flex-row items-start">
                    <FormField className="pr-3 pt-1">
                        <label htmlFor='rent'>Rent:</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-[1rem] font-bold pointer-events-none">$</span>
                            <input
                                className="indent-4"
                                type='number'
                                name='rent'
                                value={rent}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </FormField>
                    <FormField className="pr-3 pt-1">
                        <label htmlFor='rate'>Commission Rate:</label>
                        {flatFee ? (
                            <input
                                type='number'
                                name='rate'
                                value={rate}
                                disabled
                            />
                        ) : (
                            <div className="relative">
                                <span className="absolute inset-y-0 right-0 pr-7 flex items-center text-[1rem] font-bold pointer-events-none">%</span>
                                <input
                                    type='number'
                                    name='rate'
                                    value={rate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            
                        )}
                    </FormField>
                    <FormField className="pr-3 pt-1">
                        <label htmlFor='flat_fee' className="!mb-[2px]">
                            <div className="flex flex-row justify-start items-start" >
                                <span>Flat Fee?:</span> 
                                <Checkbox toggle  className="pl-2" onClick={handleFlatFee} style={{ transform: 'scale(0.75)' }}/>
                            </div>
                        </label>
                        {flatFee ? (
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-[1rem] font-bold pointer-events-none">$</span>
                                <input
                                    type='number'
                                    name='flat_fee'
                                    value={flat_fee}
                                    className="indent-4"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        ) : (
                            <input
                                type='number'
                                name='flat_fee'
                                className=""
                                value={flat_fee}
                                disabled
                            />
                        )}
                    </FormField>
                    <FormField className="pt-1">
                        <label htmlFor='commission'>Total:</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-[1rem] font-bold pointer-events-none">$</span>
                            <input
                                type='number'
                                name='commission'
                                value={commission}
                                onChange={handleChange}
                                className="indent-4"
                                required
                            />
                        </div>
                    </FormField>
                </div>
            </Form>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user,
    error: state.auth.error,
    isDealMode: state.ui.isDealMode,
    deal: state.agent.deal
});

export default connect(mapStateToProps, { update_deal, load_deal, reset_deal_mode })(EditDeal);