// Main home page with warehouse search and listing
import { CheckCircledIcon, MagnifyingGlassIcon, MobileIcon } from '@radix-ui/react-icons';
import { isEmpty } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { Button } from '@/components/Common/Button';
import { PriceRangeSlider } from '@/components/Common/PriceRangeSlider';
import { WardSelect } from '@/components/Common/WardSelect';
import { WardValue } from '@/enums/ward-value.enum';
import warehouseService from '@/service/warehouse-service';

import { HomeWarehouseViewCard } from '../../components/HomeWarehouseViewCard/HomeWarehouseViewCard';
import { WareHouseModel, WarehouseStatus } from '../../models/warehouse.model';

export const Home = () => {
  const [warehouses, setWarehouses] = useState<WareHouseModel[]>([]);
  const warehouseRef = useRef<WareHouseModel[]>();
  const [priceFilter, setPriceFilter] = useState<[number, number]>();
  const [wardFilter, setWardFilter] = useState<WardValue>();
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'area-asc' | 'area-desc'>();

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

      // sorting
      if (sortBy) {
        const arr = [...filterResult];
        switch (sortBy) {
          case 'price-asc':
            arr.sort((a, b) => a.price - b.price);
            break;
          case 'price-desc':
            arr.sort((a, b) => b.price - a.price);
            break;
          case 'area-asc':
            arr.sort((a, b) => (a.area || 0) - (b.area || 0));
            break;
          case 'area-desc':
            arr.sort((a, b) => (b.area || 0) - (a.area || 0));
            break;
        }
        filterResult = arr;
      }

      setWarehouses(filterResult);
    }
  }, [priceFilter, wardFilter, sortBy]);

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
            <ActionsRow>
              <PriceRangeSlider max={50000} min={100} onInput={(value: [number, number]) => setPriceFilter(value)} />
              <ActionButton onClick={handleExploreClick}>Khám phá</ActionButton>
            </ActionsRow>
          </SearchBar>
          <MetaBar>
            <MetaLeft>
              <strong>{warehouses.length}</strong> kết quả phù hợp
            </MetaLeft>
            <MetaActionsRow>
              <SortCol>
                <label htmlFor="sort">Sắp xếp:</label>
                <SelectEl
                  id="sort"
                  value={sortBy ?? ''}
                  onChange={(e) => {
                    const v = e.target.value as typeof sortBy | '';
                    setSortBy(v === '' ? undefined : (v as typeof sortBy));
                  }}
                >
                  <option value="">Mặc định</option>
                  <option value="price-asc">Giá tăng dần</option>
                  <option value="price-desc">Giá giảm dần</option>
                  <option value="area-asc">Diện tích tăng dần</option>
                  <option value="area-desc">Diện tích giảm dần</option>
                </SelectEl>
              </SortCol>
              <ClearButton
                onClick={() => {
                  setWardFilter(undefined);
                  setPriceFilter(undefined);
                  setSortBy(undefined);
                }}
              >
                Bỏ lọc
              </ClearButton>
            </MetaActionsRow>
          </MetaBar>
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
  /* Occupy ~85% of dynamic viewport width but never exceed old desktop max */
  width: 85dvw; /* modern viewport unit (falls back to vw where unsupported) */
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
  grid-template-columns: 320px 1fr; /* merge middle input + action button */
  gap: 16px;
  align-items: center;
`;

const ActionsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px; /* unified horizontal spacing between input and button */
`;

const MetaActionsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px; /* same spacing */
  justify-content: flex-end; /* push sort + clear to the right */
`;

const ActionButton = styled(Button)`
  width: 140px;
  flex-shrink: 0;
`;

// Meta information row under the filters: results count, sort and clear
const MetaBar = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr; /* mirror new SearchBar layout */
  gap: 16px;
  align-items: center;
  margin: 6px 0 8px 0;
`;

const MetaLeft = styled.div`
  color: #334155;
  strong { color: #0f172a; }
`;

const SortCol = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  label { color: #334155; font-size: 13px; }
`;

const SelectEl = styled.select`
  height: 38px;
  border: 1px solid #e5e7eb;
  background: #fff;
  border-radius: ${RADIUS_SM}px;
  padding: 0 12px;
  color: #111827;
  font-size: 14px;
  font-weight: 500;
`;

/* Reuse ActionButton styling for the clear button */
const ClearButton = styled(ActionButton)`
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
  width: 100%;
  display: grid;
  /* Force 4 columns; cards shrink fluidly. Min 240px keeps content readable */
  grid-template-columns: repeat(4, minmax(240px, 1fr));
  column-gap: clamp(12px, 1.8vw, 20px);
  row-gap: 20px;

  @supports not (width: 85dvw) {
    /* Fallback tweak if dynamic viewport units unsupported */
    column-gap: 16px;
  }

  @media (max-width: 1100px) {
    grid-template-columns: repeat(4, minmax(220px, 1fr));
    column-gap: clamp(10px, 1.2vw, 16px);
  }

  @media (max-width: 950px) {
    grid-template-columns: repeat(4, minmax(200px, 1fr));
    column-gap: clamp(8px, 1vw, 14px);
  }
`;
