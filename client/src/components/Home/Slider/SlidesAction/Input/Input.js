import styles from '../../Slider.module.css';

export default function Input({
  type,
  id,
  name,
  value,
  onChange,
  placeholder,
  disabled,
}) {
  return (
    <input
      className={styles.input}
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}
