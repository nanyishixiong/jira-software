import { useArray } from "utils";

export const TestTSHook = () => {
  const person: { name: string; age: number }[] = [
    { name: "jack", age: 11 },
    { name: "Nanyi", age: 10 },
  ];

  const { value, clear, removeIndex, add } = useArray(person);

  return (
    <div>
      <button
        onClick={() => {
          add({ name: "Nanyi", age: 18 });
        }}
      >
        addNanyi
      </button>
      <button
        onClick={() => {
          clear();
        }}
      >
        clear
      </button>
      <button
        onClick={() => {
          removeIndex(0);
        }}
      >
        removeIndex 0
      </button>
      {value.map((item, index) => (
        <div key={index}>
          <span style={{ color: "red" }}>{index}</span>
          <span>{item.name}</span>
          <span>{item.age}</span>
        </div>
      ))}
    </div>
  );
};
