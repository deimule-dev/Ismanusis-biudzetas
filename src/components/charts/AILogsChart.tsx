import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
            fill="#aa3bff"
          />

          <CartesianGrid stroke="#ccc" />

          <XAxis dataKey="date" />

          <YAxis allowDecimals={false} />

          <Tooltip />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );
}
