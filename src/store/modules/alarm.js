const alarm = {
    state: {
        id: '123123123'
    },
    mutations: {
        testAlarm (state, alarmid) {
            state.id = alarmid
        }
    },
    actions: {
        AlarmAction ({commit}, id) {
            console.log(11111111111)
            commit('testAlarm', 5555555555)
        }
    }

}

export default alarm
