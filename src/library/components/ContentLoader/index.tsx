import React, { useEffect, useState } from 'react';
import { View, Animated } from 'react-native';
import Svg, {
  Rect,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
  G,
} from 'react-native-svg';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const { interpolate } = require('d3-interpolate');

export interface ContentLoaderProps {
  primaryColor: string;
  secondaryColor: string;
  duration: number;
  width: number;
  height: number;
  x1: string;
  y1: string;
  x2: string;
  y2: string;
  children?: any;
}

const ContentLoader = ({
  primaryColor,
  secondaryColor,
  duration,
  width,
  height,
  x1,
  x2,
  y1,
  y2,
  children,
}: ContentLoaderProps) => {
  const animate = new Animated.Value(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [offsetValues, setOffsetValues] = useState<any[]>([]);
  const [offsets, setOffsets] = useState<any[]>([
    '0.0001',
    '0.0002',
    '0.0003', // Avoid duplicate value cause error in Android
  ]);
  const [frequence, setFrequence] = useState<number>(0);

  useEffect(() => {
    setIsMounted(true);
    setOffsetValues(['-2', '-1.5', '-1']);
    loopAnimation();

    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (duration) {
      setFrequence(duration / 2);
    }
  }, [duration]);

  const offsetValueBound = (x: number) => {
    if (x > 1) {
      return '1';
    }
    if (x < 0) {
      return '0';
    }
    return x;
  };

  const loopAnimation = () => {
    if (!isMounted) {
      return;
    }
    // setup interpolate
    const interpolator = interpolate(offsetValues, {
      offsetValues: ['1', '1.5', '2'],
    });

    // start animation

    const start = Date.now();
    const animation = () => {
      const now = Date.now();
      let t = (now - start) / duration;
      if (t > 1) {
        t = 1;
      }

      const newState = interpolator(t);
      const values = [];
      values[0] = offsetValueBound(newState.offsetValues[0]);
      values[1] = offsetValueBound(newState.offsetValues[1]);
      values[2] = offsetValueBound(newState.offsetValues[2]);

      // Make sure at least two offsets is different
      if (
        values[0] !== values[1] ||
        values[0] !== values[2] ||
        values[1] !== values[2]
      ) {
        isMounted && setOffsets(offsetValues);
      }
      if (t < 1) {
        requestAnimationFrame(animation);
      }
    };
    requestAnimationFrame(animation);

    // Setup loop animation
    Animated.sequence([
      Animated.timing(animate, {
        toValue: 1,
        duration: frequence,
        useNativeDriver: true,
      }),
      Animated.timing(animate, {
        toValue: 0,
        duration: frequence,
        useNativeDriver: true,
      }),
    ]).start(event => {
      if (event.finished) {
        loopAnimation();
      }
    });
  };

  return (
    <View>
      <AnimatedSvg width={width - 20} height={height}>
        <Defs>
          <LinearGradient id="grad" x1={x1} y1={y1} x2={x2} y2={y2}>
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
  y2: '0',
};

export default ContentLoader;
