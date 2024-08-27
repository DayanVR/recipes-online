import { useEffect, useState } from "react";
import separateByMeal from "./separatedByMeal";
import FormMeals from "./formMeals";
import type { ProductInfo } from "../types";

type SeparatedMeals = {
  [key: string]: ProductInfo[];
};

const ProductArray = () => {
  const [displayMeals, setDisplayMeals] = useState<ProductInfo[]>([]);
  const [mealsKeys, setMealsKeys] = useState<string[]>([]);
  const [separatedMeals, setSeparatedMeals] = useState<SeparatedMeals>({});
  const [selectedMeal, setSelectedMeal] = useState<string>("");

  useEffect(() => {
    const fetchRecipe = async () => {
      await fetch("https://dummyjson.com/recipes")
        .then((res) => res.json())
        .then((data) => data.recipes)
        .then((recipes) => separateByMeal(recipes))
        .then((separatedMeals) => setSeparatedMeals(separatedMeals));
    };

    fetchRecipe();
  }, []);

  useEffect(() => {
    const keys = Object.keys(separatedMeals);
    setMealsKeys(keys);

    const savedSelectedMeal = localStorage.getItem("selectedMeal");
    if (savedSelectedMeal && separatedMeals[savedSelectedMeal]) {
      setSelectedMeal(savedSelectedMeal);
      setDisplayMeals(separatedMeals[savedSelectedMeal]);
    }
  }, [separatedMeals]);

  const onSelectedMeal = (meal: string) => {
    localStorage.setItem("selectedMeal", meal);
    setSelectedMeal(meal);
    setDisplayMeals(separatedMeals[meal as keyof typeof separatedMeals]);
  };

  return (
    <div>
      <FormMeals
        mealsKeys={mealsKeys}
        selectedMeal={selectedMeal}
        onSelectedMeal={onSelectedMeal}
      />

      <h1 className="py-2 text-4xl font-semibold text-yellow-300">
        {selectedMeal}
      </h1>

      <section className="mx-auto py-6 sm:px-10">
        {displayMeals.length !== 0 ? (
          displayMeals.map((recipe: ProductInfo) => (
            <div
              key={recipe.id}
              className="w-72 rounded-lg bg-gray-600/40 text-white duration-300 hover:scale-105"
            >
              <a className="flex h-full flex-col" href={`${recipe.id}`}>
                <picture>
                  <img
                    alt={recipe.name}
                    className="my-2 h-32 w-full rounded-t-lg"
                    src={recipe.image}
                  />
                </picture>
                <h3 className="my-2 h-full content-center text-balance text-center text-3xl">
                  {recipe.name}
                </h3>
              </a>
            </div>
          ))
        ) : (
          <h2 className="flex text-4xl font-semibold text-[#febd2f] md:w-max">
            Loading
            <svg
              aria-hidden="true"
              data-prefix="fas"
              data-icon="spinner-third"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="svg-inline--fa fa-spinner-third fa-w-16 fa-7x ml-3 size-9 animate-spin self-center"
            >
              <path
                fill="currentColor"
                d="M456.433 371.72l-27.79-16.045c-7.192-4.152-10.052-13.136-6.487-20.636 25.82-54.328 23.566-118.602-6.768-171.03-30.265-52.529-84.802-86.621-144.76-91.424C262.35 71.922 256 64.953 256 56.649V24.56c0-9.31 7.916-16.609 17.204-15.96 81.795 5.717 156.412 51.902 197.611 123.408 41.301 71.385 43.99 159.096 8.042 232.792-4.082 8.369-14.361 11.575-22.424 6.92z"
                className=""
              ></path>
            </svg>
          </h2>
        )}
      </section>

      {(displayMeals.length >= 3 && window.innerWidth < 768) ||
      displayMeals.length >= 4 ? (
        <a
          href="#top"
          className="absolute -bottom-7 right-0 motion-safe:animate-bounce"
          aria-label="Scroll to top"
        >
          <svg
            className="size-10 fill-white/60 duration-300 hover:fill-white"
            viewBox="0 0 512 512"
          >
            <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM385 215c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-71-71V392c0 13.3-10.7 24-24 24s-24-10.7-24-24V177.9l-71 71c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L239 103c9.4-9.4 24.6-9.4 33.9 0L385 215z" />
          </svg>
        </a>
      ) : null}
    </div>
  );
};

export default ProductArray;
