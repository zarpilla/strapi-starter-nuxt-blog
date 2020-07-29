export const state = () => ({
    texts: []
})

export const mutations = {
  set (state,  texts ) {
    if (texts && texts.data) {
      state.texts = texts.data
    }    
  }
}

export const getters = {
  get (state) {
    return state.texts
  }
}
