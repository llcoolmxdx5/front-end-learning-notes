import * as echarts from 'echarts';
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  name: 'echarts-quick',
  setup() {
    const options: echarts.EChartsOption = {
      xAxis: {
        type: 'category',
        data: ['小明', '小红', '小王'],
      },
      yAxis: {
        type: 'value',
      },
      tooltip: {},
      series: [
        {
          name: '语文',
          type: 'bar',
          data: [70, 92, 87],
        },
      ],
    };

    onMounted(() => {
      const mCharts = echarts.init(document.querySelector('#quick-01')!);
      mCharts.setOption(options);
    });

    return () => <div id="quick-01" style={{ width: '600px', height: '400px' }}></div>;
  },
});
