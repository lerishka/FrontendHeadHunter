import { PillsInput, Pill } from "@mantine/core";
import { useState } from "react";
import Button from "../../../ui/Button/Button";
import { IconPlus } from "@tabler/icons-react";
import { useTypedDispatch, useTypedSelector } from "../../../hooks/redux";
import { setSkills } from "../../../store/vacanciesSlice";
import type { RootState } from "../../../store";
import styles from "./SkillsFilter.module.scss";

export default function SkillsFilter() {
  const [textTag, setTextTag] = useState("");
  const dispatch = useTypedDispatch();
  const skills = useTypedSelector(
    (state: RootState) => state.vacancies.filters.skills
  );

  const handleRemoveTag = (tagToRemove: string) => {
    dispatch(setSkills(skills.filter((tag) => tag !== tagToRemove)));
  };

  const handleTextTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextTag(e.target.value);
  };

  const handleAddTag = () => {
    if (!textTag) return;
    dispatch(setSkills([...skills, textTag]));
    setTextTag("");
  };

  return (
    <div className={styles.tagsInputWrapper}>
      <PillsInput variant="unstyled" label="Ключевые навыки">
        <div className={styles.pillsInputWrapper}>
          <PillsInput.Field
            value={textTag}
            placeholder="Навык"
            className={styles.input}
            onChange={handleTextTag}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddTag();
              }
            }}
          />
          <Button
            radius={8}
            size="xs"
            className={styles.plusButton}
            onClick={handleAddTag}
          >
            <IconPlus stroke={1.5} />
          </Button>
        </div>
        <Pill.Group gap={5}>
          {skills.length > 0
            ? skills.map((skill) => (
                <Pill
                  key={skill}
                  data-testid={`skill-${skill}`}
                  withRemoveButton
                  onRemove={() => handleRemoveTag(skill)}
                  className={styles.pill}
                >
                  {skill}
                </Pill>
              ))
            : null}
        </Pill.Group>
      </PillsInput>
    </div>
  );
}
