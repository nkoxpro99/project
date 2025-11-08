import React from 'react';
import { Layout, LayoutProps, Menu, useSidebarState } from 'react-admin';
import { BarChartIcon, ClockIcon, CubeIcon, PersonIcon, SquareIcon, StackIcon } from '@radix-ui/react-icons';
import Tooltip from '@mui/material/Tooltip';
import styled, { createGlobalStyle } from 'styled-components';

const COLLAPSED_WIDTH = 96;
const EXPANDED_WIDTH = 280;
const TRANSITION = '240ms cubic-bezier(0.4, 0, 0.2, 1)';
const COLLAPSED_TILE_SIZE = 72;
const COLLAPSED_ICON_SIZE = 48;
const COLLAPSED_ICON_RADIUS = 16;
const COLLAPSED_TILE_RADIUS = COLLAPSED_ICON_RADIUS + 4;

const SidebarGlobalStyle = createGlobalStyle<{ $open: boolean }>`
  .RaSidebar-fixed,
  .RaSidebar-docked {
    width: ${({ $open }) => ($open ? `${EXPANDED_WIDTH}px` : `${COLLAPSED_WIDTH}px`)} !important;
    transition: width ${TRANSITION} 0ms !important;

    .MuiDrawer-paper {
      width: ${({ $open }) => ($open ? `${EXPANDED_WIDTH}px` : `${COLLAPSED_WIDTH}px`)} !important;
      overflow-x: hidden;
      background: #ffffff !important;
      border-right: 1px solid #e5e7eb !important;
      box-shadow: ${({ $open }) => ($open ? '2px 0 12px rgba(15, 23, 42, 0.08)' : 'none')} !important;
      transition: width ${TRANSITION}, box-shadow ${TRANSITION};
    }
  }
`;

const MenuWrapper = styled.div<{ $open: boolean }>`
  padding: ${({ $open }) => ($open ? '16px 14px 28px' : '16px 12px 24px')};
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: ${({ $open }) => ($open ? '10px' : '14px')};
  background: linear-gradient(180deg, rgba(248, 250, 252, 0.64), transparent);
  transition:
    padding ${TRANSITION},
    gap ${TRANSITION};

  .MuiList-root {
    display: flex;
    flex-direction: column;
    gap: ${({ $open }) => ($open ? '6px' : '12px')};
    padding: 0;
  }

  .MuiListItemButton-root {
    display: flex;
    flex-direction: ${({ $open }) => ($open ? 'row' : 'column')};
    align-items: center;
    justify-content: ${({ $open }) => ($open ? 'flex-start' : 'center')};
    gap: ${({ $open }) => ($open ? '18px' : '0')};
    padding: ${({ $open }) => ($open ? '12px 20px' : '12px 0')};
    border-radius: ${({ $open }) => ($open ? '12px' : `${COLLAPSED_TILE_RADIUS}px`)};
    min-height: ${({ $open }) => ($open ? '50px' : `${COLLAPSED_TILE_SIZE}px`)};
    margin: ${({ $open }) => ($open ? '2px 0' : '8px auto')};
    width: ${({ $open }) => ($open ? '100%' : `${COLLAPSED_TILE_SIZE}px`)};
    position: relative;
    overflow: hidden;
    color: #374151;
    transition:
      background ${TRANSITION},
      box-shadow ${TRANSITION},
      transform ${TRANSITION},
      color ${TRANSITION};

    &:hover {
      background: ${({ $open }) => ($open ? 'rgba(59, 130, 246, 0.08)' : 'rgba(59, 130, 246, 0.2)')} !important;
      box-shadow: ${({ $open }) =>
        $open ? '0 10px 22px rgba(15, 23, 42, 0.12)' : '0 16px 28px rgba(15, 23, 42, 0.18)'};
      transform: ${({ $open }) => ($open ? 'translateX(6px)' : 'translateY(-4px)')};
    }

    &.RaMenuItemLink-active {
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.18), rgba(129, 140, 248, 0.18)) !important;
      color: #1d4ed8 !important;
      box-shadow: 0 12px 30px rgba(37, 99, 235, 0.32);

      .MuiListItemIcon-root {
        background: rgba(59, 130, 246, 0.16);

        svg {
          color: #1d4ed8 !important;
          opacity: 1;
        }
      }

      .MuiTypography-root {
        color: #1d4ed8 !important;
        font-weight: 600;
      }
    }
  }

  .MuiListItemIcon-root {
    margin: 0 !important;
    min-width: 0 !important;
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${({ $open }) => ($open ? '36px' : `${COLLAPSED_ICON_SIZE}px`)};
    height: ${({ $open }) => ($open ? '36px' : `${COLLAPSED_ICON_SIZE}px`)};
    border-radius: ${({ $open }) => ($open ? '12px' : `${COLLAPSED_ICON_RADIUS}px`)};
    background: ${({ $open }) => ($open ? 'rgba(59, 130, 246, 0.12)' : 'rgba(59, 130, 246, 0.16)')};
    transition:
      background ${TRANSITION},
      width ${TRANSITION},
      height ${TRANSITION},
      border-radius ${TRANSITION};

    svg {
      width: ${({ $open }) => ($open ? '18px' : '24px')};
      height: ${({ $open }) => ($open ? '18px' : '24px')};
      color: #2563eb;
      opacity: 0.92;
      transition:
        color ${TRANSITION},
        width ${TRANSITION},
        height ${TRANSITION},
        opacity ${TRANSITION};
    }
  }

  .MuiListItemText-root {
    margin: 0 !important;
    overflow: hidden;
    text-align: ${({ $open }) => ($open ? 'left' : 'center')};
    display: ${({ $open }) => ($open ? 'block' : 'none')} !important;
    visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
    transition:
      opacity ${TRANSITION},
      transform ${TRANSITION};

    .MuiTypography-root,
    .RaMenuItemLink-primaryText {
      font-size: 15px;
      font-weight: 500;
      color: inherit;
      white-space: ${({ $open }) => ($open ? 'nowrap' : 'normal')};
      opacity: ${({ $open }) => ($open ? 1 : 0)};
      transform: ${({ $open }) => ($open ? 'translateX(0)' : 'translateX(-12px)')};
      transition:
        opacity ${TRANSITION},
        transform ${TRANSITION};
    }
  }
`;

const SectionContainer = styled.div<{ $open: boolean }>`
  display: flex;
  flex-direction: ${({ $open }) => ($open ? 'row' : 'column')};
  align-items: center;
  justify-content: ${({ $open }) => ($open ? 'flex-start' : 'center')};
  gap: ${({ $open }) => ($open ? '14px' : '0')};
  padding: ${({ $open }) => ($open ? '12px 20px 6px' : '12px 0')};
  margin: ${({ $open }) => ($open ? '8px 0 6px' : '8px auto 4px')};
  min-height: ${({ $open }) => ($open ? 'auto' : `${COLLAPSED_TILE_SIZE}px`)};
  width: ${({ $open }) => ($open ? '100%' : `${COLLAPSED_TILE_SIZE}px`)};
  text-transform: uppercase;
  font-size: ${({ $open }) => ($open ? '12px' : '10px')};
  font-weight: 600;
  letter-spacing: 0.45px;
  color: ${({ $open }) => ($open ? '#6b7280' : '#475569')};
  text-align: ${({ $open }) => ($open ? 'left' : 'center')};
  background: transparent;
  border-radius: ${({ $open }) => ($open ? '12px' : `${COLLAPSED_TILE_RADIUS}px`)};
  transition:
    color ${TRANSITION},
    padding ${TRANSITION},
    gap ${TRANSITION},
    margin ${TRANSITION},
    border-radius ${TRANSITION};

  span {
    display: block;
    white-space: ${({ $open }) => ($open ? 'nowrap' : 'normal')};
    letter-spacing: ${({ $open }) => ($open ? '0.48px' : '0.6px')};
    font-size: ${({ $open }) => ($open ? '12px' : '9px')};
    line-height: ${({ $open }) => ($open ? '1.4' : '1.15')};
    margin-top: ${({ $open }) => ($open ? '0' : '6px')};
  }
`;

const SectionIcon = styled.div<{ $open: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $open }) => ($open ? '28px' : `${COLLAPSED_ICON_SIZE}px`)};
  height: ${({ $open }) => ($open ? '28px' : `${COLLAPSED_ICON_SIZE}px`)};
  border-radius: ${({ $open }) => ($open ? '10px' : `${COLLAPSED_ICON_RADIUS}px`)};
  background: ${({ $open }) => ($open ? 'rgba(59, 130, 246, 0.1)' : 'rgba(148, 163, 184, 0.22)')};
  transition:
    background ${TRANSITION},
    width ${TRANSITION},
    height ${TRANSITION},
    border-radius ${TRANSITION};

  svg {
    width: ${({ $open }) => ($open ? '16px' : '24px')};
    height: ${({ $open }) => ($open ? '16px' : '24px')};
    color: ${({ $open }) => ($open ? '#2563eb' : '#1f2937')};
    opacity: ${({ $open }) => ($open ? 0.9 : 0.9)};
    transition:
      color ${TRANSITION},
      opacity ${TRANSITION},
      width ${TRANSITION},
      height ${TRANSITION};
  }
`;

const SectionDivider = styled.div<{ $open: boolean }>`
  height: ${({ $open }) => ($open ? '1px' : '2px')};
  width: ${({ $open }) => ($open ? 'auto' : `${COLLAPSED_ICON_SIZE}px`)};
  margin: ${({ $open }) => ($open ? '4px 22px 8px' : '6px auto 10px')};
  background: ${({ $open }) =>
    $open
      ? 'linear-gradient(90deg, rgba(148, 163, 184, 0), rgba(148, 163, 184, 0.6), rgba(148, 163, 184, 0))'
      : 'linear-gradient(180deg, rgba(148, 163, 184, 0.6), rgba(148, 163, 184, 0.2))'};
  border-radius: 2px;
  transition:
    background ${TRANSITION},
    margin ${TRANSITION},
    height ${TRANSITION},
    width ${TRANSITION};
`;

const MenuSection = ({ icon, text }: { icon?: React.ReactNode; text: string }) => {
  const [open] = useSidebarState();

  const sectionContent = (
    <SectionContainer $open={open} aria-label={text} role="presentation">
      <SectionIcon $open={open}>{icon}</SectionIcon>
      <span>{text}</span>
    </SectionContainer>
  );

  return (
    <>
      {open ? (
        sectionContent
      ) : (
        <Tooltip arrow disableInteractive enterDelay={200} placement="right" title={text}>
          <span style={{ display: 'flex', justifyContent: 'center' }}>{sectionContent}</span>
        </Tooltip>
      )}
      <SectionDivider $open={open} />
    </>
  );
};

type CollapsibleMenuItemProps = Omit<React.ComponentProps<typeof Menu.Item>, 'primaryText'> & {
  label: string;
};

const CollapsibleMenuItem = ({ label, ...itemProps }: CollapsibleMenuItemProps) => {
  const [open] = useSidebarState();

  const item = <Menu.Item aria-label={label} primaryText={open ? label : null} {...itemProps} />;

  if (open) {
    return item;
  }

  return (
    <Tooltip arrow disableInteractive enterDelay={200} placement="right" title={label}>
      <span style={{ display: 'flex', justifyContent: 'center' }}>{item}</span>
    </Tooltip>
  );
};

const MyMenu = () => {
  const [open] = useSidebarState();

  return (
    <>
      <SidebarGlobalStyle $open={open} />
      <MenuWrapper $open={open}>
        <Menu>
          <MenuSection icon={<SquareIcon />} text="Kho bãi" />
          <CollapsibleMenuItem label="Tất cả" leftIcon={<CubeIcon />} to="/warehouse" />
          <CollapsibleMenuItem label="Đang chờ duyệt" leftIcon={<ClockIcon />} to="/request" />
          <MenuSection icon={<StackIcon />} text="Thống kê" />
          <CollapsibleMenuItem label="Doanh thu" leftIcon={<BarChartIcon />} to="/revenue" />
          <CollapsibleMenuItem label="Người dùng" leftIcon={<PersonIcon />} to="/users" />
        </Menu>
      </MenuWrapper>
    </>
  );
};

export const CustomLayout = (props: LayoutProps) => {
  return <Layout {...props} menu={MyMenu} />;
};
