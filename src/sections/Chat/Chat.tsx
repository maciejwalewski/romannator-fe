import { Button, Card, Input, Comment } from 'antd';
const { Search } = Input;

import React, { useEffect, useState } from 'react';
import { MessageOutlined, SendOutlined } from '@ant-design/icons';
import cn from 'classnames';
import { globalMsgs } from 'services/firebase';

import { useReactiveVar } from '@apollo/client';
import { userDataVar } from 'apollo/vars';

import s from './chat.module.scss';

type MsgType = {
  firstName: string;
  secondName: string;
  mail: string;
  message: string;
};

export const Chat = () => {
  const [isVisible, setVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [dbMessages, setDbMessages] = useState<MsgType[]>([]);
  const userData = useReactiveVar(userDataVar);

  useEffect(() => {
    globalMsgs.on('value', (snapshot) => {
      const data = snapshot.val();
      const msgs: MsgType[] = Object.values(data);
      setDbMessages(msgs);
    });
  }, []);

  const submitMessage = (message: string) => {
    setMessage('');
    const messageData = {
      firstName: userData?.profileObj?.givenName || '<name>',
      secondName: userData?.profileObj?.familyName || '<secondName>',
      mail: userData?.profileObj?.email || '<email≥',
      message,
    };

    globalMsgs.push(messageData);
  };

  return (
    <section className={s.chatWrapper}>
      <Button
        className={s.chatButton}
        onClick={() => setVisible(!isVisible)}
        type="primary"
        shape="circle"
        icon={<MessageOutlined />}
      />
      <Card
        bodyStyle={{ height: '90%' }}
        className={cn(s.chatBox, { [s.chatBoxClosed]: !isVisible })}
        title="Chat"
        bordered={false}
      >
        <div className={s.chatBoxContentWrapper}>
          {dbMessages.length && (
            <div className={s.messagesBoxInverted}>
              <div className={s.messagesBox}>
                {dbMessages.map((msg, index) => (
                  <Comment
                    key={index}
                    author={
                      <span>
                        {msg.firstName} {msg.secondName}
                      </span>
                    }
                    content={<p>{msg.message}</p>}
                  />
                ))}
              </div>
            </div>
          )}
          <Search
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type message here..."
            onSearch={submitMessage}
            enterButton={<SendOutlined />}
          />
        </div>
      </Card>
    </section>
  );
};
