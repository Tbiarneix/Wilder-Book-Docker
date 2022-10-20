import { useState, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { GET_WILDERS } from "../App";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";

import {
  IWilderFromDb,
  IGradeFromDb,
  IWilder,
  ISkills,
  ISkillsInformations,
  IWilderFormModal,
  IGradeValue,
} from "../interfaces";

import AddSkillToWilder from "./AddSkillToWilder";

const CREATE_WILDER = gql`
  mutation CreateWilder($data: AddWildernput!) {
    createWilder(data: $data) {
      name
      description
    }
  }
`;

const GET_WILDER = gql`
  mutation GetOneWilder($getOneWilderId: Float!) {
    getOneWilder(id: $getOneWilderId) {
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

const UPDATE_WILDER = gql`
  mutation UpdateWilder($data: UpdateWilderInput!) {
    updateWilder(data: $data) {
      id
      name
      description
    }
  }
`;

const WilderFormModal = ({ id }: IWilderFormModal) => {
  const [modal, setModal] = useState<boolean>(false);
  const [name, setName] = useState<IWilder["name"]>("");
  const [description, setDescription] = useState<IWilder["description"]>("");
  const [skills, setSkills] = useState<ISkills[]>([]);
  const [skillsInformations, setSkillsInformations] = useState<
    ISkillsInformations[]
  >([]);
  const gradesValues: IGradeValue[] = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
    { value: 6 },
    { value: 7 },
    { value: 8 },
    { value: 9 },
    { value: 10 },
  ];
  const [createWilder, createWilderState] = useMutation(CREATE_WILDER, {
    refetchQueries: [{ query: GET_WILDERS }],
  });

  // const [getOneWilder, { loading, error, data }] = useMutation(GET_WILDER);

  // const oneWilderDatas = async () => {
  //   return await getOneWilder({
  //     variables: { getOneWilderId: id },
  //   });
  // };

  // useEffect(() => {
  //   if (id !== undefined) {
  //     setName(data.getOneWilder.name);
  //     setDescription(data.getOneWilder.description);
  //     setSkillsInformations(
  //       data.getOneWilder.grade.map((skill: IGradeFromDb) => ({
  //         id: skill.id,
  //         skillName: skill.skill.name,
  //         grade: skill.grade,
  //       }))
  //     );
  //   }
  // }, []);

  const postAWilder = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await createWilder({
      variables: { data: { name: name, description: description } },
    });
    setName("");
    setDescription("");
    setModal(false);
  };

  const updateAwilder = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // await axios.put("http://localhost:5000/api/wilders", {
    //   id: id,
    //   name: name,
    //   description: description,
    // });

    // skillsInformations.forEach(async (grade) => {
    //   await axios.put("http://localhost:5000/api/grade", {
    //     grade: grade.grade,
    //     id: grade.id,
    //   });
    // });
    setModal(false);
  };

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/api/skills")
  //     .then((res) => res.data)
  //     .then((data) => setSkills(data));
  // }, []);

  if (createWilderState.loading) return <p>Loading...</p>;
  if (createWilderState.error) return <p>Error :</p>;

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
        <form>
          <div className="form-section">
            <h2 style={{ textAlign: "center", color: "#F76C6C" }}>
              {id ? "Update a wilder" : "Add a wilder"}
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
          </div>
          <div className="form-section">
            <label htmlFor="description-area">Description :</label>
            <br />
            <textarea
              className="input"
              id="description-area"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
            <br />
          </div>
          <AddSkillToWilder
            id={id}
            skills={skills}
            skillsInformations={skillsInformations}
            setSkillsInformations={setSkillsInformations}
            gradesValues={gradesValues}
          />
          <div id="buttons" className="form-buttons-container">
            <button
              className="form-buttons"
              onClick={id ? (e) => updateAwilder(e) : (e) => postAWilder(e)}
            >
              {id ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </PureModal>
      <button
        className={id ? "form-buttons" : "add-wilder-button"}
        onClick={() => setModal(true)}
      >
        {id ? "Update a wilder" : "Add a wilder"}
      </button>
    </div>
  );
};

export default WilderFormModal;
