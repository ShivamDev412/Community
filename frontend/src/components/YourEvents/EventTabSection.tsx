import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import useEventTab from "./useEventTab";
import { FC } from "react";
import { TabPanelComponentProps } from "@/Types";
import EventCard from "./EventCard";
const TabPanelComponent: FC<TabPanelComponentProps> = ({
  value,
  data,
}) => {
  return (
    <TabPanel value={value}>
      {data?.map((event) => (
        <EventCard data={event} key={event?.event_id} />
      ))}
    </TabPanel>
  );
};
export default function EventTabs() {
  const {
    value,
    handleChange,
    handlePageChange,
    hostingEvents,
    attendingEvents,
    pastEvents,
  } = useEventTab();
  return (
    <section className="w-full mt-5">
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="event tab section">
            <Tab label="Attending" value="1" className="capitalize text-lg" />
            <Tab label="Hosting" value="2" className="capitalize text-lg" />
            <Tab label="Past" value="3" className="capitalize text-lg" />
          </TabList>
        </Box>
        <TabPanelComponent value="1" data={attendingEvents} />
        <TabPanelComponent value="2" data={hostingEvents} />
        <TabPanelComponent value="3" data={pastEvents} />
      </TabContext>
    </section>
  );
}
