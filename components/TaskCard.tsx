import { useState } from 'react';
import styles from './TaskCard.module.scss';
import { Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Task } from '../types/Task';

import CheckBox from '../components/CheckBox';
import EditTaskModal from './EditTaskModal';
import ConfirmModal from './ConfirmModal';

type Props = {
  data: Task;
  onCheckClick: (data: Task) => void;
  onClickSubmitEdit: (data: Task) => void;
  onClickDelete: (id: number) => void;
};

const TaskCard = (props: Props) => {
  const { data, onCheckClick, onClickSubmitEdit, onClickDelete } = props;

  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);

  const showEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const showConfirmModal = () => {
    setOpenConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
  };

  return (
    <div className={styles.taskCard}>
      <div className={styles.checkBoxContainer}>
        <CheckBox
          checked={!data.active}
          onCheckClick={(checked: boolean) =>
            onCheckClick({
              id: data.id,
              title: data.title,
              active: !checked,
            })
          }
        />
        <div className={data.active ? styles.activeTask : styles.unActiveTask}>{data?.title}</div>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          className={styles.taskButton}
          size='small'
          shape='circle'
          onClick={showEditModal}
        >
          <EditOutlined />
        </Button>
        <Button
          className={styles.taskButton}
          size='small'
          shape='circle'
          onClick={showConfirmModal}
          danger
        >
          <DeleteOutlined />
        </Button>
      </div>
      <EditTaskModal
        open={openEditModal}
        onModalClose={handleCloseEditModal}
        onClickSubmit={(input: string) => {
          onClickSubmitEdit({
            id: data.id,
            title: input,
            active: data.active,
          });
          handleCloseEditModal();
        }}
        valueInput={data.title}
        submitText='Save'
      />
      <ConfirmModal
        open={openConfirmModal}
        onModalClose={handleCloseConfirmModal}
        onClickSubmit={() => {
          onClickDelete(data.id)
          handleCloseConfirmModal()
        }}
      />
    </div>
  );
};

export default TaskCard;
