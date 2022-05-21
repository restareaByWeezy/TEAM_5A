import MobileSearchDisease from 'components/MobileSearchDiseases';
import { Routes, Route } from 'react-router-dom';
import styles from './Routes.module.scss';

import SearchDiseases from './searchDiseases/index';

const App = () => {
  return (
    <div className={styles.appWrapper}>
      <div className={styles.app}>
        <Routes>
          <Route path="/" element={<SearchDiseases />} />
          <Route path="test" element={<MobileSearchDisease />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
