import React from 'react';
import { Text, View } from 'native-base';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';

// import HelperUtils from 'library/utils/HelperUtils';
import styles from './styles';

type Props = {
  amount: number;
  receiptsMatch: number;
};
const ProfileAnalytics = ({ amount, receiptsMatch }: Props) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.payments}>
        <Text style={styles.value}>{numeral(amount).format('0,0')}</Text>
        <Text style={styles.title}>{t('payments')}</Text>
      </View>
      <View style={styles.receipts}>
        <Text style={styles.value}>{`${receiptsMatch}%`}</Text>
        <Text style={styles.title}>{t('hasReceipts')}</Text>
      </View>
    </View>
  );
};

export default ProfileAnalytics;
