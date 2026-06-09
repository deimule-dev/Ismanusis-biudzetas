import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatChartLabel } from "../../lib/labels";

interface Props {
  data: {
    date: string;
    count: number;
  }[];
}

export default function AILogsChart({
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

          <Bar
            dataKey="count"
            fill="#8b5cf6"
            radius={[6, 6, 0, 0]}
          />

          <CartesianGrid stroke="rgba(148,163,184,0.1)" />

          <XAxis dataKey="date" tick={{ fill: "#94a3b8", fontSize: 11 }} />

          <YAxis allowDecimals={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />

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

        </BarChart>

      </ResponsiveContainer>

    </div>

  );
}
