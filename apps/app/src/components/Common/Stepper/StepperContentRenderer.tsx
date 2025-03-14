import { useStepperContext } from './context';

export function StepperContentRenderer() {
  const { currentItem } = useStepperContext(StepperContentRenderer.name);

  return <div>{currentItem?.content}</div>;
}
