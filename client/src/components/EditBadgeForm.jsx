import { useState } from 'react';
import { Modal, Button, Form, Input, message } from 'antd';

export function EditBadgeForm({ badge }) {
  const [visible, setVisible] = useState(false);
  const [description, setDescription] = useState(badge.description);
  const [title, setTitle] = useState(badge.title);

  const handleCancel = () => setVisible(false);
  const handleShow = () => {
    setVisible(true);
    setDescription(badge.description);
    setTitle(badge.title);
  };

  const updateBadge = async e => {
    try {
      const body = { description, title };
      const response = await fetch(`${process.env.REACT_APP_URL}/badges/${badge.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        message.success('Badge updated successfully!');
        setVisible(false);
        window.location = "/";
      } else {
        message.error('Failed to update badge');
      }
    } catch (err) {
      console.error(err.message);
      message.error('An error occurred');
    }
  };

  return (
    <>
      <Button type="default" onClick={handleShow}>
        Edit
      </Button>

      <Modal
        title="Edit Badge"
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
          <Button key="submit" type="primary" onClick={updateBadge}>
            Edit
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Title" required>
            <Input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter badge title"
            />
          </Form.Item>

          <Form.Item label="Description" required>
            <Input.TextArea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Enter badge description"
              rows={4}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}