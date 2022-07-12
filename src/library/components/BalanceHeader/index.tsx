import React from 'react';
import {
  Header as NBHeader,
  Body,
  Title,
  Right,
  Left,
  Text,
} from 'native-base';
import { Rect } from 'react-native-svg';

import ContentLoader from 'library/components/ContentLoader';
import NumberUtils from 'library/utils/NumberUtils';
import R from 'res/R';

import styles from './styles';
import { UserWalletBalance } from 'models/Wallet';
import { useTranslation } from 'react-i18next';

type Props = {
  balance?: UserWalletBalance;
  loading: boolean;
  androidStatusBarColor?: string;
};

const BalanceHeader = ({ balance, loading, androidStatusBarColor }: Props) => {
  const { t } = useTranslation();
  return (
    <NBHeader
      noLeft
      hasTabs
      style={styles.header}
      iosBarStyle="dark-content"
      androidStatusBarColor={androidStatusBarColor}>
      <Left style={styles.left} />
      <Body style={styles.body}>
        {loading ? (
          <ContentLoader
            height={44}
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb">
            <Rect x="0" y="0" rx="4" ry="4" width="200" height="40" />
          </ContentLoader>
        ) : balance ? (
          <Title style={styles.title}>
            {NumberUtils.formatCurrency(balance.currency, balance.value)}
          </Title>
        ) : (
          <Title style={styles.title}>{t('notAvailable')}</Title>
        )}
        <Text style={styles.subtitle}>{t('availableFunds')}</Text>
      </Body>
      <Right style={styles.right} />
    </NBHeader>
  );
};

/* class BalanceHeader extends Component {
  renderBody = () => {
    const {
      user: { id },
    } = this.props;
    return (
      <Body style={styles.body}>
        {
          <Query
            query={ACCOUNT.GET_BALANCE}
            variables={{ id }}
            fetchPolicy="network-only">
            {({ error, loading, data }) => {
              if (error) {
                HelperUtils.bugsnag.notify(error);
                return null;
              }
              if (loading) {
                return (
                  <ContentLoader
                    height={44}
                    primaryColor="#f3f3f3"
                    secondaryColor="#ecebeb">
                    <Rect x="0" y="0" rx="4" ry="4" width="200" height="40" />
                  </ContentLoader>
                );
              }
              const {
                balance: {
                  payload: { value, currency },
                },
              } = data;
              return (
                <Title allowFontScaling={false} style={styles.title}>
                  {NumberUtils.formatCurrency(currency, value)}
                </Title>
              );
            }}
          </Query>
        }
        <Text style={styles.subtitle}>{R.strings.purchaseLimit}</Text>
      </Body>
    );
  };

  render() {
    const { androidStatusBarColor } = this.props;

    return (
      <NBHeader
        noLeft
        hasTabs
        style={styles.header}
        iosBarStyle="dark-content"
        androidStatusBarColor={androidStatusBarColor}>
        <Left style={{ flex: 0 }} />
        {this.renderBody()}
        <Right style={{ flex: 0 }} />
      </NBHeader>
    );
  }
} */

BalanceHeader.defaultProps = {
  androidStatusBarColor: R.colors.white,
};

export default BalanceHeader;
