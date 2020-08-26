import React, { useEffect, useState } from "react";
import SearchHistory, {
  ISearchHistoryItem,
} from "Components/Home/SearchHistory";
import SearchBox from "Components/Home/SearchBox";
import Axios from "axios";

const HomePage = () => {
  const [historyData, setHistoryData] = useState<ISearchHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const getHistory = async () => {
    try {
      const { data } = await Axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/history`
      );
      setHistoryData(data.data as ISearchHistoryItem[]);
      setIsLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    getHistory();
    // eslint-disable-next-line
  }, []);

  const onSearch = async (city: string): Promise<void> => {
    try {
      const { data } = await Axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/${city}`
      );
      const newHistoryData = Object.assign([], historyData);
      newHistoryData.unshift(data.data);
      setHistoryData(newHistoryData);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className={"main-box"}>
      <div className={"search-box"}>
        <SearchBox onSearch={onSearch} />
      </div>
      <div className={"history-box"}>
        <SearchHistory isLoading={isLoading} historyData={historyData} />
      </div>
    </div>
  );
};

export default HomePage;
