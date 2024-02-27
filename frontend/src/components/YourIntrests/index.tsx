import { Endpoints } from '@/utils/Endpoints'
import SectionTitle from '../SectionEventTitle'

const YourInterests = () => {
  return (
    <section>
    <SectionTitle
      title="Your Interests"
      url={Endpoints.HOME}
      more={"See all your interests"}
    />

  </section>
  )
}

export default YourInterests