import React from 'react';
import { Button, Text } from 'native-base';
import { useTranslation } from 'react-i18next';

import styles from './styles';

export interface AddAnotherCardButtonProps {
  onPress(): void;
}

const AddAnotherCardButton = ({ onPress }: AddAnotherCardButtonProps) => {
  const { t } = useTranslation();
  return (
    <Button small transparent style={styles.btnOpenScanner} onPress={onPress}>
      <Text style={styles.btnTxtAction}>{t('addAnotherCard')}</Text>
    </Button>
  );
};

export default AddAnotherCardButton;
