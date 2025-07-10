'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
} from '@/components/ui';
import { cn } from '@/lib/utils';
import {
  CategoryScale,
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  defaults,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Block } from './Block';
import { useMemo, useTransition } from 'react';
import { parseAsStringEnum, useQueryState } from 'nuqs';
import { TIME_FILTER } from '@/services/dashboard/type';
defaults.font.family = 'Montserrat';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
);

export const LineChartBlock = ({
  className,
  dataset,
}: {
  className?: string;
  dataset: Array<{ date: Date; data: number }>;
}) => {
  const [loading, startTransition] = useTransition();
  const [time, setTime] = useQueryState('time', {
    ...parseAsStringEnum(Object.values(TIME_FILTER)),
    history: 'replace',
    shallow: false,
    startTransition,
    defaultValue: TIME_FILTER.WEEK,
  });

  const data = useMemo(
    () => ({
      labels: dataset.map(
        (v) => v.date.getDate() + '/' + (v.date.getMonth() + 1),
      ),
      datasets: [
        {
          data: dataset.map((v) => v.data),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    }),
    [dataset],
  );

  return (
    <Block className={cn('flex flex-col', className)}>
      <div className="mb-6 flex items-center justify-between">
        <h4 className="text-base font-medium">Biểu đồ số liệu</h4>
        <Select value={time} onValueChange={setTime as never}>
          <SelectTrigger className="w-fit min-w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[
              { value: '1_week', name: '7 ngày gần đây' },
              { value: '1_month', name: 'Trong vòng 30 ngày' },
              { value: '3_months', name: 'Trong vòng 3 tháng' },
              { value: '6_months', name: 'Trong vòng 6 tháng' },
              { value: '1_year', name: 'Trong vòng 1 năm' },
            ].map(({ value, name }, idx) => (
              <SelectItem key={idx} value={value}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1">
        {loading ? (
          <Skeleton className="h-[300px]" />
        ) : (
          <Line
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                },
              },
            }}
            data={data}
          />
        )}
      </div>
    </Block>
  );
};
