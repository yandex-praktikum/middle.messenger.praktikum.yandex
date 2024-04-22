import { expect } from 'chai'
import { initialState } from '../constants/initialState.ts'
import store, { StoreEvents } from './Store.ts'

describe('Store', function () {
  // Проверка метода getState
  describe('getState()', function () {
    it('Должен возвращать начальное состояние', function () {
      const state = store.getState()
      expect(state).to.be.an('object')
      expect(state).to.deep.equal(initialState)
    })
  })

  // Проверка метода set
  describe('set()', function () {
    it('Должен устанавливать значение в состояние', function () {
      store.on(StoreEvents.UPDATED, () => {})
      store.set('selectedChat', 1)
      expect(store.getState().selectedChat).to.equal(1)
    })

    it('Должен вызывать событие обновления, при изменении состояния', function (done) {
      store.on(StoreEvents.UPDATED, () => {
        expect(store.getState().selectedChat).to.equal(2)
        done()
      })
      store.set('selectedChat', 2)
    })
  })
})
