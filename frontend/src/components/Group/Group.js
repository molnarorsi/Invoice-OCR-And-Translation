import {useStyles} from "./styles";

const Group = (props) => {
    const classes = useStyles();
    const groupData = props.dataFromDB;
    
    return (
        <div className={classes.rootContainer}>
            <h1>{groupData.name}</h1>
            <h3>Invite code: {groupData.code}</h3>
         </div>
    );
};

export default Group;