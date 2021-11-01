/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import {
  ListItem,
  Item,
  Left,
  Body,
  Right,
  Button,
  Text,
  View,
} from 'native-base';
import { Bar } from 'react-native-progress';

import NumberUtils from 'library/utils/NumberUtils';
import R from 'res/R';
import styles from './styles';

export default class MemberRulesList extends Component {
  state = { rules: [] };

  componentWillMount() {
    const { data } = this.props;
    this.setState({
      rules: data,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    this.setState({ rules: data });
  }

  renderMonthlyLimit = (item, key) => {
    const { onEditRuleType } = this.props;
    return (
      <ListItem
        noBorder
        noIndent
        avatar
        button
        style={styles.listItem}
        key={key}
      >
        <View style={styles.ruleBody}>
          <Item style={styles.ruleItem}>
            <Left style={styles.left}>
              <Text style={styles.bodyText}>{R.strings.monthlyLimit}</Text>
            </Left>
            <Body style={styles.body} />
            <Right style={styles.right}>
              <Text style={styles.bodyText}>
                {`${NumberUtils.formatCurrency('PHP', item.spent)} of ${NumberUtils.formatCurrency('PHP', item.max)}`}
              </Text>
            </Right>
          </Item>
          <Bar
            progress={(item.spent / item.max)}
            color={R.colors.secondary}
            unfilledColor={R.colors.divider}
            borderColor={R.colors.white}
            borderRadius={4}
            width={null}
            height={8}
            style={styles.limitProgress}
          />
          <Button
            transparent
            style={styles.editBtn}
            onPress={() => onEditRuleType(item)}
          >
            <Text uppercase style={styles.editText}>
              {R.strings.edit}
            </Text>
          </Button>
        </View>
      </ListItem>
    );
  }

  renderPerPurchaseLimit = (item, key) => {
    const { onEditRuleType } = this.props;
    return (
      <ListItem
        noBorder
        noIndent
        avatar
        button
        style={styles.listItem}
        key={key}
      >
        <View style={styles.ruleBody}>
          <Item style={styles.ruleItem}>
            <Left style={styles.left}>
              <Text style={styles.bodyText}>{R.strings.perPurchaseLimit}</Text>
            </Left>
            <Body style={styles.body} />
            <Right>
              <Text style={styles.bodyText}>
                {`${NumberUtils.formatCurrency('PHP', item.spent)} of ${NumberUtils.formatCurrency('PHP', item.max)}`}
              </Text>
            </Right>
          </Item>
          <Button
            transparent
            style={styles.editBtn}
            onPress={() => onEditRuleType(item)}
          >
            <Text uppercase style={styles.editText}>
              {R.strings.edit}
            </Text>
          </Button>
        </View>
      </ListItem>
    );
  }

  renderItem = (item, key) => (
    item.rule === 1 ? this.renderMonthlyLimit(item, key) : this.renderPerPurchaseLimit(item, key)
  );

  render() {
    const { rules } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={rules}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => this.renderItem(item)}
          contentContainerStyle={styles.list}
        />
      </View>
    );
  }
}

MemberRulesList.propTypes = {
  data: PropTypes.instanceOf(Array),
  onMonthlyLimitClick: PropTypes.func,
  onPerPurchaseLimitClick: PropTypes.func,
  onEditRuleType: PropTypes.func,
};

MemberRulesList.defaultProps = {
  data: [],
  onMonthlyLimitClick: () => {},
  onPerPurchaseLimitClick: () => {},
  onEditRuleType: () => {},
};
