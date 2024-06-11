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
    padding: '20px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    borderRadius: '5px',
  },
  avatar: {
    width: '100px',
    height: '100px',
    margin: 'auto',
    marginBottom: '16px',
    border: '2px solid #000',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    color: '#333',
    fontWeight: 'bold',
  },
  textField: {
    marginBottom: '16px',
  },
  button: {
    marginTop: '16px',
    backgroundColor: '#FE6B8B',
    '&:hover': {
      backgroundColor: '#FF8E53',
    },
  },
});