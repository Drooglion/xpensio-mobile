import { useState } from 'react';

const useForm = (initial: Record<string, any>) => {
  const [inputs, setInputs] = useState(initial || {});

  const handleChange = (name: string, value: any) => {
    setInputs(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const writeInputs = async (initialData: Record<string, any>) => {
    await setInputs(initialData || {});
  };

  return {
    writeInputs,
    handleChange,
    inputs,
  };
};

export default useForm;
