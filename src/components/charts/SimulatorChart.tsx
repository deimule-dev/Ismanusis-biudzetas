import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
}
from "recharts";

interface Props {

  data: any[];

}

export default function SimulatorChart({
  data
}: Props) {

  return (

    <div
      style={{
        width: "100%",
        height: 350
      }}
    >

      <ResponsiveContainer>

        <BarChart data={data}>

          <XAxis
            dataKey="scenario"
          />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="months"
            fill="#3b82f6"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}
