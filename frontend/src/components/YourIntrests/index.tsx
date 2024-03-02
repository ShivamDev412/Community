import { RouteEndpoints } from '@/utils/Endpoints'
import SectionTitle from '../SectionEventTitle'

const YourInterests = () => {
  return (
    <section>
    <SectionTitle
      title="Your Interests"
      url={RouteEndpoints.HOME}
      more={"See all your interests"}
    />

  </section>
  )
}

export default YourInterests