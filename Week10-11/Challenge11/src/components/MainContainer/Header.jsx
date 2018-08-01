import React from 'react';

import {HeaderDiv, Logo, Title} from "../styles/StyledComponents.js";

export class Header extends React.Component {
  render() {
    return (
      <HeaderDiv>
        <Logo>
          <img src="https://www.jobsity.com/themes/custom/jobsity/images/icons/logo2.svg" alt="Jobsity"/><span>JOBSITY</span>
        </Logo>
        <Title>
          <span>Video Clipper</span>
        </Title>
      </HeaderDiv>
    );
  }
}

export default Header;