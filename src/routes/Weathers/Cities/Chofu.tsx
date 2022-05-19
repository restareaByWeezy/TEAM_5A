import { useQuery } from 'react-query'
import styles from './Cities.module.scss'

import { getWeatherForecast5DaysApi } from 'services/weather'
import { isAxiosError } from 'utils/axios'

import List from 'routes/Weathers/Cities/List'

const WeatherChofu = () => {
  const lat = 35.661131270779514
  const lon = 139.58462970568925

  const { data, isLoading } = useQuery(
    ['getWeatherForecast5DaysApi', lat, lon],
    () => getWeatherForecast5DaysApi({ lat, lon }).then((res) => res.data),
    {
      refetchOnWindowFocus: true,
      suspense: true,
      useErrorBoundary: true,
      onError(err) {
        if (isAxiosError(err)) {
          // eslint-disable-next-line no-console
          console.log(err)
        }
      },
    }
  )

  if (!data) return null

  return (
    <section className={styles.city}>
      {isLoading && 'loading...'}
      <List data={data} />
    </section>
  )
}

export default WeatherChofu

// const REACT_APP_DISEASES_ID =
//   'cfT347MrBFgL8SuufeCwJ42WEl6TEV5OT6Y%2B6Rt0UW%2BERVfOSdE18N1xethlw9QkCLN3SSLw8WROTMCWTXnQ9w%3D%3D';
