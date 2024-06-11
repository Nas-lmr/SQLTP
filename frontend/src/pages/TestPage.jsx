import { useUserContext } from "../contexts/userContext";

export default function TestPage() {
  const { userData } = useUserContext();
  console.log(userData, "TEST PAGE");
  return <div>TestPage</div>;
}
