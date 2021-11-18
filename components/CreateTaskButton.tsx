import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import styles from './Button.module.scss';

type Props = {
  onCreateButtonClick: () => void;
};

const CreateTaskButton = (props: Props) => {
  const { onCreateButtonClick } = props;

  return (
    <Button
      className={styles.createButton}
      type='primary'
      shape='circle'
      onClick={onCreateButtonClick}
      icon={<PlusOutlined className={styles.plus} />}
    />
  );
};

export default CreateTaskButton;
