import React from 'react';
import * as yup from 'yup';

import { Form, Item } from './style';
import {
  TextField, SelectField, Button, Field, RadioGroupField,
} from '../../components';
import {
  CRICKET_RADIO_OPTIONS, CRICKET_SELECT_OPTION, FOOTBALL_SELECT_OPTION,
  FOOTBALL_RADIO_OPTIONS, SPORTS_SELECT_OPTIONS,
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

  getSchema = yup.object().shape({
    [NAME]: yup.string().required().min(3).label('Name'),
    [SPORT]: yup.string().required(),
    [DO]: yup.string().when(
      ['cricket', 'football'],
      (other1, other2, schema) => ((other1 || other2) ? schema : schema.required('what you do is a required field')),
    ),
  });

  hasErrors = () => {
    const { components } = this.state;
    const { [NAME]: nameComponent, [SPORT]: sportComponent, [DO]: doComponent } = components;

    return (!!nameComponent.error) || (!!sportComponent.error) || (!!doComponent.error);
  };

  isTouched = () => {
    const { components } = this.state;
    const { [NAME]: nameComponent, [SPORT]: sportComponent, [DO]: doComponent } = components;

    return nameComponent.isTouched && sportComponent.isTouched && doComponent.isTouched;
  };

  getError = (field) => {
    const { components } = this.state;
    const component = components[field];
    return (component.isTouched && component.error) || undefined;
  };

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
    this.setState({ [NAME]: e.target.value }, () => {
      this.validate(NAME);
    });
  };

  handleSportChange = (e) => {
    const { components: oldComponents } = this.state;
    const sport = e.target.value;
    const cricket = '';
    const football = '';
    const components = { ...oldComponents };

    components.sport.isTouched = true;
    this.setState({
      sport, cricket, football, components,
    }, () => {
      this.validate(SPORT);
    });
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

    this.setState({ cricket, football }, () => {
      this.validate(DO);
    });
  }

  handleBlur = (field) => {
    const { components: oldComponents } = this.state;
    const components = { ...oldComponents };

    components[field].isTouched = true;
    this.setState({ components }, () => {
      this.validate(field);
    });
  }

  validate = async (args) => {
    const { state } = this;
    const { components: oldComponents } = state;
    const components = { ...oldComponents };

    try {
      await this.getSchema.validateAt(args, state);
      components[args].error = undefined;
    } catch (errors) {
      const { name, message } = errors;
      components[args].error = { name, message };
    }

    this.setState({ components });
  }

  render = () => {
    const {
      name, sport, cricket, football,
    } = this.state;

    const {
      getError, handleBlur, handleNameChange, handleSportChange,
      getRadioOptions, handleDoChange, isTouched, hasErrors,
    } = this;

    console.log(this.state);

    return (
      <Form>
        <Field label="Name">
          <TextField
            value={name}
            error={getError(NAME) && getError(NAME).message}
            onBlur={() => { handleBlur(NAME); }}
            onChange={handleNameChange}
          />
        </Field>
        <Field label="Sports">
          <SelectField
            onChange={handleSportChange}
            options={SPORTS_SELECT_OPTIONS}
            value={sport}
            error={getError(SPORT) && getError(SPORT).message}
          />
        </Field>
        <RadioGroupField
          label="What you do?"
          radioOptions={getRadioOptions()}
          onChange={handleDoChange}
          value={cricket || football}
          onBlur={() => { handleBlur(DO); }}
          error={getError(DO) && getError(DO).message}
        />
        <Item align="end">
          <Button value="Cancel" />
          <Button
            color="default"
            value="Submit"
            disabled={(!isTouched()) || hasErrors()}
            onClick={() => { alert('form Submitted'); }}
          />
        </Item>
      </Form>
    );
  }
}

export default InputDemo;
