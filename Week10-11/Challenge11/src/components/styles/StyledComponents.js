import styled from 'styled-components';

export const globalDiv = styled.div`
  display: grid;
  grid-template-rows: 67px 1fr;
`;


export const CreateClipDiv = styled.div`
  padding: 0.5em;

  form {
    input {
      margin: 0.2em 0;
      font-family: 'roboto';
    }

    .clipName {
      width: 90%;
      margin-top: 5px;
    }

    .clipTime {
      width: 40%;
      margin-top: 5px;
      input {
        text-align: center;
      }
    }

    .checkTime {
      width: 12%;
    }

    .separator {
      font-size: 20px;
      margin: 0 0.5em;
    }

    .clipTags {
      width: 90%
      margin-top: 5px;
    }
    
    button {
      margin-top: 0.3em;

      span:nth-child(1) {
        i {
          margin-right: 0.2em;
        }
      }
    }
  }
`;

export const PlaylistDiv = styled.div`
  flex: 1;
  padding: 0.5em;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    .listOptions {
      .autoplay {
        position: absolute;
        right: 0;
      }
    }

    li {
      padding: 0.4em 0.1em;
    }
  }
`;


export const PlayerDiv = styled.div`
  grid-column: 1/2;
  align-items: center;
  padding: 0 1.3em 0.8em;

  .autoplay {
    position: absolute;
    top: 13em;
    left: 19em;

    button {
      font-size: 1.7em;
      background: gray;
      width: 80px;
      height: 80px;
    }
    
    div {
      position: absolute;
      top: -0.2em;
      left: 0.35em;
    }
  }

  video {
    background: black;
    width: 100%;
  }

  .videoTitle {
    height: 2.4em;

    p {
      font-size: 2em;
      width: 27em;
      padding: 0 0.5em;
      margin: 0;
      display: inherit;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;

      span {
        font-size: 1em;
      }

      &:not(.nohover):hover {
        box-shadow: 0 0 3pt 2pt #aaa;
        height: auto;
        background: white;
        text-overflow: inherit;
        word-break: break-all;
        white-space: normal;
        position: absolute;
        z-index: 30;
      }
    }
  }

  span {
    font-size: 1.8em;
    padding: 0 0.5em;
  }
`;

export const ControlsDiv = styled.div`
  display: flex;
  background: whitesmoke;
  margin-top: -4px;

  .progress {
    display: flex;
    flex: 1;
    
    .progressBar {
      display: flex;
      flex: 1;
      height: 1.3em;
      margin: 0.5em 0;

      div {
        flex: 1;
        height: 1.3em;
        pointer-events: none;
      }
    }

    .marker {
      position: absolute;
      font-size: 1.1em;
      color: lightskyblue;
    }
  }

  .time {
    font-size: 0.9em;
    height: 1.3em;
    padding: 0.7em 0.2em;
  }

  button {
    span:nth-child(2) {
      width: 64%;
    }
  }
`;

export const HeaderDiv = styled.div`
  border-bottom: 1px solid #6ec1e4;
  height: 2.5em;
  background: #fcf8f3;
  top: 0;
  right: 0;
  left: 0;
  display: grid;
  grid-template-columns: 160px 1fr;
  font-family: "roboto", sans-serif;
  position: sticky;
  z-index: 2;
`;

export const Logo = styled.div`
  background: white;
  text-align: center;
  font-family: "roboto", sans-serif;
  border-right: 1px solid #d6dee5;
  box-sizing: border-box;
  padding: 0.4em;
  height: 2.5em;

  > img {
    height: 1.7em;
    padding-top: 0;
    padding-right: 10px;
  }

  > span {
    left: -2px;
    position: relative;
    padding: 0.4em;
    font-size: 1.2em;
    top: 0.1em;
    vertical-align: top;
    letter-spacing: -0.6px;
    font-weight: bold;
  }
`;

export const Title = styled.div`
  height: 2.5em;
  font-size: 1.2em;
  height: inherit;
  padding: 0.4em;
  letter-spacing: -0.5px;
  box-sizing: border-box;

  > span {
    vertical-align: middle;
    font-weight: bold;
  }
`;

export const MainContainer = styled.div`
  padding: 1em 3em 0.5em;
  display: grid;
  grid-template-columns: 3fr 1fr;
  background: #f5f6f8;;

  .Sidebar {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 1300px) {
    grid-template-columns: 1fr;

    .Sidebar {
      display: none;

      &:hover {
        display: inherit;
      }
    }
  }
`;

export const ClipDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 30px;
  grid-gap: 0.5em;
  width: 100%;
  position: relative;

  .clipTitle {
    font-weight: bold;
    text-transform: uppercase;
    font-size: 1.2em;
    height: 1.2em;
    cursor: pointer;

    p {
      margin: 0;
      text-overflow: ellipsis;
      width: 13em;
      white-space: nowrap;
      overflow: hidden;

      &:not(.nohover):hover {
        box-shadow: 0 0 3pt 2pt #aaa;
        height: auto;
        background: white;
        text-overflow: inherit;
        word-break: break-all;
        white-space: normal;
        position: absolute;
        z-index: 30;
      }
    }
  }

  .separator {
    margin: 0 0.2em;
  }

  .clipTags {
    font-weight: bold;
    font-style: italic;
    font-size: 1em;
    color: #777;

    span {
      font-weight: normal;
      color: #bbb;
    }
  }

  .clipOptions {
    display: grid;
    grid-template-rows: 1fr 1fr;

    button {
      font-size: 18px;
      width: 25px;
      height: 25px;
    }
  }

  .operations {
    grid-column: 1/3;

    button {
      margin: 0.3em 0.5em;

      span:nth-child(1) {
        i {
          margin-right: 0.2em;
        }
      }
    }
  }

  &.selected {
    background: #eaeaea;
    box-shadow: 0 0 2pt 3pt #eaeaea;
  }
`;

export const Search = styled.div`
  position: relative;
  vertical-align: middle;
  border-radius: 15px;
  padding: 2.5px 10px;
  margin: 0;
  box-sizing: border-box;
  display: inline;
  left: 1em;
  top: -0.1em;

  > i {
    font-size: 15px;
    position: relative;
    top: 1px;
  }

  > input {
    position: relative;
    vertical-align: middle;
    border: 0;
    padding: 5px 0px 3px 1.1px;
    letter-spacing: 0.2px;
    font-size: 11px;
    color: black;
    font-family: "roboto", sans-serif;
    flex: 1;
  }
`;

export const EditClipDiv = styled.div`
  padding: 0.5em;

  form {
    input {
      margin: 0.2em 0;
      font-family: 'roboto';
    }

    .clipName {
      width: 90%;
      margin-top: 5px;
    }

    .clipTime {
      width: 40%;
      margin-top: 5px;
      input {
        text-align: center;
      }
    }

    .checkTime {
      width: 12%;
    }

    .separator {
      font-size: 20px;
      margin: 0 0.5em;
    }

    .clipTags {
      width: 90%
      margin-top: 5px;
      font-weight: normal;
    }
    
    button {
      margin: 0.3em 0.5em;

      span:nth-child(1) {
        i {
          margin-right: 0.2em;
        }
      }
    }
  }
`;