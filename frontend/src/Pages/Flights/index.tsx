import React from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router";
import { PageHeader, Button, Row, Col } from "antd";
import FlightsList from "Components/Flights";

const FlightPage = () => {
  // eslint-disable-next-line
  const [cookies, _, removeCookie] = useCookies(["cookie-name"]);
  const history = useHistory();
  if (!cookies.token) {
    history.push("/");
  }
  const logOut = () => {
    removeCookie("token");
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
