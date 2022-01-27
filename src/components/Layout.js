import React, {useState} from 'react';
import PropTypes from 'prop-types';

import styled from '@mui/styles/styled';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';

import ResponsiveHeader from '@geomatico/geocomponents/ResponsiveHeader';
import SidePanel from '@geomatico/geocomponents/SidePanel';

import Logo from './icons/Logo';

import {WIDESCREEN_STEP, DRAWER_WIDTH} from '../config';

const MainContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'leftDrawer'
})(({theme, leftDrawer}) => ({
  flexGrow: 1,
  padding: 0,
  position: 'absolute',
  top: theme.mixins.toolbar.minHeight,
  bottom: 0,
  right: 0,
  left: leftDrawer ? DRAWER_WIDTH : 0
}));

const Layout = ({mainContent, sidePanelContent}) => {
  const widescreen = useMediaQuery(`(min-width: ${WIDESCREEN_STEP})`, {noSsr: true});
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);

  const handleClose = () => setIsSidePanelOpen(!isSidePanelOpen);
  return (
    <>
      <ResponsiveHeader
        logo={<Logo/>}
        logoStyleProps={{
          width: 170,
          paddingTop: 0,
        }}
        onStartIconClick={widescreen ? undefined : handleClose}
      >
      </ResponsiveHeader>
      <SidePanel
        drawerWidth={DRAWER_WIDTH}
        anchor="left"
        isOpen={isSidePanelOpen}
        onClose={handleClose}
        widescreen={widescreen}
      >
        {sidePanelContent}
      </SidePanel>
      <MainContent leftDrawer={isSidePanelOpen && widescreen}>
        {mainContent}
      </MainContent>
    </>
  );
};

Layout.propTypes = {
  sidePanelContent: PropTypes.element.isRequired,
  mainContent: PropTypes.element.isRequired
};

export default Layout;
