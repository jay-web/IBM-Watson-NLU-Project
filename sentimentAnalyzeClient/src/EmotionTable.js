import React from "react";
import "./bootstrap.min.css";

class EmotionTable extends React.Component {
  render() {
    //Returns the emotions as an HTML table
    console.log(this.props.emotions);
    let emotions = this.props.emotions;
    return (
      <div className="mt-4">
        <table className="table table-bordered">
          <tbody>
            {
              /*Write code to use the .map method that you worked on in the 
              Hands-on React lab to extract the emotions. If you are stuck,
              please click the instructions to see how to implement a map*/

              Object.keys(emotions).map((e, i) => {
                return (
                  <tr key={i}>
                    <th>{e}</th>
                    <td>{emotions[e]}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}
export default EmotionTable;
