const ErrorBanner = ({ message }) => (
  <div style={{
    background: "#ffdddd",
    padding: "10px",
    color: "red",
    textAlign: "center"
  }}>
    {message}
  </div>
);

export default ErrorBanner;