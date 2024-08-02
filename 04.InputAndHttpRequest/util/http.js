import axios from "axios";
const FIREBASE_URL =
  "https://react-native-99924-default-rtdb.asia-southeast1.firebasedatabase.app/";

export const storeExpense = async (expenseData) => {
  const res = await axios.post(`${FIREBASE_URL}/expenses.json`, {
    expenseData,
  });
  const id = res.data.name;
  return id;
};

export const fecthExpense = async () => {
  const res = await axios.get(`${FIREBASE_URL}/expenses.json`);

  const expenseData = [];

  for (const key in res.data) {
    const expense = {
      id: key,
      amount: +res.data[key].expenseData.amount,
      date: new Date(res.data[key].expenseData.date),
      description: res.data[key].expenseData.description,
    };

    expenseData.push(expense);
  }
  return expenseData;
};

export const updateExpense = async (id, expenseData) => {
  return axios.put(`${FIREBASE_URL}/expenses/${id}.json`, {
    expenseData: expenseData,
  });
};

export const deleteExpense = async (id) => {
  return axios.delete(`${FIREBASE_URL}/expenses/${id}.json`);
};
