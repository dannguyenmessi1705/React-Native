import { View, Text, Pressable, StyleSheet } from "react-native";
function PrimaryButton({ children }) {
  const handlePress = () => {
    console.log("Button pressed");
  };
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.iosPress]
            : styles.buttonInnerContainer
        } // Hiệu ứng khi nhấn button cho ios, nếu pressed thì thêm hiệu ứng iosPress và buttonInnerContainer, còn không thì chỉ thêm buttonInnerContainer
        android_ripple={{ color: "#640233" }} // Hiệu ứng khi nhấn button cho android
        onPress={handlePress}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 26,
    margin: 4,
    overflow: "hidden", // Ẩn phần nội dung vượt ra ngoài khung, nếu hiệu ứng khi nhấn button vượt ra ngoài khung thì sẽ bị ẩn
  },
  buttonInnerContainer: {
    backgroundColor: "#72063c",
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2, // Hiệu ứng bóng cho button cho android
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  iosPress: {
    opacity: 0.75,
  },
});

export default PrimaryButton;
