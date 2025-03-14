import { Close as RadixDialogClose } from '@radix-ui/react-dialog';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import styled from 'styled-components';

import { Button } from '../Button';
import { DialogContext, useDialogContext } from './Dialog';

export type ConfirmDialogActionHelpers = Omit<DialogContext, 'children'>;

export type ConfirmDialogActionProps = {
  disabled?: boolean;
  acceptText?: string;
  acceptDisable?: boolean;
  cancelText?: string;
  onAccept?: (helpers: ConfirmDialogActionHelpers) => void;
  onCancel?: () => void;
};

export function ConfirmDialogAction({
  acceptText = 'Đồng ý',
  cancelText = 'Hủy',
  acceptDisable,
  onAccept,
  onCancel,
  ...props
}: ConfirmDialogActionProps) {
  const dialog = useDialogContext();
  const [disabled, setDisabled] = useControllableState({
    prop: props.disabled,
    defaultProp: false,
  });

  return (
    <ButtonGroup>
      <RadixDialogClose asChild>
        <Button color={'danger'} onClick={onCancel} disabled={disabled}>
          {cancelText}
        </Button>
      </RadixDialogClose>
      <Button disabled={disabled || acceptDisable} onClick={() => onAccept?.(dialog)}>
        {acceptText}
      </Button>
    </ButtonGroup>
  );
}

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 18px;
`;
