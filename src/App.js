import "./App.css";
// import Switch from "@mui/material/Switch";
import Alert from "@mui/material/Alert";
import Navbar from "./Components/Navbar";
import Input from "./Components/Input";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Container } from "@mui/material";
import UilReact from "@iconscout/react-unicons/icons/uil-react";
import TimeAndLocation from "./Components/TimeAndLocation";
import TempratureDetails from "./Components/TempratureDetails";
import HourlyDaily from "./Components/HourlyDaily/HourlyDaily";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Switch from "@mui/material/Switch";
import {
  CityNameWeatherData,
  FinalFormatedWeatherData,
  FormatedWeatherData,
  getWeatherData,
  // LatLonWeatherData,
} from "./Components/DataFetching/FetchData";
import { useEffect, useState } from "react";
import { margin } from "@mui/system";
import CustomizedSwitches from "./Components/Toggle";
// import CustomizedSwitches from "./Components/Toggle";
import NotFound from "./Components/NotFound";

function App() {
  const [query, setQuery] = useState({ q: "berlin" });
  const [loading, setLoading] = useState(false);
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [text, setText] = useState("Light Mode");
  const [notFound, setNotFound] = useState(false);
  const [toggle, setToggle] = useState({
    color: "tomato",
    backgroundColor: "lightsteelblue",
    width: "590px",
    margin: "auto",
    marginBottom: "30px",
  });

  const togglefun = () => {
    if (toggle.color === "tomato") {
      setToggle({
        backgroundColor: "palevioletred",
        width: "590px",
        margin: "auto",
        marginBottom: "30px",
      });
      setText("Dark Mode");
      // console.log("light");
    } else {
      setToggle({
        color: "tomato",
        backgroundColor: "lightsteelblue",
        width: "590px",
        margin: "auto",
        marginBottom: "30px",
      });
      setText("Light Mode");
      // console.log("dark");
    }
  };

  const fetchWeather = async () => {
    setLoading(true);
    const message = query.q ? query.q : "current location.";

    toast.info("Fetching weather for " + message);

    await FinalFormatedWeatherData({ ...query, units }).then((data) => {
      toast.success(
        `Successfully fetched weather for ${data.name}, ${data.country}.`
      );
      // if (query.q === data.name) {
      //   console.log("fdjjjjjjj");
      // }
      console.log("Data APP");
      console.log(data);
      if (data.message === "city not found") {
        setNotFound(true);
        return;
      }
      setWeather(data);
      setLoading(false);
      setNotFound(false);
    });
  };

  useEffect(() => {
    fetchWeather();
  }, [query, units]);

  return (
    <>
      {loading && <h1></h1>}
      {notFound && <NotFound />}
      {notFound && (
        <Stack
          sx={{
            width: "50%",
            margin: "auto",
            marginBottom: "40px",
            marginTop: "-30px",
            borderRadius: "5px",
          }}
          spacing={2}
        >
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            This is an error alert —{" "}
            <strong>City is not available. Search for another city</strong>
          </Alert>
        </Stack>
      )}
      <div className="App">
        {weather && (
          <div style={toggle}>
            <CustomizedSwitches togglefun={togglefun} text={text} />

            <Container>
              <Navbar toggle={toggle} setQuery={setQuery} />
              <Input
                toggle={toggle}
                weather={weather}
                setQuery={setQuery}
                units={units}
                setUnits={setUnits}
              />
              <TimeAndLocation toggle={toggle} weather={weather} />
              <TempratureDetails toggle={toggle} weather={weather} />
              <HourlyDaily
                toggle={toggle}
                title="Hourly Forecast"
                items={weather.hourly}
              />
              <HourlyDaily
                toggle={toggle}
                title="Daily Forecast"
                items={weather.daily}
              />
              {/* <ToastContainer
                autoClose={3000}
                theme="colored"
                newestOnTop={true}
              /> */}
            </Container>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
