import { useState } from "react";
import { Header } from "../../components/Header";
import List from "../../components/List";
import "./styles.css";

function App() {
  const [user, setUser] = useState("");
  const [correntUser, setCorrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if (newUser.name) {
      const { avatar_url, name, bio, login } = newUser;
      setCorrentUser({ avatar_url, name, bio, login });

      const reposData = await fetch(
        `https://api.github.com/users/${user}/repos`
      );
      const newRepos = await reposData.json();

      if (newRepos.length) {
        setRepos(newRepos);
      }
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="conteudo">
        <div className="info">
          <div className="busca">
            <input
              name="Usuario"
              value={user}
              onChange={(event) => setUser(event.target.value)}
              placeholder="@username"
            />
            <button onClick={handleGetData}>Buscar</button>
          </div>
          {correntUser?.name ? (
            <>
              <div className="perfil">
                <img
                  src={correntUser.avatar_url}
                  className="profile_image"
                  alt="profile"
                />

                <div className="profile_info">
                  <h3>{correntUser.name}</h3>
                  <span>{`@${correntUser.login}`}</span>
                  <p>{correntUser.bio}</p>
                </div>
              </div>
            </>
          ) : null}

          {repos?.length ? (
            <>
              <hr />
              <div className="repositories">
                <h3>Repositórios</h3>
                {repos.map((repo) => (
                  <List title={repo.name} description={repo.description} />
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
