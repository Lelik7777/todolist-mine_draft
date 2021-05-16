
import React, {useState} from 'react';
import {v1} from 'uuid';
import {
    AppBar,
    Button,
    Container,
    createStyles, Grid,
    IconButton,
    makeStyles, Paper,
    Theme,
    Toolbar,
    Typography
} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TodoList} from './TodoList';
import {AddItemAny} from './AddItemAny';

export type FilterType = 'all' | 'completed' | 'active';
type ListType = {
    id: string;
    title: string;
    filter: FilterType;
}
export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}
type TasksType = {
    [key: string]: TaskType[];
}

export function App() {
    const idList1 = v1();
    const idList2 = v1();
    const [lists, setLists] = useState<ListType[]>([
        {id: idList1, title: 'learn', filter: 'all'},
        {id: idList2, title: 'buy', filter: 'all'},
    ]);
    const [tasks, setTasks] = useState<TasksType>({
        [idList1]: [
            {id: v1(), title: 'html', isDone: true},
            {id: v1(), title: 'css', isDone: true},
            {id: v1(), title: 'react', isDone: false},
        ],
        [idList2]: [
            {id: v1(), title: 'bread', isDone: true},
            {id: v1(), title: 'milk', isDone: false},
            {id: v1(), title: 'salt', isDone: false},
        ],
    });
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                flexGrow: 1,
            },
            menuButton: {
                marginRight: theme.spacing(2),
            },
            title: {
                flexGrow: 1,
            },
        }),
    );
    const classes = useStyles();

    function filterTasksInList(idL: string, filter: FilterType) {
        switch (filter) {
            case 'active':
                return tasks[idL].filter(t => !t.isDone);
            case 'completed':
                return tasks[idL].filter(t => t.isDone);
            default:
                return tasks[idL];
        }
    }

    function changeStatusTaskTL(idL: string, filter: FilterType) {
        setLists(lists.map(l => l.id === idL ? {...l, filter: filter} : l));
    }

    function removeTask(idL: string, idT: string) {
        setTasks({...tasks, [idL]: tasks[idL].filter(t => t.id !== idT)});
    }

    function changeCheckBox(idL: string, idT: string, check: boolean) {
        setTasks({...tasks, [idL]: tasks[idL].map(t => t.id === idT ? {...t, isDone: check} : t)});
    }
function addTask(idL:string,t:string){
    setTasks({...tasks,[idL]:[{id:v1(),title:t,isDone:false},...tasks[idL]]});
}
    const currentList = lists.map(l => {
        return <Grid item>
            <Paper style={{padding: '10px'}}>
                <TodoList
                    tasks={filterTasksInList(l.id, l.filter)}
                    filter={l.filter}
                    title={l.title}
                    idList={l.id}
                    changeStatusTaskTL={changeStatusTaskTL}
                    removeTask={removeTask}
                    changeCheckBox={changeCheckBox}
                    addTask={addTask}
                />
            </Paper>
        </Grid>
    })

function addTodoList(t:string) {
    let newList:ListType={id:v1(),title:t,filter:'all'};
        setLists([newList,...lists]);
        setTasks({...tasks,[newList.id]:[]});
}
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        TodoList
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container spacing={4} style={{marginTop: '20px'}}>
                   <AddItemAny addItem={addTodoList}/>
                    {currentList}
                </Grid>
            </Container>
        </div>
    );
}

