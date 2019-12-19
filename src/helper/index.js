export function placementEmoji(placement) {
  placement = parseInt(placement)
  let emoji = ''
  if (placement === 1) {
    emoji = '🏆'
  } else if (placement > 1 && placement < 5) {
    emoji = '🌟'
  } else if (placement === 8 ) {
    emoji = '🤕'
  } else {
    emoji = '🍩'
  }

  return emoji
}

export default placementEmoji
