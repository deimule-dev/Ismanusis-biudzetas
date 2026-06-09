import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
} from "recharts";

interface Props {
  data: any[];
}

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#dc2626",
  "#f59e0b",
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

      <Tooltip />

      <Legend />
    </PieChart>
  );
}
