import React, { useState } from 'react';
import { MessageOutlined } from '@ant-design/icons';
import cn from 'classnames';
import { Button, Card } from 'antd';

import s from './chat.module.scss';

export const Chat = () => {
  const [isVisible, setVisible] = useState<boolean>(false);

  return (
    <section>
      <Button
        className={s.chatButton}
        onClick={() => setVisible(!isVisible)}
        type="primary"
        shape="circle"
        icon={<MessageOutlined />}
      />
      <Card className={cn(s.chatBox, { [s.chatBoxClosed]: !isVisible })} title="Chat" bordered={false}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </section>
  );
};
