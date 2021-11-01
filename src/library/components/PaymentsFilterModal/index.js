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
  View,
} from 'native-base';
import moment from 'moment';
import { withApollo } from 'react-apollo';
import { isEmpty } from 'lodash';

import CATEGORIES from 'library/api/Categories';

import BottomSheet from 'library/components/BottomSheet';
import DateFilters from 'library/components/DateFilters';
import R from 'res/R';
import getTheme from 'native-base-theme/components';
import theme from 'native-base-theme/variables/theme';

const categoriesData = [
  {
    description: 'All',
    checked: false,
    value: ''
  }
];

const receiptsData = [
  {
    description: 'All',
    checked: false,
    value: ''
  },
  {
    description: 'No receipt',
    checked: false,
    value: 0
  },
  {
    description: 'Has receipt',
    checked: false,
    value: 1
  }
];
const datesData = [
  {
    description: 'This month',
    checked: true,
    range: {
      from: moment().startOf('month').format('YYYY-MM-DD'),
      to: moment().endOf('month').format('YYYY-MM-DD')
    }
  },
  {
    description: 'Last 30 days',
    checked: false,
    range: {
      from: moment().subtract(30, 'days').format('YYYY-MM-DD'),
      to: moment().format('YYYY-MM-DD')
    }
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

class PaymentsFilterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      receipts: [],
      dates: [],
      teams: [],
      expanded: '',
    };
  }

  componentWillMount() {
    const { withTeamFilter } = this.props;

    this.setState({
      categories: categoriesData,
      receipts: receiptsData,
      dates: datesData,
      expanded: withTeamFilter ? 'teams' : 'categories',
    });
  }

  componentDidMount() {
    this.fetchCategories();
  }

  componentWillReceiveProps(nextProps) {
    const { teamListData } = this.props;
    if (nextProps.teamListData !== teamListData) {
      this.setState({
        teams: nextProps.teamListData.map((team, index) => ({
          description: team.text,
          value: team.value,
          checked: index === 0
        }))
      });
    }
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
    if (item.description.toLowerCase() === 'all') {
      copy = categories.map(i => (
        { ...i, checked: !item.checked }
      ));
    } else {
      copy = categories.map(i => (
        i.value === item.value
          ? { ...i, checked: !item.checked }
          : { ...i, checked: false }
      ));
    }

    this.setState({ categories: copy });
  }

  onReceiptSelected = (item) => {
    if (item === null) return;
    const { receipts } = this.state;
    let copy;
    if (item.description.toLowerCase() === 'all') {
      copy = receipts.map(i => (
        { ...i, checked: !item.checked }
      ));
    } else {
      copy = receipts.map(i => (
        i.description === item.description ? { ...i, checked: true } : { ...i, checked: false }
      ));
    }

    this.setState({ receipts: copy });
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

  onTeamSelected = (item) => {
    if (item === null) return;
    const { teams } = this.state;

    this.setState({
      teams: teams.map(i => (
        i.value === item.value
          ? { ...i, checked: true }
          : { ...i, checked: false }
      )),
    });
  }

  handleSubmit = () => {
    const { onApplyFilterPress } = this.props;
    const {categories, receipts, dates, teams } = this.state;
    const team = teams.filter(({ checked }) => checked);
    const date = dates.filter(({ checked }) => checked);
    const category = categories.filter(({ checked }) => checked);
    const receipt = receipts.filter(({ checked }) => checked);
    const filter = {
      team: !isEmpty(team) ? team[0].value : '',
      category: !isEmpty(category) ? category[0].value : '',
      receipt: !isEmpty(receipt) ? receipt[0].value : '',
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
    const { isVisible, onHide } = this.props;
    const {
      categories,
      receipts,
      dates,
      teams,
      expanded,
    } = this.state;
    return (
      <BottomSheet
        isVisible={isVisible}
        sheetHeight={0.8}
      >
        <Content>
        </Content>
      </BottomSheet>
    );
  }
}

PaymentsFilterModal.propTypes = {
  isVisible: PropTypes.bool,
  onHide: PropTypes.func.isRequired,
  onApplyFilterPress: PropTypes.func.isRequired,
  teamListData: PropTypes.arrayOf(PropTypes.any),
  withTeamFilter: PropTypes.bool,
};

PaymentsFilterModal.defaultProps = {
  isVisible: false,
  teamListData: [],
  withTeamFilter: false,
};

export default withApollo(PaymentsFilterModal);
