const FormMeals = ({
  mealsKeys,
  onSelectedMeal,
  selectedMeal,
}: {
  mealsKeys: string[];
  onSelectedMeal: (meal: string) => void;
  selectedMeal: string;
}) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    onSelectedMeal(selectedValue);
    localStorage.setItem("selectedMeal", selectedValue);
  };

  return (
    <form className="z-10 mx-auto w-full space-y-6 py-4" id="top">
      <h1 className="py-2 text-4xl font-semibold">Categories</h1>

      <ul className="xl:flex xl:flex-row">
        {mealsKeys.map((mealKey, index) => (
          <li key={index}>
            <input
              type="radio"
              id={mealKey}
              value={mealKey}
              name="selectedMeal"
              className="hidden"
              checked={mealKey === selectedMeal}
              onChange={handleChange}
            />
            <label
              htmlFor={mealKey}
              className="block hover:text-black hover:bg-[#febd2f]/75 duration-300 cursor-pointer rounded-xl border-2 border-gray-500 border-opacity-60 p-3 text-2xl max-2xl:xl:text-xl font-bold"
            >
              {mealKey}
            </label>
          </li>
        ))}
      </ul>
    </form>
  );
};

export default FormMeals;