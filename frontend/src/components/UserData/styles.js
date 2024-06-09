import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  dataGrid: {
    backgroundColor: "white",
    marginBottom: "30px",
    '& .MuiDataGrid-cell': {
      color: '#4a4a4a',
    },
    '& .MuiDataGrid-columnHeader': {
      backgroundColor: '#f5f5f5',
    },
  },
  editRoleModal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "background.paper",
    boxShadow: 24,
    padding: 2,
    borderRadius: 2,
  },
});