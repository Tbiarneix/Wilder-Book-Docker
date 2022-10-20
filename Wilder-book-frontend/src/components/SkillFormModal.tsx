import { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { GET_WILDERS } from "../App";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";

const GET_SKILLS = gql`
  query GetAllSkills {
    getAllSkills {
      id
      name
    }
  }
`;

const CREATE_SKILL = gql`
  mutation CreateSkill($name: String!) {
    createSkill(name: $name) {
      name
    }
  }
`;

const DELETE_SKILL = gql`
  mutation DeleteSkill($deleteSkillId: Float!) {
    deleteSkill(id: $deleteSkillId)
  }
`;

const SkillFormModal = () => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");

  const {
    loading: skillsLoading,
    error: skillsError,
    data: skillsData,
  } = useQuery(GET_SKILLS);

  const [createSkill, createSkillState] = useMutation(CREATE_SKILL, {
    refetchQueries: [{ query: GET_SKILLS }, { query: GET_WILDERS }],
  });

  const [deleteSkill, deleteState] = useMutation(DELETE_SKILL, {
    refetchQueries: [{ query: GET_SKILLS }, { query: GET_WILDERS }],
  });

  const submitForm = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await createSkill({
      variables: { name: name },
    });
    setName("");
  };

  const removeSkill = async (id: number) => {
    await deleteSkill({
      variables: { deleteSkillId: id },
    });
  };

  if (skillsLoading) return <p>Loading...</p>;
  if (skillsError) return <p>Error :(</p>;

  return (
    <div>
      <PureModal
        isOpen={modal}
        width={"20%"}
        closeButton="X"
        closeButtonPosition="header"
        className="modal-style"
        onClose={() => {
          setModal(false);
          return true;
        }}
      >
        <div>
          <form>
            <div className="form-section">
              <h2 style={{ textAlign: "center", color: "#F76C6C" }}>
                Add or remove a skill
              </h2>
              <label htmlFor="name-input">Name :</label>
              <br />
              <input
                className="input"
                id="name-input"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <button
                type="submit"
                className="form-buttons"
                style={{ marginLeft: "1em" }}
                onClick={(e) => {
                  submitForm(e);
                }}
              >
                Add
              </button>
            </div>
          </form>
          <div className="form-section">
            <h3 style={{ textAlign: "center", color: "#F76C6C" }}>
              {" "}
              Skill list
            </h3>
            {skillsData.getAllSkills.map((skill: any) => (
              <div className="skill-list" key={skill.id}>
                <p>{skill.name}</p>
                <button
                  className="form-buttons"
                  value={skill.id}
                  onClick={() => removeSkill(skill.id)}
                >
                  Remove skill
                </button>
              </div>
            ))}
          </div>
        </div>
      </PureModal>
      <button className="add-wilder-button" onClick={() => setModal(true)}>
        Add or remove a skill
      </button>
    </div>
  );
};

export default SkillFormModal;
