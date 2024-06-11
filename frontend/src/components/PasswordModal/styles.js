import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  dialog: {
    padding: '20px',
  },
  title: {
    color: '#3f51b5',
    textAlign: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  actions: {
    justifyContent: 'space-between',
  },
});

