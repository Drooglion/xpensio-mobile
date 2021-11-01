/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { View, Animated, Dimensions } from 'react-native';
import Svg, {
  Rect,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
  G
} from 'react-native-svg';
import PropTypes from 'prop-types';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const { interpolate } = require('d3-interpolate');

const { width } = Dimensions.get('window');

class ContentLoader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offsetValues: ['-2', '-1.5', '-1'],
      offsets: [
        '0.0001',
        '0.0002',
        '0.0003' // Avoid duplicate value cause error in Android
      ],
      frequence: props.duration / 2
    };
    this._isMounted = false;
    this.animate = new Animated.Value(0);
    this.loopAnimation = this.loopAnimation.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.loopAnimation();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  offsetValueBound = (x) => {
    if (x > 1) {
      return '1';
    }
    if (x < 0) {
      return '0';
    }
    return x;
  }

  loopAnimation() {
    if (!this._isMounted) return;
    // setup interpolate
    const interpolator = interpolate(this.state, {
      offsetValues: ['1', '1.5', '2']
    });

    // start animation
    const {
      duration,
    } = this.props;

    const start = Date.now();
    this.animation = () => {
      const now = Date.now();
      let t = (now - start) / duration;
      if (t > 1) {
        t = 1;
      }

      const newState = interpolator(t);
      const offsetValues = [];
      offsetValues[0] = this.offsetValueBound(newState.offsetValues[0]);
      offsetValues[1] = this.offsetValueBound(newState.offsetValues[1]);
      offsetValues[2] = this.offsetValueBound(newState.offsetValues[2]);

      // Make sure at least two offsets is different
      if (offsetValues[0] !== offsetValues[1] || offsetValues[0] !== offsetValues[2]
        || offsetValues[1] !== offsetValues[2]) {
        this._isMounted && this.setState({ offsets: offsetValues });
      }
      if (t < 1) requestAnimationFrame(this.animation);
    };
    requestAnimationFrame(this.animation);

    // Setup loop animation
    const { frequence } = this.state;
    Animated.sequence([
      Animated.timing(this.animate, {
        toValue: 1,
        duration: frequence
      }),
      Animated.timing(this.animate, {
        toValue: 0,
        duration: frequence
      })
    ]).start((event) => {
      if (event.finished) {
        this.loopAnimation();
      }
    });
  }

  render() {
    const {
      height,
      x1,
      x2,
      y1,
      y2,
      primaryColor,
      secondaryColor,
      children,
    } = this.props;
    const {
      offsets,
    } = this.state;
    return (
      <View>
        <AnimatedSvg width={width - 20} height={height}>
          <Defs>
            <LinearGradient
              id="grad"
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
            >
              <Stop
                offset={offsets[0]}
                stopColor={primaryColor}
                stopOpacity="1"
              />
              <Stop
                offset={offsets[1]}
                stopColor={secondaryColor}
                stopOpacity="1"
              />
              <Stop
                offset={offsets[2]}
                stopColor={primaryColor}
                stopOpacity="1"
              />
            </LinearGradient>
            <ClipPath id="clip">
              <G>{children}</G>
            </ClipPath>
          </Defs>

          <Rect
            x="0"
            y="0"
            height={height}
            width={width - 20}
            fill="url(#grad)"
            clipPath="url(#clip)"
          />
        </AnimatedSvg>
      </View>
    );
  }
}

ContentLoader.propTypes = {
  primaryColor: PropTypes.string,
  secondaryColor: PropTypes.string,
  duration: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  x1: PropTypes.string,
  y1: PropTypes.string,
  x2: PropTypes.string,
  y2: PropTypes.string
};
ContentLoader.defaultProps = {
  primaryColor: '#eeeeee',
  secondaryColor: '#dddddd',
  duration: 2000,
  width: 300,
  height: 200,
  x1: '0',
  y1: '0',
  x2: '100%',
  y2: '0'
};
export default ContentLoader;
