import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Loader, Checkbox, Form, FormField, Button } from "semantic-ui-react";


import { load_tasks, new_task, update_task } from "../store/actions/agent";


function Todos ({ user, load_tasks, tasks, new_task, update_task}) {
    const [taskDescription, setTaskDescription] = useState('');
    const [showSaveButton, setShowSaveButton] = useState(false);

    const handleCheck = async (taskID, user) => {
        const is_active = false;
        await update_task(taskID, user, is_active)
        load_tasks(user)
        console.log(tasks, "post updates")
    }

    const handleNewTask = async () => {
        const is_active = true;
        console.log(user, "user")
        console.log(taskDescription, "taskDescription")
        console.log(is_active, "is_active")
        await new_task(user, taskDescription, is_active);
        setTaskDescription('');
        setShowSaveButton(false);
        load_tasks(user);
        console.log(tasks, "new task");
    };

    const handleFocus = () => setShowSaveButton(true);

    const handleChange = (e) => {
        setTaskDescription(e.target.value);
    };

    useEffect(() => {
            if (user){
                load_tasks(user.id);
            }
    }, [load_tasks, user])

    
    return (
        <div className="flex flex-col items-center justify-evenly">
            <div className="w-11/12 max-w-[500px] p-5 mt-5 mb-10 flex flex-col bg-[#26282B] rounded-lg shadow-md shadow-inner">
                <div className="mb-2 flex flex-col items-center">
                    <h4 className='text-center text-white'>Tasks to Complete</h4>
                </div>
                <div>
                    {tasks.length > 0 ? (
                        <div>
                            <div>
                                <ul className='divide-y divide-gray-200 border border-gray-300 rounded-md'>
                                    {tasks.map(task => (
                                        task.is_active ? (
                                            <li className='p-6 flex flex-row justify-center items-center text-white odd:bg-none even:bg-[#232425]' key={task.id}>
                                                <div className="me-9">
                                                    <div>
                                                        <Checkbox
                                                            label={task.description}
                                                            id={`checkbox-${task.id}`} 
                                                            onChange={() => handleCheck(task.id, task.user)} 
                                                            className="rounded-full border-white bg-white cursor-pointer h-[28px] w-[28px] hover:bg-[#66bb6a] checked:bg-[#66bb6a]"
                                                        />
                                                    </div>
                                                </div>
                                            </li>
                                        ) : (
                                            <>
                                            </>
                                        )
                                    ))}
                                </ul>
                            </div>
                            <div className="me-9">
                                <div className="flex flex-row items-center relative">
                                    <Checkbox checked className="me-3 pointer-events-none"/>
                                    <Form>
                                        <FormField>
                                            <input 
                                                className="!bg-black !bg-opacity-30 !text-white !w-[250px]"
                                                type='text'
                                                name='taskDescription'
                                                placeholder='Enter a new task...'
                                                autoComplete="off"
                                                value={taskDescription}
                                                onChange={handleChange}
                                                onFocus={handleFocus}
                                                required
                                            />
                                        </FormField>
                                    </Form>
                                    {showSaveButton && (
                                        <Button
                                            className="!ml-2 !bg-[#232425] !text-white !px-4 !py-2 rounded absolute right-2"
                                            onClick={handleNewTask}
                                        >
                                            SAVE
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <div>
                                <div className="mb-2 flex flex-col items-center">
                                    <h4 className='text-center text-white'>Completed Tasks</h4>
                                </div>
                            </div>
                        </div>
                        ) :(
                        <div className="text-center text-white">
                            <Loader />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    error: state.auth.error,
    tasks: state.agent.tasks,
});

export default connect(mapStateToProps, { load_tasks, new_task, update_task })(Todos);