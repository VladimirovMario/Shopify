import styles from './Label.module.css';

export default function Label({
  children,
  className,
  inputId,
  spanText,
  error,
}) {
  return (
    <label className={className} htmlFor={inputId}>
      <div>
        <span>
          {spanText}
          {/* In case of error */}
          {error && (
            <span className={styles['error-message']}>&nbsp;{error}</span>
          )}
        </span>
      </div>
      {children}
    </label>
  );
}
