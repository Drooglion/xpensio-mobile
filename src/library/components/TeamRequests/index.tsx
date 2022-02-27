import React from 'react';

import RequestsList from 'library/components/RequestsList';
import { IRequest } from 'types/Request';

export interface TeamRequestsProps {
  data: IRequest[];
  onRefresh(): void;
  onLoadMore(): void;
  onItemClick(item: IRequest): void;
  onApproveRequest(id: string): void;
  onDenyRequest(id: string): void;
}

const TeamRequests = ({
  data,
  onRefresh,
  onLoadMore,
  onItemClick,
  onApproveRequest,
  onDenyRequest,
}: TeamRequestsProps) => {
  /* Approve Request */
  /* const onApproveRequest = id => {
    const variables = { id, input: {} };

    updateLoadingModal({ variables: { loadingModal: true } });

    return approveRequest({ variables })
      .then(() => {
        refetchRequests();
      })
      .catch(error => {
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
  }; */

  /* Deny Request */
  /* const onDenyRequest = ({ id, reason }) => {
    const variables = { id, input: { reason } };

    updateLoadingModal({ variables: { loadingModal: true } });

    return denyRequest({ variables })
      .then(() => {
        refetchRequests();
      })
      .catch(error => {
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
  }; */

  return (
    <RequestsList
      sectionBy="status"
      onApproveRequest={onApproveRequest}
      onDenyRequest={onDenyRequest}
      data={data}
      loading={false}
      isRefreshing={false}
      onRefresh={onRefresh}
      onItemClick={onItemClick}
      loadMore={onLoadMore}
    />
  );
};

export default TeamRequests;
