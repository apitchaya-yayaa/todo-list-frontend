import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import styles from './Modal.module.scss';

type Props = {
  open: boolean;
  onModalClose: () => void;
  onClickSubmit: () => void;
};

const ConfirmModal = (props: Props) => {
  const { open, onModalClose, onClickSubmit } = props;

  return (
    <Modal
      className={styles.confirmModalContainer}
      visible={open}
      onOk={onModalClose}
      onCancel={onModalClose}
      width={300}
      centered
      bodyStyle={{
        height: 200,
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      closable={false}
      footer={null}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <ExclamationCircleOutlined
          style={{ fontSize: 22, color: 'tomato', marginTop: 4 }}
        />
        <div className={styles.description}>
          Do you want to delete this task?
        </div>
      </div>
      <div>
        <Button size='large' shape='round' onClick={onModalClose}>
          Cancel
        </Button>
        <Button
          className={styles.cancelButton}
          size='large'
          shape='round'
          onClick={onClickSubmit}
          danger
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
