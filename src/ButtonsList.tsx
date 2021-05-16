import React from 'react';
import {FilterType} from './App';
import {Button} from '@material-ui/core';

type ButtonsListType = {
    changeStatusTasks: (f: FilterType) => void;
    filter: FilterType;
}
export const ButtonsList: React.FC<ButtonsListType> = ({changeStatusTasks, filter}) => {
    const buttonsName: FilterType[] = ['all', 'completed', 'active'];
    const drawButtons = buttonsName.map(b => {
        const changeStatusTasksOnClick = () => {
            changeStatusTasks(b);

        }
        return <Button
            variant={'contained'}
            color={b === filter ? 'primary' : 'default'}
            style={{margin: '2px'}}
            onClick={changeStatusTasksOnClick}>
            {b}
        </Button>
    })
    return <div>
        {drawButtons}
    </div>
}