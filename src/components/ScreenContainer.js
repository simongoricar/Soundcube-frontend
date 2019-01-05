import React, { Component } from 'react';

// Screen imports
import PlayerScreen from './screens/PlayerScreen';
import QueueScreen from "./screens/QueueScreen";

// Other imports
import eventHandler from '../api/EventHandler';

class ScreenContainer extends Component {
    constructor(props) {
        super(props);

        // Register to events
        eventHandler.subscribeToEvent(eventHandler.common.moveToScreen, this.moveToScreen);

        this.defaultScreen = "Player";

        this.state = {
            screens: {
                "Player": {
                    screen: PlayerScreen
                },
                "Queue": {
                    screen: QueueScreen
                },
                // TODO
                /*
                "Music": {
                    screen: null
                }
                */
            },
            currentScreen: this.defaultScreen
        }
    }

    moveToScreen = (screenName) => {
        // Make sure the screen exists
        if (this.state.screens[screenName] === null) {
            return false;
        }

        this.setState({
            currentScreen: screenName
        });
        return true;
    };

    render() {
        const screenContainerThis = this;

        return (
            <div className="screens">
                { // This will render all screens but show only the main one
                Object.keys(this.state.screens).map((item) => {
                    const ThisComponent = this.state.screens[item].screen;
                    // Pass the isShown prop to the component if needed
                    let isVisible = item === this.state.currentScreen;

                    return <ThisComponent key={item} screenContainer={screenContainerThis} isShown={isVisible} />
                })}
            </div>
        );
    }
}

export default ScreenContainer;