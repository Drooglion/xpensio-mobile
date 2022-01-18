import React from 'react';
import { View } from 'react-native';
import ContentLoader from 'library/components/ContentLoader';
import { Circle, Rect } from 'react-native-svg';

const ListLoader = ({ style }: { style?: any }) => (
  <View style={style}>
    <ContentLoader height={70} primaryColor="#f3f3f3" secondaryColor="#ecebeb">
      <Rect x="90" y="20" rx="4" ry="4" width="250" height="8" />
      <Rect x="90" y="40" rx="4" ry="4" width="200" height="8" />
      <Circle cx="28" cy="28" r="28" x="20" y="10" />
    </ContentLoader>
    <ContentLoader height={70} primaryColor="#f3f3f3" secondaryColor="#ecebeb">
      <Rect x="90" y="20" rx="4" ry="4" width="250" height="8" />
      <Rect x="90" y="40" rx="4" ry="4" width="200" height="8" />
      <Circle cx="28" cy="28" r="28" x="20" y="10" />
    </ContentLoader>
    <ContentLoader height={70} primaryColor="#f3f3f3" secondaryColor="#ecebeb">
      <Rect x="90" y="20" rx="4" ry="4" width="250" height="8" />
      <Rect x="90" y="40" rx="4" ry="4" width="200" height="8" />
      <Circle cx="28" cy="28" r="28" x="20" y="10" />
    </ContentLoader>
    <ContentLoader height={70} primaryColor="#f3f3f3" secondaryColor="#ecebeb">
      <Rect x="90" y="20" rx="4" ry="4" width="250" height="8" />
      <Rect x="90" y="40" rx="4" ry="4" width="200" height="8" />
      <Circle cx="28" cy="28" r="28" x="20" y="10" />
    </ContentLoader>
    <ContentLoader height={70} primaryColor="#f3f3f3" secondaryColor="#ecebeb">
      <Rect x="90" y="20" rx="4" ry="4" width="250" height="8" />
      <Rect x="90" y="40" rx="4" ry="4" width="200" height="8" />
      <Circle cx="28" cy="28" r="28" x="20" y="10" />
    </ContentLoader>
    <ContentLoader height={70} primaryColor="#f3f3f3" secondaryColor="#ecebeb">
      <Rect x="90" y="20" rx="4" ry="4" width="250" height="8" />
      <Rect x="90" y="40" rx="4" ry="4" width="200" height="8" />
      <Circle cx="28" cy="28" r="28" x="20" y="10" />
    </ContentLoader>
  </View>
);

export default ListLoader;
