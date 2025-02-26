import { useState } from "react"
import { social } from "../data/social"
import DevTreeInput from "../components/DevTreeInput"

export default function LinkTreeView() {

  const [devTreeLinks, setDevTreeLinks] = useState(social)

  const handleUrlChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    console.log(e.target.name);
    const updatedLinks = devTreeLinks.map( link => link.name === e.target.name ? { ...link, url: e.target.value } : link )
    console.log(updatedLinks);
    setDevTreeLinks(updatedLinks)
  }

  const handleEnableLink = (socialNetwork: string) => {
   const updatedLinks = devTreeLinks.map( link => link.name === socialNetwork ? { ...link, enabled: !link.enabled } : link )
   console.log(updatedLinks)
   setDevTreeLinks(updatedLinks) 
  }
  

  return (
    <div className="space-y-5">
      {devTreeLinks.map( item => (
        <DevTreeInput 
          key={item.name}
          item={item}
          handleUrlChange={handleUrlChange}
          handleEnableLink={handleEnableLink}
        />
      ))}
      
    </div>
  )
}
