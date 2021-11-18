import { Switch } from 'antd';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import CreateTaskButton from '../components/CreateTaskButton';
import EditTaskModal from '../components/EditTaskModal';
import TaskCard from '../components/TaskCard';
import { Task } from '../types/Task';
import styles from './index.module.scss';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [onlyActive, setOnlyActive] = useState<boolean>(false);

  const filteredTasks = useMemo(() => {
    if (onlyActive) {
      return tasks.filter((task) => task.active);
    }

    return tasks;
  }, [tasks, onlyActive]);

  const getAllTasks = async () => {
    const { data } = await axios.get('http://localhost:3000/tasks');
    setTasks(data);
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const handleCheckFilter = () => {
    setOnlyActive(!onlyActive);
  };

  const handleCreateTask = async (input: string) => {
    const task = { title: input, active: true };
    await axios.post('http://localhost:3000/tasks', task);
    setOpenModal(false);
    getAllTasks();
  };

  const handleEditTask = async (data: Task) => {
    await axios.put(`http://localhost:3000/tasks/${data.id}`, data);
    getAllTasks();
  };

  const handleDeleteTask = async (id: number) => {
    await axios.delete(`http://localhost:3000/tasks/${id}`);
    getAllTasks();
  };

  const handleCheckTask = async (data: Task) => {
    await axios.put(`http://localhost:3000/tasks/${data.id}`, data);
    getAllTasks();
  };

  const showModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.phoneFrame}>
        <div className={styles.header}>
          <h1 className={styles.title}>Daily Todo Lists</h1>
          <div className={styles.toggleContainer}>
            <div>Active Tasks</div>
            <Switch
              className={styles.toggle}
              size='small'
              onChange={handleCheckFilter}
            />
          </div>
        </div>
        <div className={styles.cardContainer}>
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              onCheckClick={handleCheckTask}
              data={task}
              onClickSubmitEdit={handleEditTask}
              onClickDelete={handleDeleteTask}
            />
          ))}
        </div>
        <div className={styles.footer}>
          <CreateTaskButton onCreateButtonClick={showModal} />
        </div>
        <EditTaskModal
          open={openModal}
          onModalClose={handleCloseModal}
          onClickSubmit={handleCreateTask}
          valueInput=''
          submitText='Create Todo'
        />
      </div>
    </div>
  );
}
