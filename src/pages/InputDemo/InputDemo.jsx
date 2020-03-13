import React from 'react';
import { TextField, RadioGroup, SelectField } from '../../components';
import { Label, Wrapper, Item } from './style';
import {
  CRICKET_RADIO_OPTIONS,
  CRICKET_SELECT_OPTION,
  FOOTBALL_SELECT_OPTION,
  FOOTBALL_RADIO_OPTIONS,
  SPORTS_SELECT_OPTIONS,
} from '../../configs/constants';

class InputDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      sport: '',
      cricket: '',
      football: '',
    };
  }

  getRadioOptions = () => {
    const { sport } = this.state;

    switch (sport) {
    case CRICKET_SELECT_OPTION:
      return CRICKET_RADIO_OPTIONS;
    case FOOTBALL_SELECT_OPTION:
      return FOOTBALL_RADIO_OPTIONS;
    default:
      return [];
    }
  };

  handleNameChange = (e) => {
    const name = e.target.value;
    this.setState({ name });
  };

  handleSportChange = (e) => {
    const sport = e.target.value;
    const cricket = '';
    const football = '';
    this.setState({ sport, cricket, football });
  }

  handleDoChange = (e) => {
    const { sport } = this.state;
    let cricket;
    let football;

    if (sport === CRICKET_SELECT_OPTION) {
      cricket = e.target.value;
    } else {
      football = e.target.value;
    }

    this.setState({ cricket, football });
  }

  render = () => {
    const {
      name,
      sport,
      cricket,
      football,
    } = this.state;

    console.log(this.state);

    return (
      <Wrapper>
        <Item>
          <Label>Name</Label>
          <TextField value={name} onChange={this.handleNameChange} />
        </Item>
        <Item>
          <Label>Select the you play?</Label>
          <SelectField
            onChange={this.handleSportChange}
            options={SPORTS_SELECT_OPTIONS}
            value={sport}
          />
        </Item>
        <Item>
          {
            this.getRadioOptions().length && (<Label>What you do?</Label>)
          }
          <RadioGroup
            options={this.getRadioOptions()}
            onChange={this.handleDoChange}
            value={cricket !== '' ? cricket : football}
          />
        </Item>
      </Wrapper>
    );
  }
}

export default InputDemo;
