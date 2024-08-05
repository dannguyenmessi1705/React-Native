import PlaceForm from "../components/Places/PlaceForm";

function AddPlace({ navigation }) {
  function onCreatePlace(place) {
    navigation.navigate("AllPlaces", {
      place,
    });
  } // Hàm tạo mới địa điểm
  return <PlaceForm onCreatePlace={onCreatePlace} />;
}

export default AddPlace;
