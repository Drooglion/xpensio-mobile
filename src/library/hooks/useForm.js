import { useState } from 'react';

const useForm = (initial) => {
  const [inputs, setInputs] = useState(initial || {});

  const handleChange = (name, value) => {
    setInputs(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const writeInputs = async (initialData) => {
    await setInputs(initialData || {});
  };

  return {
    writeInputs,
    handleChange,
    inputs,
  };
};

export default useForm;
