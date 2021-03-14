import React from 'react';
import { Popup, PopupProps } from 'react-map-gl';
import { Button, Col, Form, Input, Row } from 'antd';
import s from './createPublicationPopup.module.scss';

type Props = {
  onSubmit: (values: any) => void;
};

export type AddPublicationInput = {
  firstName: string;
  description: string;
};

export const CreatePublicationPopup = ({ latitude, longitude, onClose, onSubmit }: PopupProps & Props) => {
  return (
    <Popup
      latitude={latitude}
      longitude={longitude}
      closeButton={true}
      closeOnClick={false}
      onClose={onClose}
      anchor="top"
    >
      <Form
        className={s.formWrapper}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={(values) => onSubmit(values)}
      >
        <Row justify="center">
          <Col span={20}>
            <Form.Item
              className={s.inputWrapper}
              name="firstName"
              rules={[{ required: true, message: 'Please introduce yourself.' }]}
            >
              <Input className={s.input} size="large" placeholder="Name" />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center">
          <Col span={20}>
            <Form.Item
              className={s.inputWrapper}
              name="description"
              rules={[{ required: true, message: 'Please say what are you looking for.' }]}
            >
              <Input className={s.input} size="large" placeholder="Description" />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center">
          <Col span="auto">
            <Form.Item className={s.inputWrapper}>
              <Button type="primary" htmlType="submit">
                Create publication!
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Popup>
  );
};
