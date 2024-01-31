import { FunctionComponent } from "react"
import pakageJson from '../../package.json'
import footerstyl from './Footer.module.scss'

const Footer:FunctionComponent = () => {
    const currentYear =new Date().getFullYear();
  return (
    <div>
      <footer className={footerstyl.footer}>
        <ul>
            <li className={footerstyl.footerLinks}>
                <a>twiter</a>{" "}&bull;
                <a>github</a>
            </li>
            <li className={footerstyl.footerCopyrights}>@ {pakageJson.name}{currentYear}All rights reserved</li>
            <li>
                <div className={footerstyl.version}>v.{pakageJson.version}</div>
            </li>
        </ul>
      </footer>
    </div>
  )
}

export default Footer
