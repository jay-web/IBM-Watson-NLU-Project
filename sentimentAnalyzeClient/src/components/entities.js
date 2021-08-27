import React from "react";

const EntitiesData = (props) => {
  const { entities } = props;
  console.log("et ", entities);
  return (
    <div className="mt-4">
      <table className="table table-bordered table-striped ">
        <tbody>
         
          <tr>
            <th>Type</th>
            <th>Name</th>
            <th>Relevance</th>
            <th>Sentiment</th>
          </tr>
          {entities.map((e, i) => {
              let color = e.sentiment.label === "negative" ? "red" :  e.sentiment.label === "positive" ? "green" : "black";
            return (
              <tr>
                <td>{e.type}</td>

                <td>{e.text}</td>

                <td>{e.relevance}</td>

                <td style={{ color: color }}>{e.sentiment.label}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EntitiesData;
