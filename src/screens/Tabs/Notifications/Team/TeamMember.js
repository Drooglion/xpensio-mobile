/* eslint-disable import/no-unresolved */
import React, { PureComponent } from 'react';
import {
  Container,
  Content,
  Text,
  Button,
  View,
  StyleProvider,
} from 'native-base';
import {
  Query,
  graphql,
  withApollo,
  compose
} from 'react-apollo';
import * as Animatable from 'react-native-animatable';

import TEAMS from 'library/api/Teams';
import CARDS from 'library/api/Cards';
import STORE_QUERIES from 'library/store/queries';

import LoadingIndicator from 'library/components/LoadingIndicator';
import Loading from 'library/components/Loading';
import Header from 'library/components/Header';
import Divider from 'library/components/Divider';
import MemberCardsList from 'library/components/MemberCardsList';
import MemberRulesList from 'library/components/MemberRulesList';
import AddRuleModal from 'library/components/AddRuleModal';
import EditRuleModal from 'library/components/EditRuleModal';
import HelperUtils from 'library/utils/HelperUtils';
import NumberUtils from 'library/utils/NumberUtils';
import R from 'res/R';
import getTheme from 'native-base-theme/components';
import theme from 'native-base-theme/variables/theme';
import styles from './TeamMemberStyles';

class TeamMember extends PureComponent {
  state = {
    slider: 0,
    addRuleType: 1,
    showAddRule: false,
    showEditRule: false,
    submittingAddRule: false,
  }

  onCardActionClick = (item) => {
    console.log(item);
  }

  onMonthlyLimitEdit = (item) => {
    console.log(item);
  }

  onPerPurchaseLimitEdit = (item) => {
    console.log(item);
  }

  onAddRule = () => {
    this.setState({ showAddRule: true });
  }

  addRule = () => {
    this.setState({ submittingAddRule: true });
    const { slider, addRuleType } = this.state;
    const { setCardRule, navigation } = this.props;
    const member = navigation.state.params;
    const variables = {
      memberId: member.memberId,
      teamId: member.teamId,
      input: [
        {
          cardRuleId: addRuleType,
          value: slider
        }
      ]
    };

    setCardRule({ variables })
      .then(() => {
        this.closeAddRule();
      }).catch((error) => {
        HelperUtils.bugsnag.notify(error);
      });
  }

  onEditRule = (item) => {
    this.setState({
      showEditRule: true,
      addRuleType: item.rule
    });
  }

  editRule = () => {
    this.setState({ submittingAddRule: true });
    const { slider, addRuleType } = this.state;
    const { setCardRule, navigation } = this.props;
    const member = navigation.state.params;
    const variables = {
      memberId: member.memberId,
      teamId: member.teamId,
      input: [
        {
          cardRuleId: addRuleType,
          value: slider
        }
      ]
    };

    setCardRule({ variables })
      .then(() => {
        this.closeEditRule();
      }).catch((error) => {
        HelperUtils.bugsnag.notify(error);
      });
  }

  closeAddRule = () => {
    this.setState({
      showAddRule: false,
      addRuleType: 1,
      slider: 0,
      submittingAddRule: false,
    });
  }

  closeEditRule = () => {
    this.setState({
      showEditRule: false,
      addRuleType: 1,
      slider: 0,
      submittingAddRule: false,
    });
  }

  hanldeAddRuleSlider = (slider) => {
    this.setState({ slider });
  }

  handleAddRuleType = (addRuleType) => {
    this.setState({ addRuleType });
  }

  renderVirtualCardRequest = (notifications) => {
    const requests = notifications.filter(item => item.type === 'request' && item.cardType === 'virtual');
    return requests.length > 0
      ? (
        <View>
          <Text style={styles.bodyText}>{R.strings.memberRequestedVirtualCard}</Text>
          <View style={styles.horizontalActions}>
            <Button transparent style={styles.approveBtn}>
              <Text uppercase style={styles.approveText}>{R.strings.approve}</Text>
            </Button>
            <Button transparent style={styles.denyBtn}>
              <Text uppercase style={styles.denyText}>{R.strings.deny}</Text>
            </Button>
          </View>
        </View>
      ) : (
        <Button solid primary style={styles.issueCardBtn}>
          <Text style={styles.issueCardText}>{R.strings.issueVirtualCard}</Text>
        </Button>
      );
  }

  renderPlasticCardRequest = (notifications) => {
    const requests = notifications.filter(item => item.type === 'request' && item.cardType === 'plastic');
    return requests.length > 0
      ? (
        <View>
          <Text style={styles.bodyText}>{R.strings.memberRequestedPlasticCard}</Text>
          <View style={styles.horizontalActions}>
            <Button transparent style={styles.approveBtn}>
              <Text uppercase style={styles.approveText}>{R.strings.approve}</Text>
            </Button>
            <Button transparent style={styles.denyBtn}>
              <Text uppercase style={styles.denyText}>{R.strings.deny}</Text>
            </Button>
          </View>
        </View>
      ) : (
        <Button solid primary style={styles.issueCardBtn}>
          <Text style={styles.issueCardText}>{R.strings.issuePlasticCard}</Text>
        </Button>
      );
  }

  loader = () => (
    <View>
      <LoadingIndicator />
    </View>
  );

  availableRules = (rules) => {
    const rulesIds = [];
    rules.forEach(rule => rulesIds.push(rule.rule));
    const availableRules = [
      { id: 1, text: R.strings.monthlyLimit },
      { id: 2, text: R.strings.limitPerPayment }
    ];

    return availableRules.filter(rule => !rulesIds.includes(rule.id));
  }

  render() {
    const {
      navigation,
      companyConfiguration: { currency },
    } = this.props;
    const member = navigation.state.params;
    const {
      showAddRule,
      slider,
      addRuleType,
      submittingAddRule,
      showEditRule,
    } = this.state;
    const {
      memberId,
      teamId,
      firstName,
      lastName
    } = member;
    const name = `${firstName} ${lastName}`;
    return (
      <StyleProvider style={getTheme(theme)}>
        <Container>
          <Header
            hasBack
            title={name}
            onBackPress={() => navigation.goBack()}
          />
          <Content contentContainerStyle={styles.content}>
            <Query
              query={TEAMS.TEAM_MEMBER}
              variables={{ teamId, memberId }}
            >
              {({ error, loading, data }) => {
                if (error) {
                  HelperUtils.bugsnag.notify(error);
                  return null;
                }
                if (loading) return <Loading />;

                const { teams: { payload } } = data;
                const virtual = payload.cards.filter(item => item.type === 'virtual');
                const plastic = payload.cards.filter(item => item.type === 'plastic');
                return (
                  <Animatable.View animation="fadeIn">
                    <AddRuleModal
                      isVisible={showAddRule}
                      slider={slider}
                      handleSlider={this.hanldeAddRuleSlider}
                      handleAddRuleType={this.handleAddRuleType}
                      onCancel={this.closeAddRule}
                      onSubmit={this.addRule}
                      submitDisabled={submittingAddRule}
                      rules={this.availableRules(payload.rules)}
                      addRuleType={addRuleType}
                    />
                    <EditRuleModal
                      isVisible={showEditRule}
                      slider={slider}
                      handleSlider={this.hanldeAddRuleSlider}
                      onCancel={this.closeEditRule}
                      onSubmit={this.editRule}
                      submitDisabled={submittingAddRule}
                    />
                    <View style={styles.section}>
                      <Text uppercase style={styles.sectionTitle}>
                        {R.strings.availableBalance}
                      </Text>
                      <Text style={styles.balance}>
                        {NumberUtils.formatCurrency(
                          currency, payload.availableBalance
                        )}
                      </Text>
                    </View>
                    <Divider />
                    <View style={styles.section}>
                      <Text uppercase style={styles.sectionTitle}>{R.strings.virtualCards}</Text>
                      {
                        // eslint-disable-next-line no-nested-ternary
                        virtual.length > 0
                          ? <MemberCardsList data={virtual} onItemClick={this.onCardActionClick} />
                          : (
                            <Button solid primary style={styles.issueCardBtn}>
                              <Text style={styles.issueCardText}>
                                {R.strings.issueVirtualCard}
                              </Text>
                            </Button>
                          )
                      }
                    </View>
                    <Divider />
                    <View style={styles.section}>
                      <Text uppercase style={styles.sectionTitle}>{R.strings.plasticCards}</Text>
                      {
                        // eslint-disable-next-line no-nested-ternary
                        plastic.length > 0
                          ? <MemberCardsList data={plastic} onItemClick={this.onCardActionClick} />
                          : (
                            <Button solid primary style={styles.issueCardBtn}>
                              <Text style={styles.issueCardText}>{R.strings.issuePlasticCard}</Text>
                            </Button>
                          )
                      }
                    </View>
                    <Divider />
                    <View style={styles.section}>
                      <Text uppercase style={styles.sectionTitle}>{R.strings.rules}</Text>
                      {
                        payload.rules.length > 0
                          ? (
                            <MemberRulesList
                              data={payload.rules}
                              onMonthlyLimitClick={this.onMonthlyLimitEdit}
                              onPerPurchaseLimitClick={this.onPerPurchaseLimitEdit}
                              onEditRuleType={this.onEditRule}
                            />
                          ) : null
                      }
                      {
                        payload.rules.length < 2
                          ? (
                            <Button
                              solid
                              primary
                              style={styles.addRuleBtn}
                              onPress={this.onAddRule}
                            >
                              <Text style={styles.addRuleText}>
                                {R.strings.addRule}
                              </Text>
                            </Button>
                          ) : null
                      }
                    </View>
                  </Animatable.View>
                );
              }}
            </Query>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

export default compose(
  withApollo,
  graphql(
    CARDS.SET_CARD_RULE, {
      name: 'setCardRule',
      options: props => ({
        refetchQueries: [{
          query: TEAMS.TEAM_MEMBER,
          variables: {
            teamId: props.navigation.state.params.teamId,
            memberId: props.navigation.state.params.memberId
          }
        }]
      })
    }
  ),
  graphql(
    STORE_QUERIES.companyConfiguration, {
      props: ({ data: { companyConfiguration } }) => ({
        companyConfiguration
      })
    }
  )
)(TeamMember);
