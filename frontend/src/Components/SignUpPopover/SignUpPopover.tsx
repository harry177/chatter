import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Popover } from 'react-bootstrap';
import './SignUpPopover.styles.scss';

const popover = (
  <Popover id="popover-basic" className="popover-main">
    <Popover.Header as="h3" className="popover-header">
      Important!
    </Popover.Header>
    <Popover.Body>Just confirm and keep calm</Popover.Body>
  </Popover>
);

export const SignUpPopover = () => (
  <OverlayTrigger trigger="click" placement="top" overlay={popover}>
    <span className="text-confirm">Please read</span>
  </OverlayTrigger>
);
