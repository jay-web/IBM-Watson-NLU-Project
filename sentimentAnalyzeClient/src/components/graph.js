import React from "react";

import { Doughnut } from "react-chartjs-2";

const Graph = React.memo((props) => {
  const { data, options } = props;
   
  return (
    <Doughnut

      data={data}
      height={400}
      width={400}
      options={options}
    />
  );
});

export default Graph;
