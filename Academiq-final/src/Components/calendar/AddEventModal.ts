import { useState } from 'react';
import { Modal, TextField, Button } from '@mui/material';

const AddEventModal = ({ open, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  const handleSave = () => {
    onSave({ title, start, end, id: Date.now().toString(), type: 'personal' });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div>
        <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextField
          label="Start"
          type="datetime-local"
          value={start.toISOString().slice(0, 16)}
          onChange={(e) => setStart(new Date(e.target.value))}
        />
        <TextField
          label="End"
          type="datetime-local"
          value={end.toISOString().slice(0, 16)}
          onChange={(e) => setEnd(new Date(e.target.value))}
        />
        <Button onClick={handleSave}>Save</Button>
      </div>
    </Modal>
  );
};
