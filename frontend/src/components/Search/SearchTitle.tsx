import { RootState } from '@/redux/Store'
import { useSelector } from 'react-redux'

const SearchTitle = () => {
    const {location} = useSelector((state: RootState) => state.home)
  return (
    <section className="my-5">
      <h1 className="text-4xl font-bold">Events near {location?.city}, {location?.state}</h1>
    </section>
  )
}

export default SearchTitle
