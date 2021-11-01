/* eslint-disable import/no-unresolved */
/* eslint-disable no-lonely-if */
import React from 'react';
import PropTypes from 'prop-types';
import { compose, graphql, Query } from 'react-apollo';

import REQUESTS from 'library/api/Requests';

import STORE_MUTATIONS from 'library/store/mutations';
import ListLoader from 'library/components/ListLoader';
import RequestsList from 'library/components/RequestsList';
import HelperUtils from 'library/utils/HelperUtils';

import styles from './styles';

const TeamRequests = ({
  approveRequest,
  denyRequest,
  showDialogModal,
  updateLoadingModal,
  onItemClick,
}) => {
  let page = 1;
  let refetchRequests = () => {};

  /* Approve Request */
  const onApproveRequest = (id) => {
    const variables = { id, input: {} };

    updateLoadingModal({ variables: { loadingModal: true } });

    return approveRequest({ variables })
      .then(() => { refetchRequests(); })
      .catch((error) => {
        let errorMessage = '';
        if (error.networkError && error.networkError.result) {
          [errorMessage] = error.networkError.result.payload.messages;
        } else {
          errorMessage = error.message;
        }
        updateLoadingModal({ variables: { loadingModal: false } });
        setTimeout(() => {
          showDialogModal({ variables: { description: errorMessage } });
        }, 500);
      });
  };

  /* Deny Request */
  const onDenyRequest = ({ id, reason }) => {
    const variables = { id, input: { reason } };

    updateLoadingModal({ variables: { loadingModal: true } });

    return denyRequest({ variables })
      .then(() => { refetchRequests(); })
      .catch((error) => {
        let errorMessage = '';
        if (error.networkError && error.networkError.result) {
          [errorMessage] = error.networkError.result.payload.messages;
        } else {
          errorMessage = error.message;
        }
        updateLoadingModal({ variables: { loadingModal: false } });
        setTimeout(() => {
          showDialogModal({ variables: { description: errorMessage } });
        }, 500);
      });
  };

  return (
    <Query
      query={REQUESTS.TEAM_REQUESTS}
      variables={{ page }}
      fetchPolicy="network-only"
    >
      {({
        error,
        loading,
        data,
        fetchMore,
        refetch,
      }) => {
        if (error) {
          HelperUtils.bugsnag.notify(error);
          return null;
        }

        if (loading) return <ListLoader style={styles.listLoader} />;

        /* Assign refetch function */
        refetchRequests = refetch;

        /* Render Request list */
        const { teamRequests: { payload: { result } } } = data;
        return (
          <RequestsList
            sectionBy="status"
            onApproveRequest={onApproveRequest}
            onDenyRequest={onDenyRequest}
            data={result}
            refetch={refetch}
            loading={false}
            isRefreshing={false}
            onRefresh={() => { refetch(); page = 1; }}
            onItemClick={onItemClick}
            loadMore={() => {
              page += 1;
              fetchMore({
                variables: { page },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return prev;
                  return Object.assign({}, prev, {
                    teamRequests: {
                      ...prev.teamRequests,
                      payload: {
                        ...prev.teamRequests.payload,
                        result: [
                          ...prev.teamRequests.payload.result,
                          ...fetchMoreResult.teamRequests.payload.result
                        ]
                      }
                    }
                  });
                }
              });
            }}
          />
        );
      }}
    </Query>
  );
};

TeamRequests.propTypes = {
  onItemClick: PropTypes.func.isRequired,
};

export default compose(
  graphql(REQUESTS.APPROVE_REQUEST, { name: 'approveRequest' }),
  graphql(REQUESTS.DENY_REQUEST, { name: 'denyRequest' }),
  graphql(STORE_MUTATIONS.showDialogModal, { name: 'showDialogModal' }),
  graphql(STORE_MUTATIONS.updateLoadingModal, { name: 'updateLoadingModal' }),
)(TeamRequests);
