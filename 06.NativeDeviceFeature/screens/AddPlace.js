import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../util/database";

function AddPlace({ navigation }) {
  async function onCreatePlace(place) {
    await insertPlace(place); // Thêm địa điểm vào database
    navigation.navigate("AllPlaces");
  } // Hàm tạo mới địa điểm
  return <PlaceForm onCreatePlace={onCreatePlace} />;
}

export default AddPlace;
