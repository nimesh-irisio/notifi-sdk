const collectDependencies = (...dependencies: string[]): string => {
  const set = new Set<string>();
  dependencies?.forEach(set.add);
  return Array.from(set).join('\n');
};

export default collectDependencies;
