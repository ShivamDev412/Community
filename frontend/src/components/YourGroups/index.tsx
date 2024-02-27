import { Endpoints } from "@/utils/Endpoints"
import SectionTitle from "../SectionEventTitle"

const YourGroups = () => {
  return (
    <section>
    <SectionTitle
      title="Your Groups"
      url={Endpoints.HOME}
      more={"See all your groups"}
    />

  </section>
  )
}

export default YourGroups