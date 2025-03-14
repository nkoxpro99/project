import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { debounce } from 'lodash';
import styled from 'styled-components';

import { FilterWarehouseOptionModel } from '@/models/filter-warehouse-option.model';

const InputSearch = styled.div`
  position: relative;
  margin: auto 0;
`;

const Input = styled.input`
  border: 1px solid #999;
  border-radius: 8px;
  height: auto;
  line-height: 24px;
  padding: 5px 40px 5px 15px;
  width: 280px;
`;

const Icon = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  right: 0;
`;

type SearchBarProps = {
  onSearch: (options: FilterWarehouseOptionModel) => void;
  placeholder: string;
};

export const SearchBar = (props: SearchBarProps) => {
  const { onSearch, placeholder } = props;
  const debouncedOnSearch = debounce(onSearch, 400);

  return (
    <InputSearch>
      <Icon>
        <MagnifyingGlassIcon height={24} width={24} />
      </Icon>
      <Input
        placeholder={placeholder}
        onChange={(v) => {
          debouncedOnSearch({
            query: v.target.value,
          });
        }}
      />
    </InputSearch>
  );
};
