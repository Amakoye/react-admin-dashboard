import FullCalendar, { formatDate } from "@fullcalendar/react";

//calendar pluginsa
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState<any>([]);

  const handleDataClick = (selected: any) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

  const handleEventClick = (selected: any) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event ${selected?.event?.title}`
      )
    ) {
      selected?.event?.remove();
    }
  };

  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full calendar interactive page" />
      <Box display="flex" justifyContent="space-between">
        {/* Calendar sidebar */}
        <Box
          flex="1 1 20%"
          p="15px"
          sx={{ backgroundColor: colors.primary[400], borderRadius: "4px" }}
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event: any, index: any) => (
              <ListItem
                key={index}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText primary={event?.title} />
                {formatDate(event?.start, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </ListItem>
            ))}
          </List>
        </Box>
        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15%">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDataClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={[
              {
                id: "1345",
                title: "All-day event",
                date: "2022-12-23",
              },
              {
                id: "4345",
                title: "Timed event",
                date: "2022-12-23",
              },
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
