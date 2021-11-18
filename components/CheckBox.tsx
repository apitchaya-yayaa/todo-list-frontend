import styles from './CheckBox.module.scss';

type Props = {
  checked: boolean
  onCheckClick: (checked: boolean) => void;
};

const CheckBox = (props: Props) => {
  const { checked, onCheckClick } = props;

  const handleChecked = (e) => {
    onCheckClick(e.target.checked);
  };
  return (
    <label className={styles.container}>
      <input type='checkbox' checked={checked} onChange={handleChecked} />
      <span className={styles.checked} />
    </label>
  );
};

export default CheckBox;
