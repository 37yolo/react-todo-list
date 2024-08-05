import { useEffect, useState } from "react";
import "./style.css";
export default function Select({
  options,
  className,
  name,
  setValues,
  status,
  values,
  setFilter,
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState();

  useEffect(() => {
    status ? setSelected(status) : setSelected(options[0]);
  }, []);
  return (
    <>
      <div>
        <div className={className ? "selection " + className : "selection"}>
          <div className="wrapper">
            <div
              className={open ? "selector open" : "selector"}
              onClick={() => {
                !open ? setOpen(true) : setOpen(false);
              }}
            >
              {selected}
            </div>
            {open && (
              <div>
                {options.map((item, index) => (
                  <div
                    key={index}
                    className="option"
                    onClick={(e) => {
                      setOpen(false);
                      const selection = e.currentTarget.childNodes[0];
                      setSelected(selection.textContent);
                      if (setValues) {
                        setValues({ ...values, [name]: selection.textContent });
                      }
                      setFilter && setFilter(selection.textContent);
                    }}
                  >
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
