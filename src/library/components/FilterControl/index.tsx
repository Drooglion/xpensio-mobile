import React from 'react';
import { ScrollView } from 'react-native';
import { Button, Text, Icon, View } from 'native-base';

import styles from './styles';
import { ITeam } from 'types/Team';

type Props = {
  activeFilters: ITeam[];
  onPress(): void;
  onItemPress(id: string): void;
};

const FilterControl = ({ activeFilters, onPress, onItemPress }: Props) => (
  <View style={styles.container}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <Button bordered rounded iconRight onPress={onPress} style={styles.btn}>
        <Text style={styles.txt} allowFontScaling={false}>
          Filter
        </Text>
        <Icon style={styles.iconFilter} name="chevron-down" />
      </Button>
      {activeFilters.map(item => (
        <Button
          key={item.name}
          rounded
          iconRight
          onPress={() => onItemPress(item.id)}
          style={styles.btnActive}>
          <Text style={styles.activeTxt} allowFontScaling={false}>
            {item.name}
          </Text>
          {/* item.required ? null : (
            <Icon style={styles.activeIconFilter} name="close" />
          ) */}
        </Button>
      ))}
    </ScrollView>
  </View>
);

FilterControl.defaultProps = {
  onPress: () => {},
  activeFilters: [],
};

export default FilterControl;
