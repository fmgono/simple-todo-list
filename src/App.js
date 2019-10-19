import React, { useState } from "react";
import "antd/dist/antd.css";
import { Input, message, Button, Row, Col, Icon, Form } from "antd";

import TaskItems from "./TaskItems";

class Task {
  constructor(inputTask) {
    this.task = inputTask;
    this.isFinish = false;
    this.isReadOnly = true;
    this.style = null;
  }
}

const App = () => {
  const [inputTask, setInputTask] = useState("");
  const [taskItem, setTaskItem] = useState([]);

  const inputTaskHandler = e => {
    setInputTask(e.target.value);
  };

  const addTaskHandler = () => {
    const copyTaskItem = [...taskItem];
    if (!inputTask) {
      message.error("Please input the valid value!");
      return;
    }
    const task = new Task(inputTask);
    copyTaskItem.push(task);
    setTaskItem(copyTaskItem);
    setInputTask("");
  };

  const finishTaskHandler = key => {
    const updatedTaskItem = taskItem.map((task, index) => {
      if (index === key) {
        task.isFinish = !task.isFinish;
        task.style = { textDecoration: "line-through" };
      }
      return task;
    });
    setTaskItem(updatedTaskItem);
  };

  const deleteTaskHandler = key => {
    const undeletedTaskItem = taskItem.filter((task, index) => index !== key);
    setTaskItem(undeletedTaskItem);
  };

  const enableEditTaskHandler = (key, e) => {
    const editedTaskItem = taskItem.map((task, index) => {
      if (index === key) {
        task.isReadOnly = !task.isReadOnly;
      }
      return task;
    });
    setTaskItem(editedTaskItem);
  };

  const editTaskHandler = (key, e) => {
    const editedTaskItem = taskItem.map((task, index) => {
      if (index === key) {
        task.task = e.target.value;
      }
      return task;
    });
    setTaskItem(editedTaskItem);
  };

  let taskItems = null;
  if (taskItem.length > 0) {
    taskItems = (
      <TaskItems
        taskItem={taskItem}
        enableEditTaskHandler={enableEditTaskHandler}
        editTaskHandler={editTaskHandler}
        finishTaskHandler={finishTaskHandler}
        deleteTaskHandler={deleteTaskHandler}
      />
    );
  }

  return (
    <div>
      <Row>
        <Col span={8} />
        <Col span={8}>
          <h1 style={{ textAlign: "center" }}>Simple Todo List App</h1>
        </Col>
        <Col span={8} />
      </Row>
      <Row>
        <Col span={8} />
        <Col span={8}>
          <Form>
            <Row>
              <Col span={15}>
                <Input
                  value={inputTask}
                  defaultValue={inputTask}
                  allowClear
                  placeholder="Task..."
                  onChange={e => inputTaskHandler(e)}
                />
              </Col>
              <Col span={9}>
                <Row type="flex" justify="space-around">
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={addTaskHandler}
                  >
                    <Icon type="plus-circle" /> Add Task
                  </Button>
                </Row>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col span={8} />
      </Row>
      <br />

      {taskItems}
    </div>
  );
};

export default App;
