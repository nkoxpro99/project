import './App.css';

import { Admin, CustomRoutes } from 'react-admin';
import { Route } from 'react-router-dom';

import { CustomLayout } from './components/customs/CustomLayout';
import { RequestWarehouseDetails } from './components/customs/RequestWarehouseDetails';
import { RequestWarehouseList } from './components/customs/RequestWarehouseList';
import { Revenue } from './components/customs/Revenue';
import { TransactionDetails } from './components/customs/TransactionDetails';
import { Users } from './components/customs/Users';
import { WarehouseList } from './components/customs/WarehouseList';
import { authProvider, dataProvider } from './provider';

const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider} layout={CustomLayout}>
    <CustomRoutes>
      <Route element={<WarehouseList />} path="/warehouse" />
      <Route element={<TransactionDetails />} path="/warehouse/:id" />
      <Route element={<RequestWarehouseList />} path="/request" />
      <Route element={<RequestWarehouseDetails />} path="/request/:id" />
      <Route element={<Revenue />} path="/revenue" />
      <Route element={<Users />} path="/users" />
    </CustomRoutes>
  </Admin>
);

export default App;

