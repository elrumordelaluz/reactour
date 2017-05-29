const bestPositionOf = positions => {
  return Object.keys(positions)
    .map(p => ({
      position: p,
      value: positions[p],
    }))
    .sort((a,b) => b.value - a.value)
    .map(p => p.position)
};

export default bestPositionOf;
