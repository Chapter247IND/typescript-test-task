import { Button, Space, Table } from "antd";
import Column from "antd/lib/table/Column";
import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";
import { useCookies } from "react-cookie";
import io from "socket.io-client";
let socket: any;
const FlightsList = () => {
  const [cookies] = useCookies();
  const [flights, setFlights] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const flightRef = useRef(flights);
  const getFlights = async () => {
    setIsLoading(true);
    try {
      const { data } = await Axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/flights`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      setFlights(data.data);
      setIsLoading(false);
    } catch (error) {
      setFlights([]);
      setIsLoading(false);
    }
  };
  const initializeSocket = () => {
    socket = io(`${process.env.REACT_APP_API_ENDPOINT}`);
    socket.on("statusUpdated", (newFlighDetails: any) => {
      const data = flightRef.current;
      const index = data.findIndex((d: any) => d.id === newFlighDetails.id);
      console.log(index);
      if (index > -1) {
        const newData: any[] = Object.assign([], data);
        newData[index] = newFlighDetails;
        setFlights(newData);
      }
    });
  };
  const changeStatus = (status: string, id: number) => {
    if (socket) {
      socket.emit("statusUpdated", id, status);
    }
  };
  useEffect(() => {
    getFlights();
    initializeSocket();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    flightRef.current = flights;
  }, [flights]);
  const getButton = (type: string, id: number) => {
    switch (type) {
      case "SCHEDULED":
        return (
          <Button danger onClick={() => changeStatus("CANCELLED", id)}>
            CANCEL FLIGHT
          </Button>
        );
      case "CANCELLED":
        return (
          <Button type='primary' onClick={() => changeStatus("SCHEDULED", id)}>
            REINSTATE FLIGHT
          </Button>
        );
      default:
        return null;
    }
  };
  return (
    <Table dataSource={flights} data-testid='table' loading={isLoading}>
      <Column title='Name' dataIndex='name' key='name' />
      <Column
        title='Flight time'
        render={(item: any) => {
          const date = new Date(item.scheduledAt);
          return `${date
            .toLocaleTimeString(undefined, {
              hour12: true,
              hour: "numeric",
              minute: "numeric",
            })
            .toUpperCase()}`;
        }}
        key='scheduledAt'
      />
      <Column title='Status' key='status' dataIndex='status' />
      <Column
        title='Action'
        key='action'
        render={(_, record: any, index: number) => (
          <Space size='middle'>{getButton(record.status, record.id)}</Space>
        )}
      />
    </Table>
  );
};

export default FlightsList;
