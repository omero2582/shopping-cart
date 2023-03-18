import React, { useEffect, useState } from "react";
export function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // fetch items
  }, []);

  return(
    <div>
      <h1>Shop</h1>
      <mainText>
        <stats>
          <attention>55</attention> Attack Damage<br></br>
          <attention>300</attention> Health<br></br>
          <attention>20</attention> Ability Haste<br></br>
          <attention>8%</attention> Omnivamp
        </stats>
          <br></br><br></br><active>Active -</active> <active>Thirsting Slash:</active> Deal damage to nearby enemies. Restore Health for each champion hit.<br></br><br></br>
          <rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> 
          items Health and Ability Haste.
      </mainText><br></br>
    </div>
  )
}