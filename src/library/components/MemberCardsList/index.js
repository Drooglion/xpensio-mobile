/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import {
  ListItem,
  Left,
  Body,
  Right,
  Button,
  Text,
  View,
} from 'native-base';

import R from 'res/R';
import styles from './styles';

export default class MemberCardsList extends Component {
  state = { cards: {} };

  componentWillMount() {
    const { data } = this.props;
    this.setState({
      cards: data
    });
  }

  renderItem = (item, key) => {
    const { onItemClick } = this.props;

    return (
      <ListItem
        noBorder
        noIndent
        avatar
        button
        onPress={() => onItemClick(item)}
        style={styles.listItem}
        key={key}
      >
        <Left style={styles.itemLeft}>
          {
            item.type === 'virtual'
              ? (
                <Button
                  disabled
                  style={[styles.virtualCard, !item.isEnabled ? styles.disabledCard : {}]}
                >
                  <Text
                    style={[styles.virtualCardText, !item.isEnabled ? styles.disabledText : {}]}
                  >
                    {item.last4}
                  </Text>
                </Button>
              ) : (
                <Button
                  bordered
                  disabled
                  style={[styles.plasticCard, !item.isEnabled ? styles.disabledCard : {}]}
                >
                  <Text
                    style={[styles.plasticCardText, !item.isEnabled ? styles.disabledText : {}]}
                  >
                    {item.last4}
                  </Text>
                </Button>
              )
          }
        </Left>
        <Body style={styles.itemBody} />
        <Right style={styles.itemRight}>
          {
            item.isEnabled
              ? (
                <Button transparent style={styles.disableBtn}>
                  <Text uppercase style={styles.disableText}>{R.strings.disable}</Text>
                </Button>
              ) : (
                <Button transparent style={styles.enableBtn}>
                  <Text uppercase style={styles.enableText}>{R.strings.enable}</Text>
                </Button>
              )
          }
        </Right>
      </ListItem>
    );
  }

  render() {
    const { cards } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={cards}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => this.renderItem(item)}
          contentContainerStyle={styles.list}
        />
      </View>
    );
  }
}

MemberCardsList.propTypes = {
  data: PropTypes.instanceOf(Array),
  onItemClick: PropTypes.func.isRequired,
};

MemberCardsList.defaultProps = {
  data: [],
};
