import { connect } from "react-redux";
import { Form, FormField, Divider } from "semantic-ui-react";
import { useState } from "react";


function Calculator () {

    const [formData, setFormData] = useState({
            lease_term: 0,
            rent_free: 0,
            cash_allowance: 0,
            monthly_rent: 0,
            net_effective: 0
    });

    const { lease_term, rent_free, cash_allowance, monthly_rent, net_effective } = formData;

    const calculateNER = (data) => {
        const { lease_term, rent_free, cash_allowance, monthly_rent } = data;
        
        if (lease_term > 0) {
            return cash_allowance
              ? Math.round((((monthly_rent * (lease_term - rent_free)) - cash_allowance) / lease_term) * 100) / 100
              : Math.round(((monthly_rent * (lease_term - rent_free)) / lease_term) * 100) / 100;
          }
          return 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        const numericValue = parseFloat(value) || 0;
        const updatedFormData = { ...formData, [name]: numericValue };
        const updatedNetEffective = calculateNER(updatedFormData);

        setFormData({
        ...updatedFormData,
        net_effective: updatedNetEffective,
        });
    };

    return (
        <div className="w-11/12 max-w-[500px] mt-5 mb-10 flex flex-col items-center justify-center bg-[#26282B] rounded-lg shadow-md shadow-inner">
            <div className="mt-4 mb-2 flex flex-col items-center">
                <h4 className='text-center text-white'>Net Effective Rent Calculator</h4>
            </div>
            <div className="">  
                <Form className="p-5">
                    <div>
                        <FormField>
                            <label className="!text-white" htmlFor='lease_term'>Lease Term:</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-32 flex items-center text-[1rem] font-bold text-white pointer-events-none">mos</span>
                                <input 
                                    className="!bg-black !bg-opacity-30 !text-white pl-12"
                                    type='text'
                                    name='lease_term'
                                    value={0 || lease_term}
                                    placeholder="0"
                                    autoComplete="off"
                                    onChange={e => handleChange(e)}
                                />
                            </div>
                        </FormField>
                        <FormField>
                            <label className="!text-white" htmlFor='monthly_rent'>Monthly Rent:</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-[1rem] font-bold text-white pointer-events-none">$</span>
                                <span className="absolute inset-y-0 left-0 pl-32 flex items-center text-[1rem] font-bold text-white pointer-events-none">/ mo</span>
                                <input 
                                    className="!bg-black !bg-opacity-30 !text-white pl-12 indent-4"
                                    type='text'
                                    name='monthly_rent'
                                    value={0 || monthly_rent}
                                    placeholder="0"
                                    autoComplete="off"
                                    onChange={e => handleChange(e)}
                                />
                            </div>
                        </FormField>
                    </div>
                    <Divider />
                    <div>
                        <FormField>
                            <label className="!text-white" htmlFor='rent_free'>No. of Rent-Free Months:</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-32 flex items-center text-[1rem] font-bold text-white pointer-events-none">mos</span>
                                <input 
                                    className="!bg-black !bg-opacity-30 !text-white pl-12"
                                    type='text'
                                    name='rent_free'
                                    value={0 || rent_free}
                                    placeholder="0"
                                    autoComplete="off"
                                    onChange={e => handleChange(e)}
                                />
                            </div>
                        </FormField>
                        <FormField>
                            <label className="!text-white" htmlFor='cash_allowance'>Tenant Cash Allowance:</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-[1rem] font-bold text-white pointer-events-none">$</span>
                                <input 
                                    className="!bg-black !bg-opacity-30 !text-white indent-4"
                                    type='text'
                                    name='cash_allowance'
                                    value={0 || cash_allowance}
                                    placeholder="0"
                                    autoComplete="off"
                                    onChange={e => handleChange(e)}
                                />
                            </div>
                        </FormField>
                    </div>
                    <Divider />
                    <div>
                        <FormField>
                            <label className="!text-white" htmlFor='net_effective'>Net Effective Rent:</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-[1rem] font-bold text-white pointer-events-none">$</span>
                                <span className="absolute inset-y-0 left-0 pl-32 flex items-center text-[1rem] font-bold text-white pointer-events-none">/ mo</span>
                                <input 
                                    className="!bg-[#496299] !bg-opacity-30 !text-white indent-4"
                                    type='text'
                                    name='net_effective'
                                    value={net_effective}
                                    placeholder="0"
                                    autoComplete="off"
                                    onChange={e => handleChange(e)}
                                />
                            </div>
                        </FormField>
                    </div>
                </Form>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { })(Calculator);