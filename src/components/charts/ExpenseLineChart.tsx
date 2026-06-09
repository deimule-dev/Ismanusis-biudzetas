import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: any[];
}

export default function ExpenseLineChart({
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
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#2563eb"
          />

          <CartesianGrid stroke="#ccc" />

          <XAxis dataKey="date" />

          <YAxis />

          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
