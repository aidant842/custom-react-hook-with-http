import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./components/hooks/use-http";

function App() {
    const [tasks, setTasks] = useState([]);

    //The colon Syntax here is just importing sendRequest under the alias of fetchTasks
    //Much the same as import 'module' as 'alias' from 'package'
    const { isLoading, error, sendRequest: fetchTasks } = useHttp();

    useEffect(() => {
        const transformTasks = (taskObj) => {
            const loadedTasks = [];

            for (const taskKey in taskObj) {
                loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
            }

            setTasks(loadedTasks);
        };
        fetchTasks(
            {
                url: `${process.env.REACT_APP_FIREBASE_URL}`,
            },
            transformTasks
        );
    }, [fetchTasks]);

    const taskAddHandler = (task) => {
        setTasks((prevTasks) => prevTasks.concat(task));
    };

    return (
        <React.Fragment>
            <NewTask onAddTask={taskAddHandler} />
            <Tasks
                items={tasks}
                loading={isLoading}
                error={error}
                onFetch={fetchTasks}
            />
        </React.Fragment>
    );
}

export default App;
