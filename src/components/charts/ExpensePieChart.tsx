import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
} from "recharts";
import { formatChartLabel } from "../../lib/labels";

interface Props {
  data: any[];
}

const COLORS = [
  "#10b981",
  "#8b5cf6",
  "#fb7185",
  "#fbbf24",
  "#34d399",
  "#a78bfa",
];

export default function ExpensePieChart({
  data,
}: Props) {
  return (
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        dataKey="amount"
        nameKey="name"
        outerRadius={100}
      >
        {data.map((_, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>

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

      <Legend wrapperStyle={{ color: "#94a3b8", fontSize: "13px" }} />
    </PieChart>
  );
}
