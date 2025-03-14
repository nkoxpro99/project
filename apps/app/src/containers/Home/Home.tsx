import { isEmpty } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { PriceRangeSlider } from '@/components/Common/PriceRangeSlider';
import { WardSelect } from '@/components/Common/WardSelect';
import { WardValue } from '@/enums/ward-value.enum';
import warehouseService from '@/service/warehouse-service';

import { HomeWarehouseViewCard } from '../../components/HomeWarehouseViewCard/HomeWarehouseViewCard';
import { WareHouseModel, WarehouseStatus } from '../../models/warehouse.model';

export const Home = () => {
  const [warehouses, setWarehouses] = useState<WareHouseModel[]>([]);
  const warehouseRef = useRef<WareHouseModel[]>();
  const navigate = useNavigate();
  const [priceFilter, setPriceFilter] = useState<[number, number]>();
  const [wardFilter, setWardFilter] = useState<WardValue>();

  useEffect(() => {
    warehouseService.getAll().then((data) => {
      if (!isEmpty(data)) {
        const filterWarehouses = data!.filter((d) => d.status === WarehouseStatus.Accepted && !d.rented);
        warehouseRef.current = filterWarehouses;
        setWarehouses(warehouseRef.current);
      }
    });
  }, []);

  useEffect(() => {
    if (warehouseRef.current) {
      let filterResult = warehouseRef.current;
      if (priceFilter)
        filterResult = filterResult.filter(
          (warehouse) => warehouse.price >= priceFilter[0] && warehouse.price <= priceFilter[1],
        );
      if (wardFilter) filterResult = filterResult.filter((warehouse) => warehouse.ward === wardFilter);
      setWarehouses(filterResult);
    }
  }, [priceFilter, wardFilter]);

  // TODO: If we call api to search, this code should be removed
  // const onFilter = (value: [number, number] | string, type: 'ward' | 'price') => {
  //   setWarehouses(
  //     mockWareHouses.filter((it) => {
  //       let flag = false;

  //       if (type === 'ward') {
  //         flag =
  //           value === WardValue.ALL ? true : it.ward?.toLowerCase().includes((value as string).toLowerCase()) ?? false;
  //       }

  //       if (type === 'price') {
  //         const searchValue = value as [number, number];
  //         flag = it.price >= searchValue[0] && it.price <= searchValue[1];
  //       }

  //       return flag;
  //     }),
  //   );
  // };

  return (
    <>
      <FilterContainer>
        <WardSelect onSelect={(value: string) => setWardFilter(Number(value))} />
        <PriceRangeSlider max={50000} min={100} onInput={(value: [number, number]) => setPriceFilter(value)} />
      </FilterContainer>

      <p>{warehouses.length} kho bãi</p>
      <GridContainer>
        {warehouses.map((it) => (
          <HomeWarehouseViewCard key={it.id} warehouse={it}></HomeWarehouseViewCard>
        ))}
      </GridContainer>
    </>
  );
};

const FilterContainer = styled.div`
  display: flex;
  margin-bottom: 24px;
  gap: 24px;
  justify-content: flex-end;
`;

const GridContainer = styled.div`
  width: 1260px;
  display: grid;
  grid-template-columns: repeat(4, 300px);
  justify-content: space-between;
  row-gap: 20px;
`;
