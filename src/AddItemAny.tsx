import React, {ChangeEvent, useState} from 'react';
import {Button, TextField} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

type AddItemType = {
    addItem: (t: string) => void;
}
export const AddItemAny: React.FC<AddItemType> = ({addItem}) => {
    const [value, setValue] = useState<string>('');
    const addItemOnClick = () => {
       debugger
        if (value.trim()) {
            addItem(value.trim());
            setValue('');
        }

    }
    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => setValue(e.currentTarget.value);
    return <div>
        <TextField
            color={'primary'}
            autoFocus
            variant={'filled'}

            value={value}
            onChange={onChange}
        />
        <Button>
            <AddCircleOutlineIcon
                color={'primary'}
                onClick={addItemOnClick}
            />
        </Button>
    </div>
}