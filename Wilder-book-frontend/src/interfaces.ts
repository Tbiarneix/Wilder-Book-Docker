import { Dispatch, SetStateAction } from "react";
export interface IWilder {
  id: number;
  name: string;
  description: string;
  skills: ISkills[];
}
export interface IWilderProps {
  id: number;
  name: string;
  description: string;
  skills: ISkills[];
}
export interface IWilderFromDb {
  id: number;
  name: string;
  description: string;
  grade: IGradeFromDb[];
}

export interface IWilderFormModal {
  id?: number;
}

export interface IGradeValue {
  value: number;
}
export interface IGradeFromDb {
  id: number;
  grade: number;
  skill: {
    id: number;
    name: string;
  };
}

export interface ISkills {
  id: number;
  title: string;
  name?: string;
  votes: number;
}

export interface ISkillsFromDb {
  id: number;
  name: string;
}

export interface ISkillsInformations {
  id?: number;
  skillName: string;
  grade: number;
}

export interface ISkillsProps {
  id: number;
  name: string;
}

export interface IAddSkillToWilderProps {
  id?: number;
  skills: ISkills[];
  skillsInformations: ISkillsInformations[];
  setSkillsInformations: Dispatch<SetStateAction<ISkillsInformations[]>>;
  gradesValues: IGradeValue[];
}

export interface ISkillsInformationProp {
  id?: number | undefined;
  grade: number;
  setGrade: Dispatch<SetStateAction<number>>;
  gradesValues: IGradeValue[];
  skillsInformations: ISkillsInformations[];
  setSkillsInformations: Dispatch<SetStateAction<ISkillsInformations[]>>;
}
