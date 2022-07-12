import React, { useState, useEffect } from 'react';
import { SectionList } from 'react-native';
import { Body, Left, ListItem, Right, Text, Thumbnail } from 'native-base';
import UserAvatar from 'react-native-user-avatar';
import isNil from 'lodash/isNil';
import { useTranslation } from 'react-i18next';

import StringUtils from 'library/utils/StringUtils';
import R from 'res/R';
import styles from './styles';
import TeamMember from 'models/TeamMember';

type Props = {
  data: TeamMember[];
};

const MembersList = ({ data }: Props) => {
  const [sections, setSections] = useState<any>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const managerItems = data.filter(item =>
      ['MANAGER', 'APPROVER'].includes(StringUtils.teamRoles(item.teamRole)),
    );

    const memberItems = data.filter(
      item => StringUtils.teamRoles(item.teamRole) !== 'MANAGER',
    );
    setSections([
      { title: t('manager'), data: managerItems },
      { title: t('members'), data: memberItems },
    ]);
  }, [t, data]);

  const renderSection = (title: string) => (
    <Text style={styles.sectionText} uppercase>
      {title}
    </Text>
  );

  const renderItem = ({ employee, id, key }: TeamMember) => {
    const item = { ...employee, memberId: id };
    const avatar = !isNil(item.photoUrl) ? (
      <Thumbnail small source={{ uri: item.photoUrl }} />
    ) : (
      <UserAvatar
        size={R.metrics.avatar}
        name={StringUtils.getInitials(item.firstName)}
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
        key={key}>
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
  };

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item, index) => index.toString()}
      renderSectionHeader={({ section }) => renderSection(section.title)}
      renderItem={({ item }) => renderItem(item)}
      contentContainerStyle={styles.list}
    />
  );
};

export default MembersList;
