import parse, {domToReact} from 'html-react-parser';
import React from 'react';
const requestItem = () => {
  const allDataUrl = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/items.json';
  const iconsBaseUrl = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d'

  const fetchAllItemData = async () => {
    const response = await fetch(allDataUrl);
    const data = await response.json();
    return data;
  }
  
  const processAllData = async () => {
    const data = await fetchAllItemData();
    const simplified = data.map(item => {
      const fullPath = item.iconPath;
      const fileName = fullPath.split('/').pop().toLowerCase();

      const htmlMatch = ['<li>', '<br>'];
      const options =  {
        replace: ({name, type, children}) => {
          if(type === 'tag' && !htmlMatch.includes(`<${name}>`)){
            return <span className={name}>{domToReact(children, options)}</span>
          }
        }
      };
      const noCustomHtmlTags = parse(item.description, options);
      // item.description normally contains a lot of custom html tags. This converts every custom tag into
      // a <span> with className = 'nameOfCustomTag'
      // custom tags are all tags that are not inside of variable htmlMatch
      return {
        ...item,
        name: item.name.trim(),
        img: `${iconsBaseUrl}/${fileName}`,
        description: noCustomHtmlTags,
        // name.trim() fixes Ornn upgrades, which start with a blank space
        // blank space messes up sorting A-Z & Z-A

        // img key extracts '1001_Class_T1_BootsofSpeed.png' from '/lol-game-data/assets/ASSETS/Items/Icons2D/1001_Class_T1_BootsofSpeed.png'
        // then appends to a different base url
      }
    });
    return simplified;
  }

  return {
    processAllData,
  }
}

export default requestItem();

// In case I need,
// code below finds all the html tags that are used. includes
// custom html tags that riot uses, and also standard html tags.
/*
const code = async () => {
  const response = await fetch('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/items.json');
  const data = await response.text();
    function getCustomTagNames(description) {
      const regExp = /<([A-Z][A-Z0-9]*\b[^>]*)>/gi;
      const matches = description.match(regExp);
      if (!matches) return [];
      const tagNames = matches.reduce((sum, match) => {
          if(sum!= [] && !sum.includes(match)){
              return [...sum, match]
          }else{
              return [...sum]
          }
      },[]);
        tagNames;
      return tagNames.filter((tagName) => tagName !== null);
    }
    return getCustomTagNames(data);
}

// now filter out standard html tags
const tags = await code();
const htmlMatch = ['<li>', '<br>'];
const out = tags.filter(t => !htmlMatch.includes(t))
console.log(out)
*/

/*
/*
  orignal item descriptions looks like this
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
*/