import React from 'react';
import { ThemeProvider, Typography } from '@material-ui/core/';
import { Math } from '../../components';
import { customTheme } from '../../theme';

const ChildrenDemo = () => (
  <>
    <Math first={1} second={2} operator="+" />
    <Math first={4} second={20} operator="*" />
    <Math first={4} second={20} operator="**" />
    <Math first={8} second={0} operator="/" />
    <Math first={16} second={52} operator="+">
      {
        (keys) => (
          <ThemeProvider theme={customTheme}>
            <Typography varient="p">
              Sum of
              {' '}
              {keys.first}
              {' '}
              and
              {' '}
              {keys.second}
              {' '}
              is
              {' '}
              {keys.result}
            </Typography>
          </ThemeProvider>
        )
      }
    </Math>

    <Math first={3} second={4} operator="+">
      {
        (keys) => (`When we add ${keys.first} with ${keys.second} then we will get ${keys.result} as result.`)
      }
    </Math>
  </>
);

export default ChildrenDemo;
