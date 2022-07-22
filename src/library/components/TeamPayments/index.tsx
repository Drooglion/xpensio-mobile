import React, { useCallback } from 'react';

import PaymentsList from 'library/components/PaymentsList';
import { IPayment } from 'types/Payment';
import { useNavigation } from '@react-navigation/native';

type Props = {
  data: IPayment[];
};
type DropdownItemType = {
  id: string;
  name: string;
};

const TeamPayments = ({ data }: Props) => {
  const navigation = useNavigation();

  const onItemClick = useCallback(
    (payment: IPayment) => {
      navigation.navigate(
        'PaymentsDetails' as never,
        { payment, id: payment.id } as never,
      );
    },
    [navigation],
  );

  //const [teamIndex, setTeamIndex] = useState(0);
  //const [filterTeam, setFilterTeam] = useState(teamIndex);

  /*  const filterContent = (filters: ITeam[]) => (
    <FlatGrid
      showsVerticalScrollIndicator={false}
      data={filters}
      renderItem={({ item, index }) => (
        <Button
          style={
            filterTeam === index
              ? styles.selectedFilterContentBtn
              : styles.filterContentBtn
          }
          key={index}
          rounded
          bordered={filterTeam !== index}
          onPress={() => setFilterTeam(index)}>
          <Text
            style={
              filterTeam === index
                ? styles.selectedFilterContentText
                : styles.filterContentText
            }
            allowFontScaling={false}>
            {item.name}
          </Text>
        </Button>
      )}
    />
  ); */

  return <PaymentsList showName data={data} onItemClick={onItemClick} />;
};

export default TeamPayments;
