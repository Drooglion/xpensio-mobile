import React from 'react';
import {
  Container,
  Tabs,
  Tab,
  TabHeading,
  StyleProvider,
  View,
} from 'native-base';

import Header from 'library/components/Header';
// import MyRequests from 'library/components/MyRequests';
// import TeamRequests from 'library/components/TeamRequests';
import TabSelection from 'library/components/TabSelection';

import R from 'res/R';
import getTheme from 'native-base-theme/components';
import theme from 'native-base-theme/variables/theme';
import styles from './styles';

const Requests = ({ navigation }) => {
  let tab: {} | undefined | null = {};
  const actAsAdmin: boolean = false;
  const tabs = !actAsAdmin
    ? [R.strings.myRequests]
    : [R.strings.myRequests, R.strings.team];

  const onItemClick = item => {};

  const goToTabPage = page => {
    tab.goToPage(page);
  };

  return (
    <StyleProvider style={getTheme(theme)}>
      <Container>
        <Header title={R.strings.requests} />
        <View style={{ flexGrow: 1 }}>
          <TabSelection tabs={tabs} onChange={goToTabPage} />
          <Tabs
            initialPage={0}
            ref={e => {
              tab = e;
            }}
            locked
            tabContainerStyle={styles.tabContainer}
            tabBarUnderlineStyle={styles.tabUnderline}>
            <Tab heading={<TabHeading />}>
              {/* <MyRequests onItemClick={onItemClick} /> */}
            </Tab>
            {!actAsAdmin ? null : (
              <Tab heading={<TabHeading />}>
                {/* <TeamRequests onItemClick={onItemClick} /> */}
              </Tab>
            )}
          </Tabs>
        </View>
      </Container>
    </StyleProvider>
  );
};

export default Requests;
