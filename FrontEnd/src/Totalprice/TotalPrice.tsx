import { FunctionComponent } from "react"
import classes from './Totalpricestyl.module.scss'
import Quantity from "../Quantity/Quantity"

interface Props {
  amount: number
}

export const TotalPrice:FunctionComponent<Props> = ({amount}) => {


  return (
    <div className={classes.totalPrice}>
      Total:{amount}
    </div>
  )
}

export default TotalPrice
