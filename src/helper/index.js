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

export const howMany = (arrayOfObj, property) => {
  const counts = arrayOfObj.reduce((acc, obj) => {
      const value = obj[property]
      return acc.set(value, acc.has(value) ? acc.get(value) + 1 : 1)
    }, new Map())

  return search => counts.get(search) || 0
}

export  function getRandomColor() {
  const letters = '0123456789ABCDEF'.split('');
  let color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function getRandomColorArray(amount) {
  let colors = []
  for(let i = 0; i < amount; i++) {
    colors.push(getRandomColor())
  }
  return colors
}

export default placementEmoji
