// Main home page with warehouse search and listing
import { isEmpty } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { CheckCircledIcon, MagnifyingGlassIcon, MobileIcon } from '@radix-ui/react-icons';
import styled from 'styled-components';

import { PriceRangeSlider } from '@/components/Common/PriceRangeSlider';
import { WardSelect } from '@/components/Common/WardSelect';
import { WardValue } from '@/enums/ward-value.enum';
import warehouseService from '@/service/warehouse-service';

import { HomeWarehouseViewCard } from '../../components/HomeWarehouseViewCard/HomeWarehouseViewCard';
import { WareHouseModel, WarehouseStatus } from '../../models/warehouse.model';
import { Button } from '@/components/Common/Button';

export const Home = () => {
  const [warehouses, setWarehouses] = useState<WareHouseModel[]>([]);
  const warehouseRef = useRef<WareHouseModel[]>();
  const [priceFilter, setPriceFilter] = useState<[number, number]>();
  const [wardFilter, setWardFilter] = useState<WardValue>();

  const handleExploreClick = () => {
    const el = document.getElementById('list');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    warehouseService.getAll().then((data) => {
      if (data && !isEmpty(data)) {
        const filterWarehouses = data.filter((d) => d.status === WarehouseStatus.Accepted && !d.rented);
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
      <Main>
        <Hero>
          <HeroTitle>iRent — Tìm kho bãi nhanh, đơn giản</HeroTitle>
          <HeroSubtitle>
            Kết nối chủ kho với doanh nghiệp. Tối giản thao tác, minh bạch giá, hỗ trợ xuyên suốt.
          </HeroSubtitle>
          <SearchBar>
            <WardSelect onSelect={(value: string) => setWardFilter(Number(value))} />
            <PriceRangeSlider max={50000} min={100} onInput={(value: [number, number]) => setPriceFilter(value)} />
            <Button onClick={handleExploreClick}>Khám phá</Button>
          </SearchBar>
          <Highlights>
            <HighlightItem>
              <IconBadge>
                <MagnifyingGlassIcon />
              </IconBadge>
              <div>
                <h4>Tìm kiếm thông minh</h4>
                <p>Lọc theo phường, diện tích và giá chỉ trong vài giây.</p>
              </div>
            </HighlightItem>
            <HighlightItem>
              <IconBadge>
                <CheckCircledIcon />
              </IconBadge>
              <div>
                <h4>Minh bạch & tin cậy</h4>
                <p>Kho được duyệt, thông tin rõ ràng, điều khoản sẵn sàng.</p>
              </div>
            </HighlightItem>
            <HighlightItem>
              <IconBadge>
                <MobileIcon />
              </IconBadge>
              <div>
                <h4>Trải nghiệm mượt</h4>
                <p>Giao diện gọn gàng, tập trung nội dung cần thiết.</p>
              </div>
            </HighlightItem>
          </Highlights>
        </Hero>

        <SectionHeader>
          <h3>Kho đang sẵn sàng</h3>
          <span>{warehouses.length} kho bãi</span>
        </SectionHeader>

        <GridContainer id="list">
          {warehouses.map((it) => (
            <HomeWarehouseViewCard key={it.id} warehouse={it}></HomeWarehouseViewCard>
          ))}
        </GridContainer>
      </Main>
    </>
  );
};

// Border radius scale for this page
const RADIUS = 12; // containers/cards
const RADIUS_SM = 8; // small badges/icons

const Main = styled.div`
  max-width: 1260px;
  margin: 0 auto;
  padding: 24px 20px 80px;
`;

const Hero = styled.section`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 28px 24px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: ${RADIUS}px;
`;

const HeroTitle = styled.h1`
  margin: 0;
  font-size: 32px;
  font-weight: 800;
  color: #1e1b2e; /* slightly deeper for contrast */
  letter-spacing: -0.02em;
`;

const HeroSubtitle = styled.p`
  margin: 0;
  color: #374151; /* darker slate for better readability */
`;

const SearchBar = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr 140px;
  gap: 16px;
  align-items: center;
`;

const Highlights = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
`;

const HighlightItem = styled.div`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: ${RADIUS}px;
  padding: 16px 18px;
  display: flex;
  gap: 12px;
  align-items: flex-start;

  h4 {
    margin: 0 0 4px 0;
    font-size: 15px;
    color: #1e1b2e;
    font-weight: 600;
  }
  p {
    margin: 0;
    font-size: 12.5px;
    color: #4b5563;
    line-height: 1.4;
  }
`;

const IconBadge = styled.span`
  width: 36px;
  height: 36px;
  border-radius: ${RADIUS_SM}px;
  background: #e2e8f0; /* neutral gray */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #334155;
  svg { color: #334155; }
`;

const SectionHeader = styled.div`
  margin: 24px 0 12px 0;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  h3 {
    margin: 0;
    font-size: 18px;
    color: #0f172a;
  }
  span {
    color: #334155;
    font-weight: 600;
  }
`;

const GridContainer = styled.div`
  width: 1260px;
  display: grid;
  grid-template-columns: repeat(4, 300px);
  justify-content: space-between;
  row-gap: 20px;
`;
