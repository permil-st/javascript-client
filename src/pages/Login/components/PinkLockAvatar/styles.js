import { makeStyles } from '@material-ui/core/styles';
import { pink } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
}));

export default useStyles;
