import React from 'react';

import EmptyCard from 'library/components/EmptyCard';
import R from 'res/R';
import { useResource } from 'contexts/resourceContext';

export interface EmptyVirtualCardProps {
  isDisabled: boolean;
  requested?: boolean;
  onRequestCard(): void;
}

const EmptyVirtualCard = ({
  isDisabled,
  requested = false,
  onRequestCard,
}: EmptyVirtualCardProps) => {
  const {
    state: { actAsAdmin },
  } = useResource();
  const defaultButtonText = actAsAdmin
    ? R.strings.addCard
    : R.strings.requestCard;

  return (
    <EmptyCard
      title={R.strings.virtualCard}
      description={R.strings.emptyVirtualCardDesc}
      btnText={requested ? R.strings.requested : defaultButtonText}
      onPress={onRequestCard}
      disabled={isDisabled}
    />
  );
};

export default EmptyVirtualCard;
