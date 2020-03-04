import React from 'react';
import PropTypes from 'prop-types';
import SliderImg from './style';
import { getNextRoundRobin, getRandomNumber } from '../../lib';
import { PUBLIC_IMAGE_FOLDER, DEFAULT_BANNER_IMAGE } from '../../configs/constants';

class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentImage: -1,
    };
  }

  componentDidMount() {
    const { duration, banners, random } = this.props;
    let { currentImage } = this.state;

    this.id = setInterval(() => {
      if (banners.length) {
        if (random) {
          currentImage = getRandomNumber(banners.length);
        } else {
          currentImage = getNextRoundRobin(banners.length, currentImage);
        }
      }
      this.setState({ currentImage });
    }, duration);
  }

  componentWillUnmount() {
    clearInterval(this.id);
  }

  render() {
    const { currentImage } = this.state;
    const {
      altText,
      height,
      defaultBanner,
      banners,
    } = this.props;

    const source = PUBLIC_IMAGE_FOLDER + ((currentImage >= 0) ? banners[currentImage] : defaultBanner);

    return (
      <div style={{ width: '100%', height }}>
        <SliderImg alt={altText} src={source} />
      </div>
    );
  }
}

Slider.propTypes = {
  altText: PropTypes.string,
  banners: PropTypes.arrayOf(PropTypes.string),
  defaultBanner: PropTypes.string,
  duration: PropTypes.number,
  height: PropTypes.number,
  random: PropTypes.bool,
};

Slider.defaultProps = {
  altText: 'Default Banner',
  banners: [],
  defaultBanner: DEFAULT_BANNER_IMAGE,
  duration: 2000,
  height: 200,
  random: false,
};

export default Slider;
