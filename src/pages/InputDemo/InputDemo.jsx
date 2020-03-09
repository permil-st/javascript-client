import React from 'react';
import * as yup from 'yup';
import { Label, Form, Item } from './style';

import {
  TextField,
  RadioGroup,
  SelectField,
  Button,
} from '../../components';

import {
  CRICKET_RADIO_OPTIONS,
  CRICKET_SELECT_OPTION,
  FOOTBALL_SELECT_OPTION,
  FOOTBALL_RADIO_OPTIONS,
  SPORTS_SELECT_OPTIONS,
} from '../../configs/constants';

const NAME = 'name';
const SPORT = 'sport';
const DO = 'do';

class InputDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      sport: '',
      cricket: '',
      football: '',
      components: {
        [NAME]: {},
        [SPORT]: {},
        [DO]: {},
      },
    };
  }

  hasErrors = () => {
    const { components } = this.state;
    const { name: nameComponent, sport: sportComponent, do: doComponent } = components;

    return (!!nameComponent.error) || (!!sportComponent.error) || (!!doComponent.error);
  };

  isTouched = () => {
    const { components } = this.state;
    const { name, sport, do: doComponent } = components;

    return name.isTouched && sport.isTouched && doComponent.isTouched;
  };

  getError = (field) => {
    const { components } = this.state;
    const component = components[field];
    return (component.isTouched && component.error) || undefined;
  };

  getSchema = () => yup.object().shape({
    name: yup.string().required().min(3, 'Minimum of 3 characters'),
    sport: yup.string().required(),
    do: yup.string().when(
      ['cricket', 'football'],
      (other1, other2, schema) => ((other1 || other2) ? schema : schema.required('what you do is a required field')),
    ),
  });

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
    let { name } = this.state;

    name = e.target.value;

    this.setState({ name });
  };

  handleNameBlur= () => {
    const { components } = this.state;
    const { name: nameComponent } = components;

    nameComponent.isTouched = true;
    this.validate(NAME);
  }

  handleSportChange = (e) => {
    let { sport, cricket, football } = this.state;
    const { components } = this.state;
    const { sport: sportComponent, do: doComponent } = components;

    sportComponent.isTouched = true;
    doComponent.isTouched = false;

    sport = e.target.value;
    cricket = '';
    football = '';

    this.setState({ sport, cricket, football }, () => {
      this.validate(SPORT);
      this.validate(DO);
    });
  }

  handleSportBlur = () => {
    const { components } = this.state;
    const { sport: sportComponent } = components;

    sportComponent.isTouched = true;
    this.validate(SPORT);
    this.validate(DO);
  }

  handleDoChange = (e) => {
    const { sport, components } = this.state;
    let { cricket, football } = this.state;
    const { do: doComponent } = components;

    doComponent.isTouched = true;

    if (sport === CRICKET_SELECT_OPTION) {
      cricket = e.target.value;
    } else {
      football = e.target.value;
    }

    this.setState({ cricket, football }, () => {
      this.validate(DO);
    });
  }

  handleDoBlur = () => {
    const { components } = this.state;
    const { do: doComponent } = components;

    doComponent.isTouched = true;
    this.validate(DO);
  }

  validate = async (args) => {
    const { state } = this;
    const { components } = state;
    try {
      await this.getSchema().validateAt(args, state);
      components[args].error = undefined;
      this.setState({ components });
    } catch (errors) {
      const { name, message } = errors;
      components[args].error = { name, message };
      this.setState({ components });
    }
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
      <Form>
        <Item>
          <Label>Name</Label>
          <TextField
            value={name}
            error={this.getError(NAME) && this.getError(NAME).message}
            onBlur={this.handleNameBlur}
            onChange={this.handleNameChange}
          />
        </Item>
        <Item>
          <Label>Select the you play?</Label>
          <SelectField
            onChange={this.handleSportChange}
            options={SPORTS_SELECT_OPTIONS}
            value={sport}
            onBlur={this.handleSportBlur}
            error={this.getError(SPORT) && this.getError(SPORT).message}
          />
        </Item>
        <Item>
          {
            this.getRadioOptions().length !== 0 && (<Label>What you do?</Label>)
          }
          <RadioGroup
            options={this.getRadioOptions()}
            onChange={this.handleDoChange}
            value={cricket !== '' ? cricket : football}
            onBlur={this.handleDoBlur}
            error={this.getError(DO) && this.getError(DO).message}
          />
        </Item>
        <Item>
          <Button value="Cancel" />
          <Button
            color="default"
            value="Submit"
            disabled={(!this.isTouched()) || this.hasErrors()}
            onClick={() => { alert('form Submitted'); }}
          />
        </Item>
      </Form>
    );
  }
}

export default InputDemo;
