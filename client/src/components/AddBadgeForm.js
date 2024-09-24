import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';

function AddBadgeForm() {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const onFinish = async values => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/badges`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        window.location = "/";
        message.success('Badge added successfully!');
      } else {
        message.error('Failed to add badge');
      }
    } catch (err) {
      console.error(err.message);
      message.error('A server error occurred');
    }
    
  };

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
    >
      <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Badges</h1>
      
      <Form.Item
        label="Badge Title"
        name="title"
        rules={[{ required: true, message: 'Please enter the badge title' }]}
      >
        <Input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter badge title"
        />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please enter a description' }]}
      >
        <Input.TextArea
          rows={2}
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Enter badge description"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Add Badge
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddBadgeForm;