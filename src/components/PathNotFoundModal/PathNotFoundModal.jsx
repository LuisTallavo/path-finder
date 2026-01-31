import { Modal } from 'antd';

const PathNotFoundModal = ({ open, onClose }) => {
  return (
    <Modal
      title={"No Path Found"}
      open={open}
      onOk={onClose}
      onCancel={onClose}
      cancelButtonProps={{ style: { display: 'none' } }}
      okText="OK"
    >
      <p>{"No path could be found between the start and end points. Try removing some obstacles."}</p>
    </Modal>
  );
}

export default PathNotFoundModal;
