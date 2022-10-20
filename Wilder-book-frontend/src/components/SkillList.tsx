import { useState } from "react";
import { useQuery, gql } from "@apollo/client";

import { ISkillsInformationProp } from "../interfaces";

const SkillList = ({
  id,
  grade,
  setGrade,
  gradesValues,
  skillsInformations,
  setSkillsInformations,
}: ISkillsInformationProp) => {
  const [gradeIdToChange, setGradeIdToChange] = useState<number>();
  const deleteOneGradeWhenWilderExist = async (
    e: any,
    gradeId: number | undefined
  ) => {
    e.preventDefault();
    // await axios.delete("http://localhost:5000/api/grade", {
    //   data: {
    //     gradeId: gradeId,
    //   },
    // });
  };

  const deleteOneGradeWhenWilderDoesentExist = (
    e: any,
    gradeName: string | undefined
  ) => {
    e.preventDefault();
    setSkillsInformations(
      skillsInformations.filter((grade) => grade.skillName !== gradeName)
    );
  };

  return (
    <div className="list-decoration">
      {skillsInformations.map((grade) => (
        <div className="add-skill-form-list" key={grade.id}>
          <select className="select" id="skill-select">
            <option value={grade.skillName}>{grade.skillName}</option>
          </select>
          <select
            className="select"
            id="grade-select"
            onChange={(e) => {
              setGrade(parseInt(e.target.value, 10)),
                setSkillsInformations([
                  {
                    ...grade,
                    grade: parseInt(e.target.value, 10),
                  },
                  ...skillsInformations.filter(
                    (gradeToUpdate) => gradeToUpdate.id !== grade.id
                  ),
                ]);
            }}
          >
            <option value={grade.grade}>{grade.grade}</option>
            {gradesValues.map((grade) => (
              <option key={grade.value} value={grade.value}>
                {grade.value}
              </option>
            ))}
          </select>
          <button
            className="form-buttons"
            onClick={
              id
                ? (e) => deleteOneGradeWhenWilderExist(e, grade.id)
                : (e) =>
                    deleteOneGradeWhenWilderDoesentExist(e, grade.skillName)
            }
          >
            Remove Skill
          </button>
        </div>
      ))}
    </div>
  );
};

export default SkillList;
