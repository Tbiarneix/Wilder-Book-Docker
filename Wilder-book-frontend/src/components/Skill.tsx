import { ISkills } from "../interfaces";

const Skill = ({ title, votes }: ISkills) => {
  return (
    <>
      <li>
        {title}
        <span className="votes">{votes}</span>
      </li>
    </>
  );
};

export default Skill;
