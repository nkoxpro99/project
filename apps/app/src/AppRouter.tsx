import { noop } from 'lodash';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

import { PersistLogin } from './auth';
import { Carousel } from './components/Carousel';
import { Header } from './components/Common/Header';
import { Comment } from './components/Dev';
import { NotFound } from './components/Fallback';
import { MapView } from './components/Map';
import { MapSearchBox } from './components/Map/MapSearchBox';
import { RouteDirection } from './components/RouteDirection';
import { UploadMultipleImages } from './components/UploadMultipleImages/UploadMultipleImages';
import {
  Contract,
  CreateWarehouse,
  Home,
  Login,
  MyWarehouse,
  RentingForm,
  SignUp,
  UploadImageButton,
  WarehouseDetails,
} from './containers';
import { Role } from './enums/role.enum';
import { AuthGuard, RentedWarehouseGuard } from './guard';
import { WarehouseGuard } from './guard/WarehouseGuard';
import { RentingWarehouseResolver, WarehouseResolver } from './resolver';

const GlobalStyle = createGlobalStyle`
    body {
        font-family: 'Signika Negative', sans-serif;
        margin: 0;
    }
`;

const BackgroundWrapper = styled.div`
  background-color: #eee;
  padding: 16px 0;
  min-height: calc(100vh - 60px - 32px); //100vh - header_height - total_self_padding
`;

const Wrapper = styled.div`
  min-width: 1024px;
  width: fit-content;
  margin: 0 auto 32px;
  background-color: white;
  padding: 16px;
  border-radius: 8px;
`;

const RootWrapper = () => {
  return (
    <>
      <Header></Header>
      <BackgroundWrapper>
        <Wrapper>
          <Outlet />
        </Wrapper>
      </BackgroundWrapper>
    </>
  );
};

export const AppRouter = () => {
  return (
    // TODO: RequireAuthResolver for auth user data,
    // not using AuthStore for getting user anymore (user in store can be undefined)
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route element={<PersistLogin />} path="/*">
            <Route element={<RootWrapper />}>
              <Route element={<Home />} path="" />
              <Route element={<Home />} path="home" />
              <Route element={<AuthGuard />}>
                <Route element={<MyWarehouse />} path="list" />
              </Route>
              <Route element={<WarehouseResolver />} path="warehouse/:id/*">
                <Route element={<WarehouseGuard />}>
                  <Route element={<RentedWarehouseGuard />}>
                    <Route element={<WarehouseDetails />} path="" />
                    <Route element={<AuthGuard />}>
                      <Route element={<RentingWarehouseResolver />}>
                        <Route element={<RentingForm />} path="renting" />
                      </Route>
                      <Route element={<Contract />} path="contract"></Route>
                    </Route>
                  </Route>
                </Route>
              </Route>
              <Route element={<AuthGuard requireRoles={[Role.Owner]} />}>
                <Route element={<CreateWarehouse />} path="create" />
              </Route>
            </Route>
          </Route>
          <Route element={<RootWrapper />} path="/*">
            <Route element={<Login />} path="login" />
            <Route element={<SignUp />} path="sign-up" />
            <Route element={<NotFound />} path="*" />
          </Route>
          <Route path="dev/*">
            <Route element={<UploadImageButton onImageUploaded={noop} />} path="upload" />
            <Route element={<MapSearchBox />} path="map-search-box"></Route>
            <Route
              element={
                <MapView
                  location={{
                    lat: 16.02298393469663,
                    lng: 108.1880701495974,
                  }}
                />
              }
              path="map-view"
            ></Route>
            <Route element={<Contract />} path="contract"></Route>
            <Route
              element={
                <RouteDirection
                  from="360 Đ. Lê Duẩn, Tân Chính, Thanh Khê, Đà Nẵng 550000, Vietnam"
                  to="Thanh Lương 11, Hòa Xuân, Cẩm Lệ, Đà Nẵng 550000, Vietnam"
                />
              }
              path="direction"
            ></Route>
            <Route element={<Comment />} path="comment"></Route>
            <Route
              element={
                <Carousel
                  images={[
                    {
                      originalUrl:
                        'https://res.cloudinary.com/dy6dehxix/image/upload/v1695041166/u9dygkim3lz4zrj6wgqs.jpg',
                      thumbnailUrl:
                        'https://res.cloudinary.com/dy6dehxix/image/upload/c_limit,h_60,w_90/v1695041166/u9dygkim3lz4zrj6wgqs.jpg',
                    },
                    {
                      originalUrl:
                        'https://res.cloudinary.com/dy6dehxix/image/upload/v1695041166/zwyed3akqnlrknoanlah.jpg',
                      thumbnailUrl:
                        'https://res.cloudinary.com/dy6dehxix/image/upload/c_limit,h_60,w_90/v1695041166/zwyed3akqnlrknoanlah.jpg',
                    },
                  ]}
                />
              }
              path="carousel"
            ></Route>
            <Route element={<UploadMultipleImages />} path="upload-images"></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
