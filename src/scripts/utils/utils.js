function sendCard(data) {
  return {
    name: data.name,
    link: data.link
  }
}

function sendUser(data) {
  return {
    name: data.name,
    about: data.about
  }
}

function sendAvatar(data) {
  return {avatar: data.avatar}
}

export {sendCard, sendUser, sendAvatar};