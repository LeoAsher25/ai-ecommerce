'use client';
import {
  ArcElement,
  Chart as ChartJS,
  Plugin,
  Tooltip,
  defaults,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Block } from './Block';
import { useMemo } from 'react';

defaults.font.family = 'Montserrat';
const doughnutText: Plugin = {
  id: 'doughnutText',
  afterDatasetDraw: (chart, _arg, options) => {
    const { ctx } = chart;

    const centerX = chart.getDatasetMeta(0).data[0].x;
    const centerY = chart.getDatasetMeta(0).data[0].y;

    ctx.save();
    ctx.font = '500 16px Montserrat';
    ctx.fillStyle = '#2a2a2a';
    ctx.textAlign = 'center';
    ctx.fillText('Tổng', centerX, centerY - 24);

    ctx.font = '600 28px Montserrat';
    ctx.fillStyle = '#2a2a2a';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(options.total, centerX, centerY);

    ctx.font = '400 16px Montserrat';
    ctx.fillStyle = '#2a2a2a';
    ctx.textAlign = 'center';
    ctx.fillText('cơ sở', centerX, centerY + 20);
  },
};

ChartJS.register(ArcElement, Tooltip);

export const DoughnutChartBlock = ({
  className,
  dataset,
}: {
  className?: string;
  dataset: Array<{
    label: string;
    color: string;
    data: number;
  }>;
}) => {
  const [labels, data, backgroundColors] = useMemo(() => {
    return [
      dataset.map((v) => v.label),
      dataset.map((v) => v.data),
      dataset.map((v) => v.color),
    ];
  }, [dataset]);

  const doughnutData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: backgroundColors,
      },
    ],
  };

  return (
    <Block className={className}>
      <h4 className="mb-8 font-medium">Phân loại cơ sở</h4>
      <div className="flex items-center">
        <div className="mr-8 w-[200px]">
          <Doughnut
            data={doughnutData}
            plugins={[doughnutText]}
            options={{
              layout: {},
              cutout: '70%',
              plugins: {
                doughnutText: {
                  total: data.reduce((agg, curr) => agg + curr, 0),
                },
                tooltip: {
                  boxPadding: 8,
                },
              } as never,
            }}
          />
        </div>
        <div className="flex flex-1 flex-col gap-3">
          {doughnutData.labels.map((label, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 whitespace-nowrap text-sm"
            >
              <div
                className="size-2 rounded-[2px]"
                style={{
                  backgroundColor:
                    doughnutData.datasets[0].backgroundColor[idx],
                }}
              />
              {label}
            </div>
          ))}
        </div>
      </div>
    </Block>
  );
};
