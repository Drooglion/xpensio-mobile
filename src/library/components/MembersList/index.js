/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { SectionList } from 'react-native';
import PropTypes from 'prop-types';
import {
  ListItem,
  Text,
  Left,
  Body,
  Right,
  Badge,
  Thumbnail,
  View,
} from 'native-base';
import UserAvatar from 'react-native-user-avatar';
import { isNil } from 'lodash';

import StringUtils from 'library/utils/StringUtils';
import R from 'res/R';
import styles from './styles';

export default class MembersList extends Component {
  state = { sections: {} };

  componentWillMount() {
    const { data } = this.props;
    const managerItems = this.filterManagers(data);
    const memberItems = this.filterMembers(data);
    this.setState({
      sections: [
        { title: R.strings.approvers, data: managerItems },
        { title: R.strings.members, data: memberItems },
      ],
    });
  }

  filterManagers = data => (
    data.filter(
      item => ['MANAGER', 'APPROVER'].includes(StringUtils.teamRoles(item.teamRole))
    )
  )

  filterMembers = data => (
    data.filter(
      item => StringUtils.teamRoles(item.teamRole) !== 'MANAGER'
    )
  )

  renderSection = title => (
    <Text style={styles.sectionText} uppercase>
      {title}
    </Text>
  )

  renderItem = ({ employee, id }, key) => {
    const { onItemClick, teamId } = this.props;
    const item = { ...employee, memberId: id, teamId };
    const avatar = (!isNil(item.photo))
      ? (
        <Thumbnail
          small
          source={{ uri: item.photo }}
        />
      )
      : (
        <UserAvatar
          size={R.metrics.avatar}
          name={StringUtils.getInitials(item.firstName)}
          fontDecrease="2"
        />
      );

    return (
      <ListItem
        noBorder
        noIndent
        avatar
        button
        // onPress={() => onItemClick(item)}
        style={styles.listItem}
        key={key}
      >
        <Left style={styles.itemLeft}>{avatar}</Left>
        <Body style={styles.itemBody}>
          <Text numberOfLines={1} style={styles.name}>
            {`${item.firstName} ${item.lastName}`}
          </Text>
          <Text style={styles.email}>{item.email}</Text>
        </Body>
        <Right style={styles.itemRight}>
          {
            // item.notifications.length > 0
            //   ? (
            //     <Badge style={styles.badge}>
            //       <Text style={styles.badgeCount}>{item.notifications.length}</Text>
            //     </Badge>
            //   ) : null
          }
        </Right>
      </ListItem>
    );
  }

  render() {
    const { sections } = this.state;
    return (
      <View style={styles.container}>
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => index.toString()}
          renderSectionHeader={({ section }) => this.renderSection(section.title)}
          renderItem={({ item }) => this.renderItem(item)}
          contentContainerStyle={styles.list}
        />
      </View>
    );
  }
}

MembersList.propTypes = {
  data: PropTypes.instanceOf(Array),
  teamId: PropTypes.string.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

MembersList.defaultProps = {
  data: [],
};
