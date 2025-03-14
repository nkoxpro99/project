import * as ReactDOM from 'react-dom/client';

import { AppRouter } from './AppRouter';
import { setupDefaultYupLocale } from './yup';

setupDefaultYupLocale();

ReactDOM.createRoot(document.getElementById('root')!).render(<AppRouter />);
