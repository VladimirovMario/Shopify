export default function Label({ children, className, inputId, spanText }) {
  return (
    <label className={className} htmlFor={inputId}>
      <div>
        <span>
          {spanText}
          {/* In case of error */}
          {/* &nbsp;<span className={styles.error}>Error message</span> */}
        </span>
      </div>
      {children}
    </label>
  );
}
