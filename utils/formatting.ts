export const formatScope = (scopeLabel: string) =>
  scopeLabel.toLowerCase().replaceAll(/\s+/g, "-").trim();
