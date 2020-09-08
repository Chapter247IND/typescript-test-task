import { Button, Col, PageHeader, Row } from "antd";
import FlightsList from "Components/Flights";
import React from "react";
import { useHistory } from "react-router";

const FlightPage = () => {
  const history = useHistory();
  if (!localStorage.token) {
    history.push("/");
  }
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expires");
    history.push("/");
  };
  return (
    <Row>
      <Col
        sm={{
          span: 16,
          offset: 4,
        }}>
        <PageHeader
          ghost
          title={"All Flights"}
          subTitle='Real time list of flights'
          extra={[
            <Button key='2' onClick={logOut}>
              Logout
            </Button>,
          ]}
        />
        <FlightsList />
      </Col>
    </Row>
  );
};

export default FlightPage;
