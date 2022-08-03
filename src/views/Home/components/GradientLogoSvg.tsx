import React from 'react'
import { Svg, SvgProps } from '@rock-finance/uikit'
import handLogo from "../../../images/Rock-hands.png"

const GradientLogo: React.FC<SvgProps> = (props) => {
  return (
    <img src={handLogo} alt={'Rock Finance'} />
  )
}

export default GradientLogo
