import Cookies from "js-cookie";

//Funcion modificada
export default function authHeader() {
  const user = Cookies.get("token");
  console.log(user);
  if (user) {
    return { Authorization: "Bearer " + user };
  } else {
    return {};
  }


}
