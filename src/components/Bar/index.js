// 封装图标组件
import * as echarts from "echarts";
import { useRef, useEffect } from "react";
function Bar({ title, xData, yData, style }) {
  const echartBox = useRef(null);
  const chartInit = () => {
    var myChart = echarts.init(echartBox.current);
    myChart.setOption({
      title: {
        text: title,
      },
      tooltip: {},
      xAxis: {
        data: xData,
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: yData,
        },
      ],
    });
  };

  useEffect(() => {
    chartInit();
  });

  return <div ref={echartBox} style={style}></div>;
}
export default Bar;
