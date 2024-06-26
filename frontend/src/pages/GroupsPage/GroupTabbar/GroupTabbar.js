import {useState, useContext, useEffect} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import { useStyles } from '../styles';
import Typography from '@mui/material/Typography';
import KeyIcon from '@mui/icons-material/Key';
import userContext from '../../../context/user-context';

const GroupTabbar = (props) => {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const context = useContext(userContext);
    const role = context.role;

    useEffect(() => {
        setValue(props.activePage);
    }, [props.activePage]);

    const handleChange = (event, newValue, tabname) => {
        setValue(newValue);
        props.onPageChange(newValue, tabname);
    };

    return (
        <>
            <div className={classes.rootContainer}>
                <Tabs className={classes.tabsContainer} centered value={value} onChange={handleChange}>
                    <Tab sx={{mx:5, p:2}} label={<Typography variant="h6">Groups</Typography>} value={0} onClick={(e) => handleChange(e, 0, "Groups")} icon={<GroupsIcon sx={{color: '#ffa2b6'}}/>} />
                    <Tab sx={{mx:5, p:2}} label={<Typography variant="h6">Join</Typography>} value={1} onClick={(e) => handleChange(e, 1, "Join")} icon={<KeyIcon sx={{color: '#ffa2b6'}} />} />
                    {role === "admin" && <Tab sx={{mx:5, p:2}} label={<Typography variant="h6">Create</Typography>} value={2} onClick={(e)=> handleChange(e, 2, "Create")} icon={<AddCircleIcon sx={{color: '#ffa2b6'}} />} />}
                </Tabs>
            </div>
        </>
    );
};

export default GroupTabbar;