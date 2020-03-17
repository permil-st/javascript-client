import React from 'react';
import PropTypes from 'prop-types';
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

const Field = (props) => {
  const { label, children } = props;
  return (
    <Item>
      <Label>{label}</Label>
      {children}
    </Item>
  );
};

Field.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};

const RadioGroupField = (props) => {
  const { label, radioOptions, ...otherProps } = props;

  return (radioOptions.length && (
    <>
      <Field label={label}>
        <RadioGroup
          options={radioOptions}
          {...otherProps}
        />
      </Field>
    </>
  )) || '';
};

RadioGroupField.propTypes = {
  label: PropTypes.string.isRequired,
  radioOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  error: PropTypes.string,
};

RadioGroupField.defaultProps = {
  error: undefined,
};

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
    name: yup.string().required().min(3).label('Name'),
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
    const name = e.target.value;
    this.setState({ name }, () => {
      this.validate(NAME);
    });
  };

  handleNameBlur= () => {
    const { components } = this.state;

    components.name.isTouched = true;

    this.setState({ components }, () => {
      this.validate(NAME);
    });
  }

  handleSportChange = (e) => {
    const { components } = this.state;
    const sport = e.target.value;
    const cricket = '';
    const football = '';

    components.sport.isTouched = true;
    this.setState({
      sport,
      cricket,
      football,
      components,
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

  handleDoBlur = () => {
    const { components } = this.state;

    components.do.isTouched = true;

    this.setState({ components }, () => {
      this.validate(DO);
    });
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
        <Field label="Name">
          <TextField
            value={name}
            error={this.getError(NAME) && this.getError(NAME).message}
            onBlur={this.handleNameBlur}
            onChange={this.handleNameChange}
          />
        </Field>
        <Field label="Sports">
          <SelectField
            onChange={this.handleSportChange}
            options={SPORTS_SELECT_OPTIONS}
            value={sport}
            error={this.getError(SPORT) && this.getError(SPORT).message}
          />
        </Field>
        <RadioGroupField
          label="What you do?"
          radioOptions={this.getRadioOptions()}
          onChange={this.handleDoChange}
          value={cricket || football}
          onBlur={this.handleDoBlur}
          error={this.getError(DO) && this.getError(DO).message}
        />
        <Item align="end">
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
