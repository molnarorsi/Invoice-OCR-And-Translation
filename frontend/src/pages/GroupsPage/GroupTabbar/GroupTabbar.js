import {useState, useContext} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useStyles } from '../styles';
import Typography from '@mui/material/Typography';

const GroupTabbar = (props) => {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        props.onPageChange(newValue);
    };

    return (
        <>
            <div className={classes.rootContainer}>
                <Tabs className={classes.tabsContainer} centered value={value} onChange={handleChange}>
                    <Tab sx={{mx:5, p:2}} label={<Typography variant="h6">Join</Typography>} icon={<GroupAddIcon />} />
                    <Tab sx={{mx:5, p:2}} label={<Typography variant="h6">Create</Typography>} icon={<AddCircleIcon />} />
                </Tabs>
            </div>
        </>
    );
};

export default GroupTabbar;