/* eslint no-eval: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { SliderImg, SliderWrapper } from './style';
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
    const { currentImage } = this.state;

    const id = setInterval(() => {
      const nextImage = this.getNextImage(banners, currentImage, random);
      console.log('nextImage = ', nextImage);
      this.setState({ currentImage: nextImage });
    }, duration);

    this.setState({ id });
  }

  componentWillUnmount() {
    const { id } = this.state;
    clearInterval(id);
  }

  getNextImage = (banners, currentImage, random = false) => {
    if (banners.length) {
      if (random) {
        return getRandomNumber(banners.length);
      }
      return getNextRoundRobin(banners.length, currentImage);
    }
    return -1;
  }

  render() {
    const { currentImage } = this.state;

    const {
      altText,
      height,
      defaultBanner,
      banners,
    } = this.props;

    const source = PUBLIC_IMAGE_FOLDER
    + ((currentImage >= 0) ? banners[currentImage] : defaultBanner);

    return (
      <SliderWrapper height={height}>
        <SliderImg alt={altText} src={source} />
      </SliderWrapper>
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
