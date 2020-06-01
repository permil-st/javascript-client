import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles({
  root: {
    margin: '8px 0px',
  },
  cell: {
    cursor: 'default',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: grey[300],
    },
  },
});

export default useStyles;
