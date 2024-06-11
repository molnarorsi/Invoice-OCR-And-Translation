import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  card: {
    width: '100%',
    maxWidth: '600px',
    marginBottom: '16px',
  },
  avatar: {
    width: '70px',
    height: '70px',
    margin: 'auto',
    marginBottom: '16px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  textField: {
    marginBottom: '16px',
  },
  button: {
    marginTop: '16px',
  },
});