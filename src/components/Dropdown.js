import React, { useState , useEffect, useRef } from 'react';


const Dropdown = ({ label, options, selected, onSelectedChange }) => {
  const [open, setOpen ] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const onBodyClick = (event) => {
      if(ref.current.contains(event.target)) {
        //comes from UI form. Maybe a multi select wouldn't want to do this?
        return;
      };

      setOpen(false);
    };


    document.body.addEventListener("click", onBodyClick, { capture: true });

    return () => {
      document.body.removeEventListener("click", onBodyClick, {
        capture: true,
      });

    };
  }, []);

  const onHandleChange = (option) => {
    console.log(option)
    console.log(open)
    onSelectedChange(option)
  }

  const renderedOptions = options.map((option) => {
    var optionFound = 0
    //console.log(selected)
    const classes = `item item-selected`
    selected.map((sOption) => {
      if(option.value === sOption.value)
      optionFound =1
    })

    if (optionFound === 1) {
    return (
      <div
        key={option.value}
        className={classes}
        onClick={() => onHandleChange(option)}
        >
        {option.label}
    </div>
    );
    } else {
    return (
      <div
        key={option.value}
        className="item"
        onClick={() => onHandleChange(option)}
        >
        {option.label}
      </div>
    );

    }
  })

  const onHandleOpen = (event) => {
    if(event.target.className !== 'item') {
      setOpen(!open)
    }
  }

  const renderedTitle = () =>{
    var text =''
    selected.map((option)=>{
      text = text +" "+option.label
    })
    return (
      <div className="text">{text}</div>
    )
  }

  return (
    <div ref={ref} className="ui form">
      <div className="field">
        <label className="label">{label}</label>
        <div
          onClick={(e) => onHandleOpen(e)}
          className={`ui selection dropdown ${open ? 'visible active': ''}`}
        >
          <i className="dropdown icon"></i>
          {renderedTitle()}
          <div
            onClick={() => setOpen(true)}
            className={`menu ${open ? 'visible transition': ''}`}
          >
          {renderedOptions}
        </div>
      </div>
    </div>
  </div>
  );
};

export default Dropdown;
