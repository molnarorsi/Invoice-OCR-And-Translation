import {useState, useContext, useEffect} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useStyles } from '../styles';
import Typography from '@mui/material/Typography';
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
                    <Tab sx={{mx:5, p:2}} label={<Typography variant="h6">Groups</Typography>} value={0} onClick={(e) => handleChange(e, 0, "Groups")} icon={<GroupAddIcon />} />
                    <Tab sx={{mx:5, p:2}} label={<Typography variant="h6">Join</Typography>} value={1} onClick={(e) => handleChange(e, 1, "Join")} icon={<GroupAddIcon />} />
                    {role === "admin" && <Tab sx={{mx:5, p:2}} label={<Typography variant="h6">Create</Typography>} value={2} onClick={(e)=> handleChange(e, 2, "Create")} icon={<AddCircleIcon />} />}
                </Tabs>
            </div>
        </>
    );
};

export default GroupTabbar;