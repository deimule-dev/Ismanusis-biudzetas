import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatChartLabel } from "../../lib/labels";

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
            stroke="#10b981"
            strokeWidth={2}
            dot={{ fill: "#10b981", r: 4 }}
          />

          <CartesianGrid stroke="rgba(148,163,184,0.1)" />

          <XAxis dataKey="date" tick={{ fill: "#94a3b8", fontSize: 11 }} />

          <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />

          <Tooltip
            contentStyle={{
              background: "#1a2236",
              border: "1px solid rgba(148,163,184,0.2)",
              borderRadius: "10px",
              color: "#f1f5f9",
            }}
            formatter={(value, name) => [
              value,
              formatChartLabel(String(name)),
            ]}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
