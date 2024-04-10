import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";

export default function App() {
  const [courseGoal, setCourseGoal] = useState(""); // Khởi tạo giá trị rỗng cho biến courseGoal
  const [goals, setGoals] = useState([]); // Khởi tạo mảng rỗng cho biến goals

  // Hàm xử lý khi người dùng nhập text vào input
  const handleTextInput = (textEntered) => {
    setCourseGoal(textEntered);
  };

  // Hàm xử lý khi người dùng ấn nút Add course
  const handleAddCourse = () => {
    setGoals([...goals, { text: courseGoal, id: Math.random().toString() }]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Your course goal"
          onChangeText={handleTextInput}
        />
        {/* Tạo input, trong RN sẽ là self close tag */}
        <Button title="Add course" onPress={handleAddCourse} />
        {/* Tạo button, trong RN sẽ là self close tag, Button trong RN sẽ không có thẻ style */}
      </View>
      <View style={styles.contentContainer}>
        <FlatList
          data={goals} // List dữ liệu cần render
          keyExtractor={(item, index) => item.id} // Hàm tạo key cho mỗi item, keyExtractor nhận vào 2 tham số là item và index, trả về giá trị id của item trong goals
          alwaysBounceVertical={false} // Tắt chức năng cuộn khi kéo xuống dưới cùng hoặc kéo lên trên cùng khi nội dung không vượt quá View cha
          showsVerticalScrollIndicator={false} // Tắt thanh cuộn bên phải
          renderItem={(itemData) => ( // Hàm render mỗi item trong data
            <View style={styles.goalItem}>
              <Text style={styles.goalText}>{itemData.item.text}</Text>
            </View>
          )}
        />
        {/* <ScrollView
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
        >
          {goals.map((goal) => (
            <View style={styles.goalItem} key={goal}>
              <Text style={styles.goalText}>{goal}</Text>
            </View>
          ))}
          {/* Duyệt mảng goals và hiển thị ra màn hình 
          Luôn nhớ rằng mỗi phần tử  Text được render ra phải được bao bọc bởi một View để có thể áp dụng style cho nó, vì IOS không cho phép render Text mà không bao bọc bởi View
          Ngoài ra để áp dụng các styke như color, fontSize, fontWeight cho Text thì phải sử dụng style attribute của Text, không thể sử dụng style attribute của View để áp dụng cho Text vì React Native không dùng CSS và không có chuyện kế thừa style như CSS
        */}
        {/* </ScrollView> */}
        {/* Tạo ScrollView để cho phép người dùng cuộn nếu nội dung quá dài khi vượt qua khỏi View cha
        ScrollView sẽ tự động thêm thanh cuộn nếu nội dung vượt quá View cha
        Thêm thuộc tính alwaysBounceVertical={false} để tắt chức năng cuộn khi kéo xuống dưới cùng hoặc kéo lên trên cùng khi nội dung không vượt quá View cha
        */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    marginBottom: 24,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "70%",
    margin: 8,
    padding: 8,
  },
  contentContainer: {
    flex: 4,
  },
  goalItem: {
    padding: 8,
    margin: 8,
    backgroundColor: "#5ea0cc",
    borderRadius: 6,
  },
  goalText: {
    color: "white",
  },
});
// Tạo style cho từng attribute
