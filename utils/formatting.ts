import _ from "lodash";

export const formatScope = (scopeLabel: string) =>
  scopeLabel.toLowerCase().replaceAll(/\s+/g, "-").trim();

export const formatContributors = (contributors: string[]) => {
  if (contributors.length === 0) {
    return "";
  }

  if (contributors.length === 1) {
    return contributors[0];
  }

  const initial = _.initial(contributors);
  const last = _.last(contributors);

  return `${initial.join(", ")} & ${last}`;
};
