class ReducerRegistry {
  constructor () {
    if (!ReducerRegistry.instance) {
      this._emitChange = null
      this._reducers = {}
      ReducerRegistry.instance = this
    }
    return ReducerRegistry.instance
  }

  getReducers () {
    return {...this._reducers}
  }

  register (name, reducer) {
    this._reducers = {...this._reducers, [name]: reducer}
    if (this._emitChange) {
      this._emitChange(this.getReducers())
    }
  }

  setChangeListener (listner) {
    this._emitChange = listner
  }
}

const reducerRegistry = new ReducerRegistry();