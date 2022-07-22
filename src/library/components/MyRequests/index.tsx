import React from 'react';

import RequestsList from 'library/components/RequestsList';
import { IRequest } from 'types/Request';

export interface MyRequestsProps {
  data: IRequest[];
  onRefresh(): void;
  onLoadMore?(): void;
  onItemClick(item: IRequest): void;
}

const MyRequests = ({
  data,
  onRefresh,
  onLoadMore,
  onItemClick,
}: MyRequestsProps) => {
  return (
    <RequestsList
      data={data}
      loading={false}
      isRefreshing={false}
      onRefresh={onRefresh}
      loadMore={onLoadMore}
      onItemClick={onItemClick}
      showName={false}
    />
  );
};

export default MyRequests;
