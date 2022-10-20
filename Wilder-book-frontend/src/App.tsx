import { useQuery, gql } from "@apollo/client";
import "./App.css";

import { IWilderFromDb, IWilder } from "./interfaces";
import Wilder from "./components/Wilder";
import WilderFormModal from "./components/WilderFormModal";
import SkillFormModal from "./components/SkillFormModal";

export const GET_WILDERS = gql`
  query GetAllWilders {
    getAllWilders {
      id
      name
      description
      grade {
        id
        grade
        skill {
          name
        }
      }
    }
  }
`;

const App = () => {
  const formattedData = (datas: IWilderFromDb[]): IWilder[] => {
    return datas.map((data) => ({
      id: data.id,
      name: data.name,
      description: data.description,
      skills: data.grade.map((skill) => ({
        id: skill.id,
        title: skill.skill.name,
        votes: skill.grade,
      })),
    }));
  };

  const { loading, error, data } = useQuery(GET_WILDERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <header>
        <div className="container">
          <h1>Wilders Book</h1>
        </div>
      </header>
      <main className="container">
        <div className="button-form-container">
          <WilderFormModal id={undefined} />
          <SkillFormModal />
        </div>
        <div className="wilder-modal">
          <div className="modal-form">
            <div className="modal-style"></div>
          </div>
        </div>
        <div className="wilder-modal">
          <div className="modal-form">
            <div className="modal-style">
              <p>Modal Add skills</p>
            </div>
          </div>
        </div>
        <h2>Wilders</h2>
        <section className="card-row">
          {formattedData(data.getAllWilders).map((wilder) => (
            <Wilder
              key={wilder.id}
              id={wilder.id}
              name={wilder.name}
              description={wilder.description}
              skills={wilder.skills}
            />
          ))}
        </section>
      </main>
      <footer>
        <div className="container">
          <p>&copy; 2022 Wild Code School</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
