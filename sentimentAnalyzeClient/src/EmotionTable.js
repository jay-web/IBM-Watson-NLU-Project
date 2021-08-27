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
