import styled from 'styled-components';

import { useStepperContext } from './context/StepperContext';
import { StepperItem } from './StepperItem';

export function StepperProgression() {
  const { items } = useStepperContext(StepperProgression.name);

  return <Container>{items?.map((it) => <StepperItem key={it.label} {...it} />)}</Container>;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
  isolation: isolate;
`;
