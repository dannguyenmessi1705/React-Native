import { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [goals, setGoals] = useState([]); // Khởi tạo mảng rỗng cho biến goals
  const [showModal, setShowModal] = useState(false); // Khởi tạo giá trị false cho biến showModal

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  // Hàm xử lý khi người dùng ấn nút Add course
  const handleAddCourse = (courseGoal) => {
    setGoals([...goals, { text: courseGoal, id: Math.random().toString() }]);
    handleHideModal();
  };

  const handleDeleteCourse = (id) => {
    setGoals((goals) => goals.filter((goal) => goal.id !== id));
  };

  return (
    <>
      <StatusBar style="inverted" />
      <View style={styles.container}>
        <Button
          title="Create new course"
          color="#a065ec"
          onPress={handleShowModal}
        />
        <GoalInput
          handleAddCourse={handleAddCourse}
          showModal={showModal}
          handleHideModal={handleHideModal}
        />
        <View style={styles.contentContainer}>
          <FlatList
            data={goals} // List dữ liệu cần render
            keyExtractor={(item, index) => item.id} // Hàm tạo key cho mỗi item, keyExtractor nhận vào 2 tham số là item và index, trả về giá trị id của item trong goals
            alwaysBounceVertical={false} // Tắt chức năng cuộn khi kéo xuống dưới cùng hoặc kéo lên trên cùng khi nội dung không vượt quá View cha
            showsVerticalScrollIndicator={false} // Tắt thanh cuộn bên phải
            renderItem={(
              itemData // Hàm render mỗi item trong data
            ) => (
              <GoalItem
                itemData={itemData}
                handleDeleteCourse={handleDeleteCourse}
              />
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  contentContainer: {
    flex: 4,
  },
});
// Tạo style cho từng attribute
