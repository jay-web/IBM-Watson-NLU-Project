const renderGraphData = (emotions) => {
    const data = {
      labels: ["Sadness", "Joy", "Fear", "Disgust", "Anger"],
      datasets: [
        {
          label: "# of Emotions",
          data: emotions,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(28, 112, 196,0.8)",
            "rgba(196, 112, 28,0.8)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(196, 28, 28, 0.8)",
           
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(196, 28, 28, 0.8)",
          ],
          borderWidth: 1,
          hoverOffset: 4
        },
      ],
    };
    return data;
  };

  export default renderGraphData