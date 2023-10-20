import {api, user, userId, showError} from '../../index.js'

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
  return { avatar: data.avatar }
}

function handleLikeClick(likes, id) {
  const haveLike = likes.some(like => {
    like._id ??= like.id
    return like._id  === userId
  })

  if (haveLike) {
    api.do('DELETE', api.likes, id)
      .then(likes.pop())
      .catch(showError)
  } else {
    api.do('PUT', api.likes, id)
      .then(likes.push(user.info))
      .catch(showError)
  }
}

export {sendCard, sendUser, sendAvatar, handleLikeClick};