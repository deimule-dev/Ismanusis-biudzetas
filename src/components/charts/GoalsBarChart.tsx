import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: any[];
}

export default function GoalsBarChart({
  data,
}: Props) {
  return (
    <div
      style={{
        width: "100%",
        height: 300,
      }}
    >
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="title" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="current_amount"
            fill="#16a34a"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
