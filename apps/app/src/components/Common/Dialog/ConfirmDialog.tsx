import styled from 'styled-components';

import { ConfirmDialogAction, ConfirmDialogActionProps } from './ConfirmDialogAction';
import { Dialog, DialogProps, DialogTitle } from './Dialog';

export type ConfirmDialogProps = DialogProps &
  ConfirmDialogActionProps & {
    title?: string;
  };

export function ConfirmDialog({
  children,
  title = 'Xác nhận',
  loading = false,
  fallback,
  showFallback = false,
  acceptText,
  cancelText,
  onAccept,
  onCancel,
  ...props
}: ConfirmDialogProps) {
  const actionProps: ConfirmDialogActionProps = {
    acceptText,
    cancelText,
    onAccept,
    onCancel,
  };

  return (
    <Dialog
      {...props}
      onDialogClose={(data) => {
        props.onDialogClose?.(data);
        onCancel?.();
      }}
    >
      <Container>
        <DialogTitle>{title}</DialogTitle>
        {children}
        <ConfirmDialogAction {...actionProps} />
      </Container>
    </Dialog>
  );
}

const Container = styled.div`
  width: 500px;
`;
