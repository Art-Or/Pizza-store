import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="140" cy="110" r="110" /> 
    <rect x="0" y="240" rx="10" ry="10" width="280" height="25" /> 
    <rect x="0" y="285" rx="10" ry="10" width="280" height="90" /> 
    <rect x="0" y="395" rx="10" ry="10" width="95" height="30" /> 
    <rect x="130" y="390" rx="25" ry="25" width="150" height="45" />
  </ContentLoader>
)

export default Skeleton

