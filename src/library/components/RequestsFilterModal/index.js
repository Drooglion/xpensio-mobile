/* eslint-disable import/no-unresolved */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Header,
  Right,
  Content,
  Button,
  Text,
  Icon,
  Footer,
  FooterTab,
  StyleProvider,
} from 'native-base';
import Modal from 'react-native-modal';
import { withApollo } from 'react-apollo';
import moment from 'moment';
import { isEmpty } from 'lodash';

import CATEGORIES from 'library/api/Categories';

import RadioFilters from 'library/components/RadioFilters';
import DateFilters from 'library/components/DateFilters';
import R from 'res/R';
import getTheme from 'native-base-theme/components';
import theme from 'native-base-theme/variables/theme';
import styles from './styles';

const statusData = [
  {
    description: 'Pending',
    value: 'pending',
    checked: false,
  },
  {
    description: 'Approved',
    value: 'approved',
    checked: true,
  },
  {
    description: 'Denied',
    value: 'denied',
    checked: false,
  },
  {
    description: 'Expired',
    value: 'expired',
    checked: false,
  },
  {
    description: 'Unsettled',
    value: 'unsettled',
    checked: false,
  },
  {
    description: 'Cancelled',
    value: 'cancelled',
    checked: false,
  }
];
const datesData = [
  {
    description: 'This month',
    range: {
      from: moment().startOf('month').format('YYYY-MM-DD'),
      to: moment().endOf('month').format('YYYY-MM-DD')
    },
    checked: false,
  },
  {
    description: 'Last 30 days',
    range: {
      from: moment().subtract(30, 'days').format('YYYY-MM-DD'),
      to: moment().format('YYYY-MM-DD')
    },
    checked: false,
  },
  {
    description: 'Custom',
    checked: false,
    range: {
      from: '',
      to: '',
    }
  }
];

class RequestsFilterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      status: [],
      dates: [],
      expanded: '',
    };
  }

  componentWillMount() {
    this.setState({
      categories: [],
      status: statusData,
      dates: datesData,
      expanded: 'status'
    });
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = () => {
    const { client } = this.props;
    client.query({ query: CATEGORIES.GET_CATEGORIES })
      .then((res) => {
        const { data: { categories: { payload } } } = res;

        this.setState(prevState => ({
          categories: [
            ...prevState.categories,
            ...payload.map(category => ({
              description: category.name,
              value: category.id,
              checked: false
            })),
          ],
        }));
      });
  }

  onCategorySelected = (item) => {
    if (item === null) return;
    const { categories } = this.state;
    let copy;
    if (item.value.toLowerCase() === 'all') {
      copy = categories.map(i => (
        { ...i, checked: !item.checked }
      ));
    } else {
      copy = categories.map(i => (
        i.value === item.value ? { ...i, checked: true } : { ...i, checked: false }
      ));
    }

    this.setState({ categories: copy });
  }

  onReceiptSelected = (item) => {
    if (item === null) return;
    const { status } = this.state;
    let copy;
    if (item.description.toLowerCase() === 'all') {
      copy = status.map(i => (
        { ...i, checked: !item.checked }
      ));
    } else {
      copy = status.map(i => (
        { ...i, checked: false }
      ));
      copy = copy.map(i => (
        i.description === item.description ? { ...i, checked: !item.checked } : i
      ));
    }

    this.setState({ status: copy });
  }

  onDateSelected = (item) => {
    if (item === null) return;
    const { dates } = this.state;
    let copy;
    copy = dates.map(i => (
      { ...i, checked: false }
    ));
    copy = copy.map(i => (
      i.description === item.description ? { ...i, checked: true } : i
    ));

    this.setState({ dates: copy });
  }

  onRangeSelected = (s, e) => {
    const { dates } = this.state;
    const copy = dates.map((i) => {
      if (i.description.toLowerCase() === 'custom') {
        return { ...i, range: { from: s, to: e } };
      }
      return { ...i };
    });
    this.setState({ dates: copy });
  }

  handleSubmit = () => {
    const { onApplyFilterPress } = this.props;
    const { categories, status, dates } = this.state;
    const date = dates.filter(({ checked }) => checked);
    const category = categories.filter(({ checked }) => checked);
    const states = status.filter(({ checked }) => checked);
    const filter = {
      category: !isEmpty(category) ? category[0].value : '',
      status: !isEmpty(states) ? states[0].value : '',
      start_date: !isEmpty(date) && date[0].range ? date[0].range.from : '',
      end_date: !isEmpty(date) && date[0].range ? date[0].range.to : ''
    };

    onApplyFilterPress(filter);
  }

  toggleExpandedFilter = (value) => {
    const { expanded } = this.state;
    if (expanded === value) {
      this.setState({ expanded: '' });
    } else {
      this.setState({ expanded: value });
    }
  }

  render() {
    const { onHide, isVisible } = this.props;
    const { categories, status, dates, expanded } = this.state;
    return (
      <Modal
        animationIn="fadeInUpBig"
        hideModalContentWhileAnimating
        isVisible={isVisible}
        style={{ margin: 0 }}
        useNativeDriver
      >
        <StyleProvider style={getTheme(theme)}>
          <Container style={styles.container}>
            <Header
              noLeft
              noShadow
              transparent
              iosBarStyle="dark-content"
              androidStatusBarColor={R.colors.white}
            >
              <Right>
                <Button
                  icon
                  transparent
                  style={styles.btnClose}
                  onPress={onHide}
                >
                  <Icon name="ios-close" style={styles.iconClose} />
                </Button>
              </Right>
            </Header>
            <Content style={styles.content}>
              <Text style={styles.title}>{R.strings.filterBy}</Text>
              <RadioFilters
                title="Status"
                data={status}
                onOptionSelect={this.onReceiptSelected}
                expanded={expanded === 'status'}
                onItemPress={() => this.toggleExpandedFilter('status')}
              />
              <RadioFilters
                title="Categories"
                data={categories}
                onOptionSelect={this.onCategorySelected}
                expanded={expanded === 'categories'}
                onItemPress={() => this.toggleExpandedFilter('categories')}
              />
              <DateFilters
                title="Date Range"
                data={dates}
                onOptionSelect={this.onDateSelected}
                onRangeSelect={this.onRangeSelected}
                expanded={expanded === 'date-range'}
                onItemPress={() => this.toggleExpandedFilter('date-range')}
              />
            </Content>
            <Footer transparent style={styles.footer}>
              <FooterTab style={styles.footerTab}>
                <Button
                  primary
                  solid
                  style={styles.btnApply}
                  onPress={this.handleSubmit}
                >
                  <Text style={styles.txtApply}>{R.strings.apply}</Text>
                </Button>
              </FooterTab>
            </Footer>
          </Container>
        </StyleProvider>
      </Modal>
    );
  }
}

RequestsFilterModal.propTypes = {
  isVisible: PropTypes.bool,
  onApplyFilterPress: PropTypes.func.isRequired,
};

RequestsFilterModal.defaultProps = {
  isVisible: false,
};

export default withApollo(RequestsFilterModal)
