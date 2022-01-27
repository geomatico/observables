import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

import BaseMapList from '@geomatico/geocomponents/BaseMapList';

import SectionTitle from './SectionTitle';

import Logo_geomatico from '../img/Logo_geomatico.png';
import {MAPSTYLES} from '../config';

const SidePanelContent = ({mapStyle, onMapStyleChanged}) => {
  return <Stack justifyContent='space-between' sx={{height: '93.5vh'}}>
    <Box>
      <Box mb={2}>
        <SectionTitle titleKey="baseMapStyle"/>
        <BaseMapList
          styles={MAPSTYLES}
          selectedStyleUrl={mapStyle}
          onStyleChange={onMapStyleChanged}
          typographyStyleProps={{fontSize: 14}}
        />
      </Box>
    </Box>
    <Link href='https://geomatico.es' variant='body2' target='_blank'>
      <img src={Logo_geomatico} width={80} alt='geomatico.es' style={{float: 'right', margin: '10px 0 5px 0'}}/>
    </Link>
  </Stack>;
};

SidePanelContent.propTypes = {
  mapStyle: PropTypes.string.isRequired,
  onMapStyleChanged: PropTypes.func.isRequired
};

export default SidePanelContent;
