import React, { memo } from 'react';
import 'antd/dist/antd.css';
import { List, Row, Col, Input, Button, Icon } from 'antd';

const TaskItems = ({ taskItem, enableEditTaskHandler, editTaskHandler, finishTaskHandler, deleteTaskHandler }) => {
  // let buttonEdit = '';
  const renderTasks = (item, key) => (
    <React.Fragment>
      <Row>
        <Col span={8} />
        <Col span={8}>
          <Row >
            <Col span={15}>
              <Input
                value={item.task}
                style={item.style}
                readOnly={item.isReadOnly}
                onChange={e => editTaskHandler(key, e)} />
            </Col>
            <Col span={9} >
              <Row type="flex" justify="space-around" >
                <Col span={4}>
                  <Button type='info' disabled={item.isFinish} onClick={() => enableEditTaskHandler(key)}>
                    {item.isReadOnly ? <Icon type="edit" /> : <Icon type="lock" /> }
                  </Button>
                </Col>
                <Col span={4}>
                  <Button type='primary' disabled={item.isFinish} onClick={() => finishTaskHandler(key)} >
                    <Icon type="check-circle" />
                  </Button>
                </Col>
                <Col span={4}>
                  <Button type='danger' onClick={() => deleteTaskHandler(key)}>
                    <Icon type="delete" />
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={8} />
      </Row>
      <br />
    </React.Fragment>
  );
  return (
    <List
      itemLayout='horizontal'
      dataSource={taskItem}
      renderItem={renderTasks}
    />
  );
};

export default memo(TaskItems);
