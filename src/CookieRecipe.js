import { useState } from "react";
import "./styles.css";

const getSteps = (cookieNumber, ingredients) => {
  return [
    {
      title: "Chocolate chip cookie recipe",
      description: `This recipe yields ${cookieNumber} cookies.`,
      src:
        "https://handletheheat.com/wp-content/uploads/2020/10/BAKERY-STYLE-CHOCOLATE-CHIP-COOKIES-9-637x637-1.jpg"
    },
    {
      title: "Oven",
      description: "Preheat the oven to 350°F or 175°C.",
      src:
        "https://www.bluestarcooking.com/wp-content/uploads/2013/11/Chocolate-chip-cookies-baking-in-the-BlueStar-PowR-oven.jpg"
    },
    {
      title: "Dry ingredients",
      description: `In a large mixing bowl add ${ingredients.flour} cups of flour, ${ingredients.brownSugar} cups of brown sugar, ${ingredients.bakingSode} teaspoon of baking soda, ${ingredients.bakingPowder} teaspoon baking powder, and ${ingredients.salt} teaspoon of salt.  Whisk to combine.`,
      src:
        "https://joyfoodsunshine.com/wp-content/uploads/2021/07/best-chocolate-chip-cookie-recipe-ingredients.jpg"
    },
    {
      title: "Wet ingredients",
      description: `Add 2 eggs, 3/4 cup of oil, 2 teaspoons of vanilla, and 2 cups of chocolate chips.  Begin with a rubber spatula to mix and finish by hand until all the ingredients are well incorporated.`,
      src:
        "https://joyfoodsunshine.com/wp-content/uploads/2018/02/best-chocolate-chip-cookies-recipe-6.jpg"
    },
    {
      title: "Bake",
      description:
        "Shape into 1 to 2 inch balls.  Place them on a parchment paper lined baking sheet. Bake for 8 to 10 minutes on the middle rack.  Remove when they are just BARELY starting to turn brown.",
      src:
        "https://joyfoodsunshine.com/wp-content/uploads/2018/02/how-to-freeze-chocolate-chip-cookie-dough.jpg"
    },
    {
      title: "Enjoy!",
      description:
        "Let them sit on the baking pan for 2 minutes before removing to cooling rack. Then they are ready to eat!",
      src:
        "https://joyfoodsunshine.com/wp-content/uploads/2018/02/best-chocolate-chip-cookies-recipe-5.jpg"
    }
  ];
};

const defaultIngredients = {
  flour: 3,
  brownSugar: 2,
  bakingSode: 1,
  bakingPowder: 0.5,
  salt: 0.5
};

const COOKIE_NUMBER_PER_SERVING = 36;

export const CookieRecipe = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [servingNumber, setServingNumber] = useState("");
  const [cookieNumber, setCookieNumber] = useState(0);
  const [ingredients, setIngredients] = useState(defaultIngredients);
  const steps = getSteps(cookieNumber, ingredients);

  const handleServingSubmit = (e) => {
    e.preventDefault();

    if (servingNumber < 0 || servingNumber > 1000) {
      alert("Error: Serving number is invalid");
      setCookieNumber(0);
      return;
    }
    setCookieNumber(servingNumber * COOKIE_NUMBER_PER_SERVING);
    setIngredients({
      flour: 3 * servingNumber,
      brownSugar: 2 * servingNumber,
      bakingSode: 1 * servingNumber,
      bakingPowder: 0.5 * servingNumber,
      salt: 0.5 * servingNumber
    });
  };

  const handleServingValueChange = (e) => {
    const inputValue = e.currentTarget.value;
    const finalValue = Number.isNaN(parseFloat(inputValue))
      ? 0
      : parseFloat(inputValue);

    setServingNumber(finalValue);
  };

  const handleNextClick = () => {
    setStepIndex(stepIndex + 1);
  };

  const handleBackClick = () => {
    setStepIndex(stepIndex - 1);
  };

  return (
    <div className={"cookieRecipe"}>
      <div className={"stepsForm"}>
        <h3>{steps[stepIndex].title}</h3>
        <div>{steps[stepIndex].description}</div>
        <div className={"servingForm"}>
          <div>Choose number of servings</div>
          <form onSubmit={handleServingSubmit}>
            <input
              onChange={handleServingValueChange}
              placeholder="type in your serving number"
              value={servingNumber}
            />
          </form>
        </div>
        <div>
          {
            <button
              className={"footerButton"}
              onClick={handleBackClick}
              disabled={stepIndex <= 0}
            >
              Back
            </button>
          }
          {
            <button
              className={"footerButton"}
              onClick={handleNextClick}
              disabled={stepIndex >= steps.length - 1}
            >
              Next
            </button>
          }
        </div>
      </div>
      <div className={"stepsImageContainer"}>
        <img
          className={"stepsImage"}
          src={steps[stepIndex].src}
          alt={steps[stepIndex].title}
        />
      </div>
    </div>
  );
};
