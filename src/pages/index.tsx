import { useMediaQuery } from 'react-responsive';

import styles from './Pages.module.scss';

import MobileSearchDiseases from 'pages/MobileSearchDiseases';
import SearchDiseases from './SearchDiseases/index';

const App = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1040px)',
  });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1040px)' });

  return (
    <div className={styles.appWrapper}>
      <div className={styles.app}>
        {isDesktopOrLaptop && <SearchDiseases />}
        {isTabletOrMobile && <MobileSearchDiseases />}
      </div>
    </div>
  );
};

export default App;
