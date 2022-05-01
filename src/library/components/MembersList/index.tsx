import React, { useState, useEffect } from 'react';
import { SectionList } from 'react-native';
import {
  Text,
  Thumbnail,
  View,
} from 'native-base';
import UserAvatar from 'react-native-user-avatar';
import isNil from 'lodash/isNil';
import { useTranslation } from 'react-i18next';

import StringUtils from 'library/utils/StringUtils';
import R from 'res/R';
import styles from './styles';

type Props = {
  data: any;
};

const MembersList = ({ data }) => {
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
      { title: t('approvers'), data: managerItems },
      { title: t('members'), data: memberItems },
    ]);
  }, [t, data]);

  const renderSection = (title: string) => (
    <Text style={styles.sectionText} uppercase>
      {title}
    </Text>
  );

  const renderItem = ({ employee, id }, key) => {
    const item = { ...employee, memberId: id, teamId };
    const avatar = !isNil(item.photo) ? (
      <Thumbnail small source={{ uri: item.photo }} />
    ) : (
      <UserAvatar
        size={R.metrics.avatar}
        name={StringUtils.getInitials(item.firstName)}
      />
    );

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => index.toString()}
        renderSectionHeader={({ section }) => renderSection(section.title)}
        renderItem={({ item }) => renderItem(item)}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};