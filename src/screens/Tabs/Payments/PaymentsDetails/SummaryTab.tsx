import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView } from 'react-native';
import {
  Button,
  Label,
  Item,
  Text,
  View,
  Picker,
  Icon,
  Input,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isNil, capitalize } from 'lodash';
import { useTranslation } from 'react-i18next';

import BorderedBadge from 'library/components/BorderedBadge';
import NumberUtils from 'library/utils/NumberUtils';
import StringUtils from 'library/utils/StringUtils';
import R from 'res/R';

import styles from './styles';
import PickerInput from 'library/components/PickerInput';
import useGetTeams from 'hooks/api/private/profile/useGetTeams';
import Loading from 'library/components/Loading';
import useGetCategories from 'hooks/api/private/profile/useGetCategories';
import useGetProjects from 'hooks/api/private/profile/useGetProjects';
import hooks from 'library/hooks';
import LoadingIndicator from 'library/components/LoadingIndicator';
import Payment, { PaymentStatus } from 'models/Payment';
import useGetProfile from 'hooks/api/private/profile/useGetProfile';

export interface SummaryTabProps {
  currency: string;
  payment: Payment;
  actAsAdmin: boolean;
  paymentTab: number;
  isUpdating: boolean;
  toggleDenyModal(toggle: boolean): void;
  handleSave(inputs: any): void;
}

const SummaryTab = ({
  currency,
  payment,
  actAsAdmin,
  paymentTab,
  isUpdating,
  toggleDenyModal,
  handleSave,
}: SummaryTabProps) => {
  const isIos = Platform.OS === 'ios';
  const { t } = useTranslation();
  const [userId, setUserId] = useState<string>();
  const { data: teams, isLoading: teamsLoading } = useGetTeams();
  const { data: categories, isLoading: categoriesLoading } = useGetCategories();
  const { data: projects, isLoading: projectsLoading } = useGetProjects();
  const { data: profile } = useGetProfile();

  useEffect(() => {
    setUserId(profile?.userId);
  }, [profile?.userId]);

  const { inputs, handleChange } = hooks.useForm({
    categoryId: payment ? (payment.category ? payment.category.id : '') : '',
    projectId: payment ? (payment.project ? payment.project.id : '') : '',
    teamId: payment ? (payment.team ? payment.team.id : '') : '',
    note: payment ? payment.note : '',
  });

  const onSaveChanges = () => {
    handleSave(inputs);
  };

  const renderOriginalAmount = () => {
    const { originalAmount, originalCurrency } = payment;
    return isNil(originalAmount) || originalCurrency === currency ? null : (
      <Item style={styles.item}>
        <Label style={styles.label}>{t('originalAmount')}</Label>
        <View style={styles.row}>
          <Text style={styles.text}>
            {NumberUtils.formatCurrency(originalCurrency, originalAmount)}
          </Text>
          <Text style={styles.currency}>{originalCurrency.toUpperCase()}</Text>
        </View>
      </Item>
    );
  };

  const footerActionButton = () => {
    const paymentStatus = StringUtils.paymentStatus(payment.status);
    console.log({ paymentStatus });
    const adminAction =
      actAsAdmin && paymentTab === 0 && paymentStatus === 'APPROVED';
    return adminAction ? (
      <Button
        block
        danger
        style={{ marginVertical: R.metrics.section }}
        onPress={() => toggleDenyModal(true)}>
        <Text uppercase={false}>{t('disapprovePayment')}</Text>
      </Button>
    ) : userId === payment.user.id &&
      payment.status !== PaymentStatus.DENIED ? (
      <Button
        block
        primary
        style={{ marginVertical: R.metrics.section }}
        onPress={onSaveChanges}>
        {isUpdating ? (
          <LoadingIndicator size={5} color={R.colors.white} />
        ) : (
          <Text uppercase={false}>{t('saveChanges')}</Text>
        )}
      </Button>
    ) : null;
  };

  return (
    <SafeAreaView style={styles.tabContent}>
      {teamsLoading || categoriesLoading || projectsLoading ? (
        <Loading />
      ) : (
        <>
          <Item stackedLabel style={styles.item}>
            <Label style={styles.label}>{t('paidWith')}</Label>
            <Text style={styles.text}>{`${payment.card.brand} - ${
              payment.card.last4 || ''
            }`}</Text>
          </Item>
          {payment.status !== 1 ? (
            <Item style={styles.item}>
              <Label style={styles.label}>{t('status')}</Label>
              <BorderedBadge
                text={capitalize(StringUtils.paymentStatus(payment.status))}
              />
            </Item>
          ) : null}
          {renderOriginalAmount()}
          <Item stackedLabel style={styles.item}>
            <Label style={styles.label}>{t('totalAmount')}</Label>
            <View style={styles.row}>
              <Text style={styles.text}>
                {NumberUtils.formatCurrency(currency, payment.amountTotal)}
              </Text>
              <Text style={styles.currency}>{currency.toUpperCase()}</Text>
            </View>
          </Item>
          <Item stackedLabel style={styles.item}>
            <Label style={styles.label}>{t('team')}</Label>
            {!actAsAdmin && payment.status !== PaymentStatus.DENIED ? (
              <View style={styles.selectRow}>
                {teams && (
                  <PickerInput
                    enabled={!isUpdating}
                    mode="dropdown"
                    onValueChange={(text: string) =>
                      handleChange('teamId', text)
                    }
                    placeholder={R.strings.selectTeam}
                    placeHolderStyle={styles.placeholder}
                    placeholderIconColor={R.colors.subhead}
                    selectedValue={inputs.teamId}>
                    {teams
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map(i => (
                        <Picker.Item key={i.id} label={i.name} value={i.id} />
                      ))}
                  </PickerInput>
                )}
                {isIos && (
                  <Icon name="chevron-down" style={styles.dropdownIcon} />
                )}
              </View>
            ) : (
              <Text style={styles.text}>
                {payment ? (payment.team ? payment.team.name : '') : ''}
              </Text>
            )}
          </Item>
          <Item stackedLabel style={styles.item}>
            <Label style={styles.label}>{t('category')}</Label>
            {!actAsAdmin && payment.status !== PaymentStatus.DENIED ? (
              <View style={styles.selectRow}>
                {categories && (
                  <PickerInput
                    enabled={!isUpdating}
                    mode="dropdown"
                    onValueChange={(text: string) =>
                      handleChange('categoryId', text)
                    }
                    placeholder={R.strings.selectCategory}
                    placeHolderStyle={styles.placeholder}
                    placeholderIconColor={R.colors.subhead}
                    selectedValue={inputs.categoryId}>
                    {categories
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map(i => (
                        <Picker.Item key={i.id} label={i.name} value={i.id} />
                      ))}
                  </PickerInput>
                )}
                {isIos && (
                  <Icon name="chevron-down" style={styles.dropdownIcon} />
                )}
              </View>
            ) : (
              <Text style={styles.text}>
                {payment ? (payment.category ? payment.category.name : '') : ''}
              </Text>
            )}
          </Item>
          <Item stackedLabel style={styles.item}>
            <Label style={styles.label}>{t('project')}</Label>
            {!actAsAdmin && payment.status !== PaymentStatus.DENIED ? (
              <View style={styles.selectRow}>
                {projects && (
                  <PickerInput
                    enabled={!isUpdating}
                    mode="dropdown"
                    onValueChange={(text: string) =>
                      handleChange('projectId', text)
                    }
                    placeholder={R.strings.selectProject}
                    placeHolderStyle={styles.placeholder}
                    placeholderIconColor={R.colors.subhead}
                    selectedValue={inputs.projectId}>
                    {projects
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map(i => (
                        <Picker.Item key={i.id} label={i.name} value={i.id} />
                      ))}
                  </PickerInput>
                )}
                {isIos && (
                  <Icon name="chevron-down" style={styles.dropdownIcon} />
                )}
              </View>
            ) : (
              <Text style={styles.text}>
                {payment ? (payment.project ? payment.project.name : '') : ''}
              </Text>
            )}
          </Item>
          <Item
            stackedLabel
            style={
              !actAsAdmin && payment.status !== PaymentStatus.DENIED
                ? styles.itemInput
                : styles.item
            }>
            <Label style={styles.label}>{t('notes')}</Label>
            {!actAsAdmin && payment.status !== PaymentStatus.DENIED ? (
              <Input
                disabled={isUpdating}
                returnKeyType="done"
                autoCorrect={false}
                style={styles.input}
                placeholder={t('addNotes')}
                onChangeText={(text: string) => handleChange('note', text)}
                value={inputs.note}
              />
            ) : (
              <Text style={styles.text}>{payment ? payment.note : ''}</Text>
            )}
          </Item>
          {footerActionButton()}
        </>
      )}
    </SafeAreaView>
  );
};

export default SummaryTab;
