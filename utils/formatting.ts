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

export const formatFractionPercentage = (
  fractionUnits: string,
  totalUnits: string
) => {
  const totalUnitsParsed = parseInt(totalUnits, 10);
  if (totalUnitsParsed === 0) {
    return "0%";
  }

  const fractionUnitsParsed = parseInt(fractionUnits, 10);

  const fraction = fractionUnitsParsed / totalUnitsParsed;
  const percentage = fraction * 100;

  return `${percentage.toFixed(0)}%`;
};

export const formatTime = (startTime: number, endTime: number) => {
  return `${startTime} - ${endTime}`;
};
