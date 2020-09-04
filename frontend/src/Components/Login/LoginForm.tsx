import React from "react";
import { Form, Input, Button, Card, Row, Col } from "antd";

export interface ILoginUser {
  username: string;
  password: string;
}
export interface ILoginProps {
  onLogin: (e: ILoginUser) => any;
  isLoading: boolean;
}

const LoginForm: React.FunctionComponent<ILoginProps> = ({
  onLogin,
  isLoading,
}: ILoginProps) => {
  return (
    <Row>
      <Col
        md={{
          span: 8,
          offset: 8,
        }}>
        <Card>
          <Form name='basic' data-testid='login-form' onFinish={onLogin}>
            <Form.Item
              label='Username'
              name='username'
              rules={[
                { required: true, message: "Please input your username!" },
              ]}>
              <Input data-testid='username' />
            </Form.Item>

            <Form.Item
              label='Password'
              name='password'
              rules={[
                { required: true, message: "Please input your password!" },
              ]}>
              <Input.Password data-testid='password' />
            </Form.Item>

            <Form.Item>
              <Button
                data-testid='submit'
                loading={isLoading}
                type='primary'
                htmlType='submit'>
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginForm;
