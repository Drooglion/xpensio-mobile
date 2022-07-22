import React, { Fragment } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Item, Text, Footer, FooterTab, View } from 'native-base';
import moment from 'moment';
import { startCase, toLower } from 'lodash';
import { useTranslation } from 'react-i18next';

import BorderedBadge from 'library/components/BorderedBadge';

import NumberUtils from 'library/utils/NumberUtils';
import StringUtils from 'library/utils/StringUtils';
import R from 'res/R';

import styles from './styles';
import { IRequest } from 'types/Request';
import HelperUtils from 'library/utils/HelperUtils';

type DetailsTabProps = {
  currency: string;
  isAdmin: boolean;
  request: IRequest;
  onApprove(): void;
  onDeny(): void;
};

const DetailsTab = ({
  currency,
  isAdmin,
  request,
  onApprove,
  onDeny,
}: DetailsTabProps) => {
  const { t } = useTranslation();
  const statusColor = {
    borderColor: HelperUtils.statusColor(request.status) || '#AAA',
    backgroundColor: HelperUtils.statusColor(request.status) || '#AAA',
  };
  return (
    <Fragment>
      <View style={styles.tabContent}>
        <View>
          <Item style={styles.descriptionItem}>
            <Text uppercase style={styles.descriptionLabel}>
              {t('title')}
            </Text>
            <Text style={styles.descriptionText}>{request.title}</Text>
          </Item>
          <Item style={styles.descriptionItem}>
            <Text uppercase style={styles.descriptionLabel}>
              {t('description')}
            </Text>
            <Text style={styles.descriptionText}>{request.description}</Text>
          </Item>
          <Item style={styles.descriptionItem}>
            <Text uppercase style={styles.descriptionLabel}>
              {t('status')}
            </Text>
            <BorderedBadge
              style={statusColor}
              text={StringUtils.formatStatus(request.status)}
            />
          </Item>
          <Item style={styles.descriptionItem}>
            <Text uppercase style={styles.descriptionLabel}>
              {t('team')}
            </Text>
            <Text style={styles.descriptionText}>
              {request.team ? request.team.name : ''}
            </Text>
          </Item>
          <Item style={styles.descriptionItem}>
            <Text uppercase style={styles.descriptionLabel}>
              {t('category')}
            </Text>
            <BorderedBadge
              text={request.category ? request.category.name : ''}
            />
          </Item>
          <Item style={styles.descriptionItem}>
            <Text uppercase style={styles.descriptionLabel}>
              {t('project')}
            </Text>
            <Text style={styles.descriptionText}>
              {request.project ? request.project.name : ''}
            </Text>
          </Item>
          <Item style={styles.descriptionItem}>
            <Text uppercase style={styles.descriptionLabel}>
              {t('dateRequested')}
            </Text>
            <Text style={styles.descriptionText}>
              {moment(request.createdAt).format('MMMM DD, YYYY')}
            </Text>
          </Item>
          <Item style={styles.descriptionItem}>
            <Text uppercase style={styles.descriptionLabel}>
              {t('purchaseType')}
            </Text>
            <Text style={styles.descriptionText}>
              {startCase(
                toLower(StringUtils.formatExpense(request.typeOfExpense)),
              )}
            </Text>
          </Item>
          <Item style={styles.descriptionItem}>
            <Text uppercase style={styles.descriptionLabel}>
              {t('amount')}
            </Text>
            <Text style={styles.descriptionText}>
              {NumberUtils.formatCurrency(currency, request.amount)}
            </Text>
          </Item>
        </View>
      </View>
      {request.status === 0 && isAdmin ? (
        <Footer style={styles.footer}>
          <FooterTab style={styles.footerTab}>
            <Button bordered danger onPress={onDeny} style={styles.btnAction}>
              <Text>{t('deny')}</Text>
            </Button>
            <Button success onPress={onApprove} style={styles.btnAction}>
              <Text style={{ color: R.colors.white }}>{t('approve')}</Text>
            </Button>
          </FooterTab>
        </Footer>
      ) : null}
    </Fragment>
  );
};
export default DetailsTab;
