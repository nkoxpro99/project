import { grayA, indigo, red } from '@radix-ui/colors';
import * as RadixContextMenu from '@radix-ui/react-context-menu';
import { ReactNode } from 'react';
import styled from 'styled-components';

export type ContextMenuOptionType = 'warning' | 'default';

export type ContextMenuOption = {
  content: ReactNode;
  type?: ContextMenuOptionType;
  onClick?: () => void;
};

export type ContextMenuProps = {
  children?: ReactNode;
  options?: ContextMenuOption[];
  portalOptions?: RadixContextMenu.MenuPortalProps;
} & RadixContextMenu.MenuContentProps;

export const ContextMenu = ({ children, options, portalOptions, ...props }: ContextMenuProps) => {
  return (
    <RadixContextMenu.Root modal={false}>
      <ContextMenuTrigger className="ContextMenuTrigger">{children}</ContextMenuTrigger>
      <RadixContextMenu.Portal {...portalOptions}>
        <ContextMenuContent {...props} className="ContextMenuContent">
          {options?.map((o, i) => (
            <ContextMenuItem key={i} className="ContextMenuItem" type={o.type ?? 'default'} onSelect={o.onClick}>
              {o.content}
            </ContextMenuItem>
          ))}
        </ContextMenuContent>
      </RadixContextMenu.Portal>
    </RadixContextMenu.Root>
  );
};

const ContextMenuTrigger = styled(RadixContextMenu.Trigger)`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const ContextMenuContent = styled(RadixContextMenu.Content)`
  min-width: 150px;
  background-color: white;
  border: 1px solid ${grayA.grayA6};
  border-radius: 4px;
  overflow: hidden;
  box-shadow:
    0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
`;

const ContextMenuItem = styled(RadixContextMenu.Item)<{ type: ContextMenuOptionType }>`
  font-size: 13px;
  color: var(--violet-11);
  display: flex;
  align-items: center;
  height: 30px;
  padding: 0 8px;
  position: relative;
  user-select: none;
  outline: none;
  cursor: pointer;

  &:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  &:last-child {
    border-end-end-radius: 4px;
    border-end-start-radius: 4px;
  }

  &[data-disabled] {
    color: ${grayA.grayA5};
    pointer-events: 'none';
  }

  &[data-highlighted] {
    background-color: ${({ type }) => (type === 'default' ? indigo.indigo8 : red.red9)};
    color: white;
  }
`;
