import "./style.css";
export default function Toast({ toaster }) {
  const { className, message } = toaster;

  return (
    <>
      <div
        className={className ? "toast " + className : "toast"}
        id={Date.now()}
      >
        <div className="message">
          <p>{message}</p> <p>x</p>
        </div>
      </div>
    </>
  );
}
