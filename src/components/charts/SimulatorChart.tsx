import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
}
from "recharts";
import {
  formatChartLabel,
  formatScenario,
} from "../../lib/labels";

interface Props {

  data: any[];

}

export default function SimulatorChart({
  data
}: Props) {

  return (

    <div style={{ width: "100%", height: 300 }}>

      <ResponsiveContainer>

        <BarChart data={data}>

          <XAxis
            dataKey="scenario"
            tickFormatter={formatScenario}
            tick={{ fill: "#94a3b8", fontSize: 12 }}
          />

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
            labelFormatter={(label) =>
              formatScenario(String(label))
            }
          />

          <Bar
            dataKey="months"
            fill="#8b5cf6"
            radius={[6, 6, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}
