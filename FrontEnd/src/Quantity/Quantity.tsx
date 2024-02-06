import { FunctionComponent, useState } from "react";
import classes from "./Quantity.module.scss";

export type Operation = 'reduce' | 'increment'

interface Props {
  removeProductCallback: (product: string) => void
  handleUpdateQuantity: (product: string, operation: Operation) => void
  product: string
}
const Quantity: FunctionComponent<Props> = ({  removeProductCallback,handleUpdateQuantity,product }) => {
  const [value, setValue] = useState<number>(1);

  const increment = (): void => {
    handleUpdateQuantity(product, 'increment')
    setValue(prevState => prevState + 1)
  };

  const reduce = (): void => {
    handleUpdateQuantity(product, 'reduce')
    setValue(prevState => {
      const updatedValue = prevState - 1
      if (updatedValue === 0) {
        removeProductCallback(product)
      }
      return updatedValue
    })
  };
  return (
    <div className={classes.quantifier}>
      <input
        type="button"
        value="-"
        className={classes.buttonMinus}
        onClick={reduce}
      />
      <input
        type="number"
        step="1"
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
        className={classes.quantityField}
      />
      <input
        type="button"
        value="+"
        className={classes.buttonPlus}
        onClick={increment}
      />
    </div>
  );
};

export default Quantity;
