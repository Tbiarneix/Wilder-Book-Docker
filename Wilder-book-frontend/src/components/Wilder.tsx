import { gql, useMutation } from "@apollo/client";
import { GET_WILDERS } from "../App";
import blank_profile from "../assets/blank_profile.png";
import Skill from "./Skill";
import WilderFormModal from "./WilderFormModal";

import { IWilderProps } from "../interfaces";

const DELETE_WILDER = gql`
  mutation DeleteWilder($deleteWilderId: Float!) {
    deleteWilder(id: $deleteWilderId)
  }
`;

const Wilder = ({ id, name, description, skills }: IWilderProps) => {
  const [deleteWilder, { data, loading, error }] = useMutation(DELETE_WILDER, {
    refetchQueries: [{ query: GET_WILDERS }],
  });

  const deleteOnClick = async () => {
    await deleteWilder({
      variables: { deleteWilderId: id },
    });
  };

  return (
    <div className="card">
      <img src={blank_profile} alt="Jane Doe Profile" />
      <h3>{name}</h3>
      <p>{description}</p>
      <h4>Wild Skills</h4>
      <ul className="skills">
        {skills.map((skill) => (
          <Skill
            key={skill.id}
            id={skill.id}
            title={skill.title}
            votes={skill.votes}
          />
        ))}
      </ul>
      <div className="wilder-buttons-container">
        <WilderFormModal id={id} />
        <button
          className="form-buttons"
          onClick={() => {
            deleteOnClick();
          }}
        >
          Delete the wilder
        </button>
      </div>
    </div>
  );
};

export default Wilder;
