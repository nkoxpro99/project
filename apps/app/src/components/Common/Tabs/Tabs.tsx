import { indigo, indigoA } from '@radix-ui/colors';
import { Content, List, Root, Trigger } from '@radix-ui/react-tabs';
import styled from 'styled-components';

export type TabType = {
  tab: React.ReactNode;
  content: React.ReactNode;
};

export type TabsProps = {
  tabs: TabType[];
  className?: string;
};

export function Tabs({ tabs, ...props }: TabsProps) {
  return (
    <TabsRoot {...props} defaultValue="tab1">
      <TabsList>
        {tabs.map((tab, index) => (
          <TabsTrigger key={`tab-trigger-${index + 1}`} value={`tab${index + 1}`}>
            {tab.tab}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab, index) => (
        <TabsContent key={`tab-content-${index + 1}`} value={`tab${index + 1}`}>
          {tab.content}
        </TabsContent>
      ))}
    </TabsRoot>
  );
}

const TabsRoot = styled(Root)`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.07);
`;

const TabsList = styled(List)`
  flex-shrink: 0;
  display: flex;
  border-bottom: 1px solid var(--mauve6);
`;

const TabsTrigger = styled(Trigger)`
  font-family: inherit;
  background-color: transparent;
  border: 1px solid ${indigo.indigo9};
  padding: 0 20px;
  height: 45px;
  flex: 1;
  gap: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${indigo.indigo9};
  font-size: 15px;
  line-height: 1;
  user-select: none;
  transition: background-color 0.25s ease-out;
  filter: drop-shadow(0px 5.0625px 17.8734px rgba(68, 53, 146, 0.33075))
    drop-shadow(0px 0.4375px 2.37031px rgba(68, 53, 146, 0.15925));

  &:not(:last-child) {
    border-right-width: 0px;
  }

  &:hover {
    background-color: ${indigoA.indigoA7};
    color: white;
  }

  &[data-state='active'] {
    background-color: ${indigoA.indigoA7};
    color: white;
  }

  &:focus {
    position: relative;
  }
`;

const TabsContent = styled(Content)`
  overflow-y: auto;
  flex-grow: 1;
  padding: 20px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  outline: none;
  position: relative;
  min-height: 60px;

  &::-webkit-scrollbar-track,
  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: ${indigo.indigo5};
  }

  &::-webkit-scrollbar-thumb {
    padding: 5px;
    background-color: ${indigo.indigo8};

    &:active {
      background-color: ${indigo.indigo9};
    }
  }

  &::-webkit-scrollbar {
    border-radius: 8px;
    width: 6px;
  }
`;
