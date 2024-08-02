import { useContext, useEffect, useState } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fecthExpense } from "../util/http";
import Loading from "../components/UI/Loading";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpenses() {
  const [isFetching, setFetching] = useState(false);
  const [error, setError] = useState("");
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetching(true);
        const expenses = await fecthExpense();
        expensesCtx.setExpense(expenses);
        setFetching(false);
      } catch (error) {
        setError("Fail to fecth data");
        setFetching(false);
      }
    };
    fetchData();
  }, []);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  if (isFetching) {
    return <Loading />;
  }

  if (error && !isFetching)
    return <ErrorOverlay message={error} onPress={() => setError("")} />;

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
}

export default RecentExpenses;
