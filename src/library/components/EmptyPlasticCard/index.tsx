import React from 'react';

import EmptyCard from 'library/components/EmptyCard';
import R from 'res/R';

export interface EmptyPlasticCardProps {
  disabled: boolean;
  isAdmin?: boolean;
  requested?: boolean;
  onRequestCard(): void;
}

const EmptyPlasticCard = ({
  disabled,
  isAdmin = false,
  requested,
  onRequestCard,
}: EmptyPlasticCardProps) => {
  const defaultButtonText = !isAdmin
    ? R.strings.requestCard
    : R.strings.getCard;

  return (
    <EmptyCard
      title={R.strings.plasticCard}
      description={R.strings.plasticCardDesc}
      btnText={requested ? R.strings.requested : defaultButtonText}
      onPress={onRequestCard}
      disabled={disabled}
    />
  );
};

export default EmptyPlasticCard;
