import { useEffect, useState } from 'react';

export const useLocalVariablesHydration = <T extends string | number | object>(
  currentValue: T,
  initialValue: T,
) => {
  const [variable, setVariable] = useState(initialValue);

  useEffect(() => {
    setVariable(currentValue);
  }, [currentValue]);

  return variable;
};
