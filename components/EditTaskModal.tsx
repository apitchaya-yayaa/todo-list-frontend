import { Button, Input, Modal } from 'antd';
import { useEffect, useState } from 'react';
import styles from './Modal.module.scss';

const { TextArea } = Input;

type Props = {
  open: boolean;
  submitText: string;
  valueInput: string;
  onModalClose: () => void;
  onClickSubmit: (input: string) => void;
};

const EditTaskModal = (props: Props) => {
  const { open, submitText, valueInput, onModalClose, onClickSubmit } = props;
  const [value, setValue] = useState('');

  const disabledButton = value.length === 0;

  useEffect(() => {
    setValue(valueInput);
  }, [valueInput]);

  const onChange = ({ target }) => {
    setValue(target.value);
  };

  return (
    <Modal
      className={styles.container}
      visible={open}
      onOk={onModalClose}
      onCancel={onModalClose}
      width={300}
      centered
      bodyStyle={{
        height: 300,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      closable={false}
      afterClose={() => setValue(valueInput)}
      footer={null}
    >
      <TextArea
        className={styles.input}
        autoFocus
        value={value}
        size='large'
        placeholder='Add new Todo...'
        bordered={false}
        autoSize={{ minRows: 5, maxRows: 5 }}
        maxLength={150}
        onChange={onChange}
      />
      <Button
        className={styles.fullWidthButton}
        size='large'
        shape='round'
        disabled={disabledButton}
        onClick={() => {
          onClickSubmit(value);
        }}
      >
        {submitText}
      </Button>
    </Modal>
  );
};

export default EditTaskModal;
