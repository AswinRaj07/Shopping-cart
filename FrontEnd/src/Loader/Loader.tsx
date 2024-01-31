import { FunctionComponent } from "react"
import loaderstyl from './Loader.module.scss'

const Loader:FunctionComponent = () => {
  return (
    <div className={loaderstyl.loader}>
      <div className={loaderstyl.spinner}></div>
    </div>
  )
}

export default Loader
