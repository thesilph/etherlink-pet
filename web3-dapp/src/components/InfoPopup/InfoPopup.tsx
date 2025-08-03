
function InfoPopup(content){
  return (
  <div class="tooltip" style={{display: 'inline', border: '1px dotted', cursor: 'pointer'}}>i
    <span class="tooltiptext tooltip-right">{content}</span>
  </div>
  )
}

export const CountTooltip = () => InfoPopup(CountTooltipText)
export const LastFedTooltip = () => InfoPopup(LastFedTooltipText)

const CountTooltipText = "When you get to 100 times, you will be able to harvest your golden egg!! (your funds) "
const LastFedTooltipText = "You can only feed every 16 hours!! (intermittent fastings)"