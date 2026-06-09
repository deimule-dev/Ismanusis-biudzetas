export function calculateScenarios(
  income: number,
  expenses: number,
  goalAmount: number
) {

  const conservativeSaving =
    (income - expenses) * 0.5;

  const normalSaving =
    (income - expenses);

  const aggressiveSaving =
    (income - expenses) * 1.5;

  function monthsNeeded(
    monthlySaving: number
  ) {

    if (monthlySaving <= 0)
      return 0;

    return Math.ceil(
      goalAmount /
      monthlySaving
    );
  }

  return [

    {
      scenario: "Conservative",
      months:
        monthsNeeded(
          conservativeSaving
        )
    },

    {
      scenario: "Normal",
      months:
        monthsNeeded(
          normalSaving
        )
    },

    {
      scenario: "Aggressive",
      months:
        monthsNeeded(
          aggressiveSaving
        )
    }

  ];

}
