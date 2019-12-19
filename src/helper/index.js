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

export function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

export default placementEmoji
