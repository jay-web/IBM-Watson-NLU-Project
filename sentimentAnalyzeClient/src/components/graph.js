import React, {useContext} from "react";
import { StoreContext } from "../reducer/reducer";
import { Doughnut } from "react-chartjs-2";

const Graph = React.memo((props) => {
  const [globalState ] = useContext(StoreContext);

  const { data } = props;
  const options = {
    plugins: {
      legend: {
        position: "right",
            // maxHeight: "200px"
        fullSize: true,
      ...(globalState.setGraphProperty && {  labels: {
            boxHeight: 100,
            boxWidth: 100,
            font: {
              size: 30,
            },
          }, }),

      },
      tooltip: {
        enabled: false,
      },
    }
  }
   
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
