import React from 'react';

import EmptyCard from 'library/components/EmptyCard';
import R from 'res/R';

export interface EmptyVirtualCardProps {
  disabled: boolean;
  isAdmin?: boolean;
  requested?: boolean;
  onRequestCard(): void;
}

const EmptyVirtualCard = ({
  disabled,
  isAdmin = false,
  requested = false,
  onRequestCard,
}: EmptyVirtualCardProps) => {
  const defaultButtonText = !isAdmin
    ? R.strings.requestCard
    : R.strings.addCard;

  return (
    <EmptyCard
      title={R.strings.virtualCard}
      description={R.strings.emptyVirtualCardDesc}
      btnText={requested ? R.strings.requested : defaultButtonText}
      onPress={onRequestCard}
      disabled={disabled}
    />
  );
};

export default EmptyVirtualCard;
