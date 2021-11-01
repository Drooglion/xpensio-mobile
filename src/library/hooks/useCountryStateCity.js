import { useState } from 'react';
import csc from 'country-state-city';

const useCountryStateCity = (initial) => {
  const [states, setStates] = useState((initial && initial.states) || []);
  const [cities, setCities] = useState((initial && initial.cities) || []);

  const changeCountry = (code) => {
    const { id } = csc.getAllCountries().find(c => c.sortname === code);
    const data = csc.getStatesOfCountry(id);
    setStates(data);
  };

  const changeState = (id) => {
    const data = csc.getCitiesOfState(id);
    setCities(data);
  };

  return {
    changeCountry,
    changeState,
    states,
    cities,
  };
};

export default useCountryStateCity;
