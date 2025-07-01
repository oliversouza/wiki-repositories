import gitLogo from "../assets/github.png";
import { Container } from "./styles";
import Input from "../components/Input";
import Button from "../components/Button";
import ItemRepo from "../components/ItemRepo";
import { useState } from "react";
import { api } from "../services/api";

function App() {
  const [currentRepo, setCurrentRepo] = useState("");
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {
    const { data } = await api.get(`repos/${currentRepo}`);

    if (data.id) {
      const isExist = repos.find((repo) => repo.id === data.id);

      if (!isExist) {
        setRepos((prev) => [...prev, data]);
        setCurrentRepo("");
        return;
      }
    }
    alert("Repositório não encontrado");
  };
  const handleRemoveRepo = (id) => {
    console.log("removendo registro", id);
    const newRepo = repos.filter((repo) => repo.id !== id);
    setRepos(newRepo);
  };
  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt="github" />
      <Input
        value={currentRepo}
        onChange={(e) => setCurrentRepo(e.target.value)}
      />
      <Button onClick={handleSearchRepo} />
      {repos.map((repo) => (
        <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo} />
      ))}
    </Container>
  );
}

export default App;
