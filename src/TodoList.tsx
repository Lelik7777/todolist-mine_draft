import React, {ChangeEvent, useState} from 'react';
import {FilterType, TaskType} from './App';
import {Button, Checkbox} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {ButtonsList} from './ButtonsList';
import {AddItemAny} from './AddItemAny';

type TodoListType = {
    tasks: TaskType[];
    title: string;
    idList: string;
    filter: FilterType;
    changeStatusTaskTL: (idL: string, f: FilterType) => void;
    removeTask: (idL: string, idT: string) => void;
    changeCheckBox: (idL: string, idT: string, check: boolean) => void;
    addTask:(idL:string,t:string)=>void;
}
export const TodoList: React.FC<TodoListType> =
    ({tasks, title, idList, changeStatusTaskTL, removeTask, filter, changeCheckBox,addTask}) => {
        const [color, setColor] = useState<'primary' | 'secondary'>('primary');
        const tasksOfList = tasks.map(t => {
            const removeTaskOnClick = () => removeTask(idList, t.id);
            const changeCheckBoxOnClick = (e: ChangeEvent<HTMLInputElement>) => changeCheckBox(idList, t.id, e.currentTarget.checked)
            const onFocus = () => setColor('secondary');
            const offFocus = () => setColor('primary');

            return <div>
                <Checkbox checked={t.isDone} color={'default'} onChange={changeCheckBoxOnClick}></Checkbox>
                <span>{t.title}</span>
                <Button color={color}
                        onClick={removeTaskOnClick}
                        onMouseOver={onFocus}
                        onMouseLeave={offFocus}>
                    <Delete />
                </Button>
            </div>
        });

        function changeStatusTasks(f: FilterType) {
            changeStatusTaskTL(idList, f);
        }
function addTaskL(t:string) {
    addTask(idList,t);
}
        return <div>
            <AddItemAny  addItem={addTaskL}/>
            <div>{tasksOfList}</div>
            <ButtonsList changeStatusTasks={changeStatusTasks} filter={filter}/>
        </div>
    }

