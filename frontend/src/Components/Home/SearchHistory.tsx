import React from "react";
export interface ISearchHistoryItem {
  id: number;
  city: string;
  country?: string;
  details: string;
  createdAt: string;
}
export interface IWhetherDetailsItem {
  base: string;
  clouds: {
    all: number;
  };
  cod: number;
  coord: {
    lat: number;
    lon: number;
  };
  dt: number;
  id: number;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  sys: {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
  };
  timezone: number;
  visibility: number;
  weather: {
    description: string;
    icon: string;
    id: number;
    main: string;
  }[];
  wind: {
    deg: number;
    speed: number;
  };
}
export interface ISeachHistoryProps {
  isLoading: boolean;
  historyData: ISearchHistoryItem[];
}
const SearchHistory = ({ isLoading, historyData }: ISeachHistoryProps) => {
  return (
    <>
      <h3>Recent Searches:</h3>
      <table className='history-table'>
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>City</th>
            <th>Forcast</th>
            <th>Searched At</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr key={"loading"}>
              <td colSpan={4}>Loading....</td>
            </tr>
          ) : !historyData || !historyData.length ? (
            <tr key={"no-data"}>
              <td colSpan={4}>
                <div className='error-message'>
                  Nothing found in history. Start searching from the input
                  above.
                </div>
              </td>
            </tr>
          ) : (
            historyData.map((history: ISearchHistoryItem, index: number) => {
              const date = new Date(history.createdAt);
              const formattedDate = `${(date.getMonth() + 1)
                .toString()
                .padStart(
                  2,
                  "0"
                )}-${date.getDate()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
              const details: IWhetherDetailsItem = JSON.parse(history.details);
              const sunset = `${new Date(
                details.sys.sunset
              ).getHours()}:${new Date(details.sys.sunset).getMinutes()}`;
              const sunrise = `${new Date(
                details.sys.sunrise
              ).getHours()}:${new Date(details.sys.sunrise).getMinutes()}`;
              return (
                <tr key={history.id}>
                  <td>{index + 1}</td>
                  <td>{history.city}</td>
                  <td className='text-left'>
                    <p>
                      <span>Current temp:</span> {details.main.temp}&#8457;
                    </p>
                    <p>
                      <span>Max temp:</span> {details.main.temp_max}&#8457;
                    </p>
                    <p>
                      <span>Min temp:</span> {details.main.temp_min}&#8457;
                    </p>
                    <p>
                      <span>Pressure:</span> {details.main.pressure}
                    </p>
                    <p>
                      <span>Humidity:</span> {details.main.humidity}
                    </p>
                    <p>
                      <span>Sunrise:</span> {sunrise}
                    </p>
                    <p>
                      <span>Sunset:</span> {sunset}
                    </p>
                    <p>
                      <span>Wind Speed:</span> {details.wind.speed}M/hours
                    </p>
                  </td>
                  <td>{formattedDate}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </>
  );
};

export default SearchHistory;
