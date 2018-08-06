# Challenge 11 - Video Player

This is a video player made in React.js utilizing HTML5 with video fragments with the capabilities of creating, editing and deleting clips.

To run: open in explorer the `index.html` file in `public` folder, sample clips are created on startup on localstorage, if problems happen to occur realted to the data stored it is advised to clear the localtorage data and refresh the page.

To change video source: change the url and title in `src/reducers/videoReducer.js` and rebuild the app with `webpack` command. 

Hotkeys: the keys `K`, `L`, and `J` are used to play/pause, play next clip, play previous clip, but only when video player is focused to prevent accidental switching.

### Missing from challenge:
*   Component embeding without editing functionalities.