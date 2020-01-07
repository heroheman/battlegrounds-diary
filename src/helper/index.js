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
      return acc.set(value, acc.has(value) ? acc.get(value) + 1 : 0)
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

export function precise (x) {
  return Number.parseFloat(x).toPrecision(4);
}

export function encodeDiaryData (data) {
  return JSON.stringify(data)
}

export function decodeDiaryData (data) {
  return JSON.parse(data)
}

export const deepSameKeys = (o1, o2) => {
  // Get the keys of each object
  const o1keys = Object.keys(o1).sort();
  const o2keys = Object.keys(o2).sort();
  // Make sure they match
  // If you don't want a string check, you could do
  // if (o1keys.length !== o2keys.length || !o1keys.every((key, index) => o2keys[index] === key)) {
  if (o1keys.join() !== o2keys.join()) {
    // This level doesn't have the same keys
    return false;
  }
  // Check any objects
  return o1keys.every(key => {
    const v1 = o1[key];
    const v2 = o2[key];
    if (v1 === null) {
      return v2 === null;
    }
    const t1 = typeof v1;
    const t2 = typeof v2;
    if (t1 !== t2) {
      return false;
    }
    return t1 === "object" ? deepSameKeys(v1, v2) : true;
  });
};

// this gives an object with dates as keys
export const groupByDay = (data) => {
  return data.reduce((groups, result) => {
    const date = result.timestamp.split('T')[0];
    if (!groupByDay[date]) {
      groupByDay[date] = [];
    }
    groupByDay[date].push(result);
    return groupByDay;
  }, {});
}

export default placementEmoji
