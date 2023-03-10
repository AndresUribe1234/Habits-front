const HabitElement = (props) => {
  const { habit } = props;
  return <li key={`${Math.random()}`}>{habit}</li>;
};

export default HabitElement;
