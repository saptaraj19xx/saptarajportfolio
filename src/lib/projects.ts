import { useMemo } from "react";
import { PROJECTS } from "../data/projects";

export function useProjects() {
  const projects = useMemo(
    () => PROJECTS.filter((project) => project.published),
    [],
  );

  return {
    projects,
    loading: false,
    error: "",
  };
}
