import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import { storeExpense, updateExpense, deleteExpense } from "../util/http";
import Loading from "../components/UI/Loading";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpense({ route, navigation }) {
  const [isFetching, setFetching] = useState(false);
  const [error, setError] = useState("");

  const expensesCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    try {
      setFetching(true);
      await deleteExpense(editedExpenseId);
      expensesCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
      setFetching(false);
    } catch (error) {
      setError("Cannot delete data");
      setFetching(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    try {
      if (isEditing) {
        setFetching(true);
        await updateExpense(editedExpenseId, expenseData);
        expensesCtx.updateExpense(editedExpenseId, expenseData);
        setFetching(false);
      } else {
        const id = await storeExpense(expenseData);
        setFetching(true);

        expensesCtx.addExpense({ ...expenseData, id: id });
        setFetching(false);
      }
      navigation.goBack();
    } catch (error) {
      setError("Cannot add or update data");
      setFetching(false);
    }
  }

  if (isFetching) return <Loading />;

  if (error && !isFetching)
    return <ErrorOverlay message={error} onPress={() => setError("")} />;

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
