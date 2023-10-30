import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { themeSettings } from "theme";
import Dashboard from "scenes/dashboard";
import Layout from "scenes/layout";
import Schedule from "scenes/schedule";
import TrainStops from "scenes/trainstops";
import ScheduleForm from "scenes/schedule/ScheduleForm";
import Overview from "scenes/overview";
import Daily from "scenes/daily";
import Monthly from "scenes/monthly";
import Login from "scenes/login";
import Breakdown from "scenes/breakdown";
import Station from "scenes/stations";
import Wagon from "scenes/wagons";
import BookingPrice from "scenes/bookingPrices"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import WagonForm from "scenes/wagons/WagonForm";
import FrequencyForm from "scenes/schedule/FrequencyForm";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ToastContainer/>
          <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/trainschedule" element={<Schedule />} />
              <Route path="/trainstops" element={<TrainStops />} />
              <Route path="/addschedule" element={<ScheduleForm />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/breakdown" element={<Breakdown />} />
              <Route path="/stations" element={<Station />} />
              <Route path="/wagons" element={<Wagon />} />
              <Route path="/addwagon" element={<WagonForm />} />
              <Route path="/addfrequency" element={<FrequencyForm />} />
              <Route path="/bookingprices" element={<BookingPrice />} />

            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
