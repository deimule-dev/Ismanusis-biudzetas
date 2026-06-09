import { useAIInsights }
from "../hooks/useAIInsights";

import AILogsChart
from "../components/charts/AILogsChart";

export default function AIInsights() {

  const {
    insight,
    recommendations,
    monthlySummary,
    logs,
    loading,
    error,
  } = useAIInsights();

  if (loading)
    return <p>Loading...</p>;

  if (error)
    return <p>{error}</p>;

  const chartData =
    Object.entries(

      logs.reduce<Record<string, number>>(
        (acc, log) => {

          const date =
            new Date(log.created_at)
              .toLocaleDateString();

          acc[date] =
            (acc[date] || 0) + 1;

          return acc;

        },
        {}
      )

    ).map(([date, count]) => ({
      date,
      count,
    }));

  return (

    <div>

      <h1>
        AI Insights
      </h1>

      <hr />

      <h2>
        AI Insights
      </h2>

      <p>
        {insight}
      </p>

      <hr />

      <h2>
        AI Recommendations
      </h2>

      <p>
        {recommendations}
      </p>

      <hr />

      <h2>
        AI Monthly Summary
      </h2>

      <p>
        {monthlySummary}
      </p>

      <hr />

      <h2>
        AI History
      </h2>

      <h3>
        AI Usage Chart
      </h3>

      <AILogsChart
        data={chartData}
      />

      <h3>
        Recent AI Logs
      </h3>

      {logs.length === 0 && (
        <p>No AI history yet.</p>
      )}

      {logs.map((log) => (

        <div
          key={log.id}
          style={{
            marginBottom: "1rem",
            padding: "1rem",
            border: "1px solid #e5e4e7",
            borderRadius: "8px",
          }}
        >

          <p>
            <strong>
              {new Date(
                log.created_at
              ).toLocaleString()}
            </strong>
          </p>

          <p>
            {log.response}
          </p>

        </div>

      ))}

    </div>

  );
}
