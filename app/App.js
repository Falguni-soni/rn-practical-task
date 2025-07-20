import { View, Text } from 'react-native'
import React from 'react'
import { MainStackNavigation } from './navigation/mainStackNavigation'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'


const App = () => {
    return (
        <View style={{ flex: 1 }}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <MainStackNavigation />
                </PersistGate>
            </Provider>
        </View>
    )
}

export default App