import React from "react";

const Buttons = (props) => {
    let {text, type, category, renderOutput} = props;

    let changeUi = (category) => {
        console.log("pressing me")
        if(category){
            renderOutput(category)
        }else{
            renderOutput();
        }
        
    }
  return (
    <>
      <button
        className={`btn btn-${type} mr-2 mt-2`}
        onClick={() => changeUi({category}) }
      >
        {text}
      </button>

      {/* <button
        className="btn btn-dark mt-2"
        onClick={() => {
          this.renderOutput({category});
        }}
      >
        URL
      </button> */}
    </>
  );
};

export default Buttons;