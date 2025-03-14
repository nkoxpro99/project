import { createContext, ReactNode, useContext, useMemo, useReducer, useState } from 'react';

import { StepperItemType } from '../models/stepper-item.model';

export type StepperContextType = {
  currentItem: StepperItemType | undefined;
  currentIndex: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  items: StepperItemType[];
  jump: (step: number) => void;
  next: () => void;
  back: () => void;
  isCanNext?: boolean;
  setCanNext: (canNext: boolean) => void;
  isDisable?: boolean;
  setDisable: (disable: boolean) => void;
};

const StepperContext = createContext<StepperContextType | undefined>(undefined);

export type StepperProviderProps = StepperContextType & {
  children?: ReactNode;
};

export function StepperProvider({ children, ...context }: StepperProviderProps) {
  const value = useMemo(() => context, Object.values(context)) as StepperContextType;

  return <StepperContext.Provider value={value}>{children}</StepperContext.Provider>;
}

export function useStepperContext(scope: string) {
  const context = useContext(StepperContext);

  if (context === undefined) throw Error(`StepperContext - ${scope}: The component is not inside the provider`);

  return context;
}
